import csv
import logging
import os
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import List
import uuid
from a2wsgi import ASGIMiddleware
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

# Directories & Environment
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# CSV Setup
CSV_FILE_PATH = ROOT_DIR / "messages.csv"


def ensure_csv_header():
    if not CSV_FILE_PATH.exists():
        with open(CSV_FILE_PATH, mode="w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["timestamp", "id", "name", "email", "message"])


ensure_csv_header()

# MongoDB connection
mongo_url = os.environ.get("MONGO_URL", "mongodb://localhost:2017")
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=2000)
db = client[os.environ.get("DB_NAME", "test_database")]


# FastAPI Lifespan Handler (Replaces deprecated @app.on_event)
@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    client.close()


app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")


# Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


# Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/contact")
async def receive_contact_message(payload: ContactMessageCreate):
    msg_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    timestamp_str = now.isoformat()

    # 1. Append directly to CSV file
    try:
        with open(CSV_FILE_PATH, mode="a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(
                [
                    timestamp_str,
                    msg_id,
                    payload.name,
                    payload.email,
                    payload.message,
                ]
            )
    except Exception as e:
        logging.error(f"Failed to write contact message to CSV: {e}")
        raise HTTPException(
            status_code=500, detail="Failed to persist message to CSV"
        )

    # 2. Save into MongoDB collection
    doc = {
        "id": msg_id,
        "name": payload.name,
        "email": payload.email,
        "message": payload.message,
        "timestamp": timestamp_str,
    }
    await db.contact_messages.insert_one(doc)

    return {"status": "success", "message": "Message saved to CSV", "id": msg_id}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check["timestamp"], str):
            check["timestamp"] = datetime.fromisoformat(check["timestamp"])
    return status_checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# WSGI wrapper for PythonAnywhere
wsgi_app = ASGIMiddleware(app)

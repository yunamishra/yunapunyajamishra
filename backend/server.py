import logging
import os
import smtplib
import uuid
from email.message import EmailMessage

from a2wsgi import ASGIMiddleware
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from starlette.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# FastAPI app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Contact form model
class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

# API health check
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# Contact form
@api_router.post("/contact")
async def receive_contact_message(payload: ContactMessageCreate):
    msg_id = str(uuid.uuid4())

    smtp_email = os.environ.get("SMTP_EMAIL")
    smtp_password = os.environ.get("SMTP_PASSWORD")

    if not smtp_email or not smtp_password:
        logging.error("SMTP credentials are not configured.")
        raise HTTPException(
            status_code=500,
            detail="Email service is not configured."
        )

    email_message = EmailMessage()
    email_message["Subject"] = f"New Portfolio Contact Message from {payload.name}"
    email_message["From"] = smtp_email
    email_message["To"] = smtp_email
    email_message["Reply-To"] = payload.email

    email_message.set_content(
        f"""You received a new message through your portfolio website.

Name: {payload.name}
Email: {payload.email}

Message:
{payload.message}

Message ID: {msg_id}
"""
    )

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
            smtp.starttls()
            smtp.login(smtp_email, smtp_password)
            smtp.send_message(email_message)

    except Exception as e:
        logging.error(f"Failed to send contact email: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to send message."
        )

    return {
        "status": "success",
        "message": "Message sent successfully.",
        "id": msg_id,
    }

app.include_router(api_router)

# CORS
cors_origins = os.environ.get("CORS_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# WSGI Wrapper for PythonAnywhere
wsgi_app = ASGIMiddleware(app)
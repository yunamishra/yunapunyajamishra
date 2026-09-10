import logging
import os
import uuid

import resend
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from starlette.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()
api_router = APIRouter(prefix="/api")


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/contact")
async def receive_contact_message(payload: ContactMessageCreate):
    msg_id = str(uuid.uuid4())

    resend_api_key = os.environ.get("RESEND_API_KEY")
    recipient_email = os.environ.get("CONTACT_EMAIL")

    if not resend_api_key or not recipient_email:
        logging.error("Resend email configuration is not configured.")
        raise HTTPException(
            status_code=500,
            detail="Email service is not configured."
        )

    resend.api_key = resend_api_key

    try:
        params: resend.Emails.SendParams = {
            "from": "Portfolio Contact <onboarding@resend.dev>",
            "to": [recipient_email],
            "reply_to": payload.email,
            "subject": f"New Portfolio Contact Message from {payload.name}",
            "text": f"""You received a new message through your portfolio website.

Name: {payload.name}
Email: {payload.email}

Message:
{payload.message}

Message ID: {msg_id}
""",
        }

        email = resend.Emails.send(params)

        logging.info(f"Contact email sent successfully: {email}")

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

cors_origins = os.environ.get("CORS_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
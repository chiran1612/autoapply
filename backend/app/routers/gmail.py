from fastapi import APIRouter, HTTPException
from app.services.email_service import gmail_service

router = APIRouter(prefix="/gmail", tags=["Gmail"])

@router.get("/scan")
async def scan_emails():
    try:
        result = await gmail_service.scan_for_interviews()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

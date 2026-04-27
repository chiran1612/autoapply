from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.resume_parser import resume_parser
from app.config import settings
import os

router = APIRouter(prefix="/api/resume", tags=["resume"])

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    # 1. Basic validation
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")
    
    # 2. Read file content
    content = await file.read()
    
    # 3. Parse with AI
    try:
        parsed_profile = await resume_parser.parse_resume(content, file.filename)
        return {
            "filename": file.filename,
            "status": "success",
            "profile": parsed_profile
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse resume: {str(e)}")

@router.post("/sample")
async def run_sample():
    sample_path = "samples/sample_resume.pdf"
    if not os.path.exists(sample_path):
        raise HTTPException(status_code=404, detail="Sample resume not found.")
    
    with open(sample_path, "rb") as f:
        content = f.read()
    
    try:
        parsed_profile = await resume_parser.parse_resume(content, "sample_resume.pdf")
        return {
            "filename": "sample_resume.pdf",
            "status": "success",
            "profile": parsed_profile
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse sample: {str(e)}")

@router.get("/profile")
async def get_profile():
    # Placeholder for fetching current user profile from DB
    return {"message": "Profile fetching not implemented yet"}

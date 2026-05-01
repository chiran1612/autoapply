from fastapi import APIRouter, Body, HTTPException
from app.services.job_search import job_search_engine
from app.services.bots.linkedin import linkedin_bot
from app.services.email_service import gmail_service

router = APIRouter(prefix="/api/jobs", tags=["jobs"])

from pydantic import BaseModel

class JobSearchRequest(BaseModel):
    loop_id: str
    keywords: str
    location: str

@router.post("/search")
async def search_jobs(request: JobSearchRequest):
    try:
        # Trigger the asynchronous job search engine
        # In a real app, you would use a task queue like Celery or RQ
        # For now, we'll call the service directly
        profile = {
            "desired_role": request.keywords,
            "preferred_locations": [request.location]
        }
        jobs = await job_search_engine.search_jobs(profile)
        return {"status": "started", "loop_id": request.loop_id, "jobs_found": len(jobs)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Job search failed: {str(e)}")

from app.services.bots.linkedin import linkedin_bot

@router.post("/apply")
async def apply_to_job(request: dict = Body(...)):
    job_url = request.get("job_url")
    profile = request.get("profile", {})
    
    if not job_url:
        raise HTTPException(status_code=400, detail="Job URL is required.")
    
    try:
        result = await linkedin_bot.apply_to_job(job_url, profile)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


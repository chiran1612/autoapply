from fastapi import APIRouter, Body, HTTPException
from app.services.job_search import job_search_engine

router = APIRouter(prefix="/api/jobs", tags=["jobs"])

@router.post("/search")
async def search_jobs(profile: dict = Body(...)):
    if not profile:
        raise HTTPException(status_code=400, detail="Profile data is required for searching jobs.")
    
    try:
        jobs = await job_search_engine.search_jobs(profile)
        return {"status": "success", "jobs": jobs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Job search failed: {str(e)}")

@router.post("/apply")
async def apply_to_job(job_id: str = Body(..., embed=True)):
    if not job_id:
        raise HTTPException(status_code=400, detail="Job ID is required.")
    
    # MOCK IMPLEMENTATION: Simulate applying to a job with Playwright
    import asyncio
    await asyncio.sleep(1.5) # Simulate web interaction delay
    
    return {"status": "success", "job_id": job_id, "message": "Successfully applied"}


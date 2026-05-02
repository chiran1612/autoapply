from fastapi import APIRouter
from typing import List, Dict

router = APIRouter(prefix="/api", tags=["dashboard"])

@router.get("/dashboard/stats")
async def get_stats():
    return {
        "activeLoops": 3,
        "totalApplications": 24,
        "interviews": 2,
        "successRate": 8.5
    }

@router.get("/loops")
async def get_loops():
    return [
        {
            "id": "1",
            "title": "Fullstack Developer",
            "keywords": "React, Java, Spring Boot",
            "location": "Bangalore",
            "status": "ACTIVE",
            "applications_count": 15
        },
        {
            "id": "2",
            "title": "AI Engineer",
            "keywords": "Python, LLMs, PyTorch",
            "location": "Remote",
            "status": "ACTIVE",
            "applications_count": 9
        },
        {
            "id": "3",
            "title": "Backend Specialist",
            "keywords": "Postgres, Redis, Microservices",
            "location": "Hyderabad",
            "status": "PAUSED",
            "applications_count": 0
        }
    ]

@router.get("/applications")
async def get_applications():
    # Returning a larger list to match the "24" count better, or just enough to look good
    return [
        {"id": "101", "company": "Google", "role": "Senior Developer", "platform": "LinkedIn", "status": "APPLIED", "loop_id": "1"},
        {"id": "102", "company": "Meta", "role": "Staff Engineer", "platform": "Indeed", "status": "INTERVIEW", "loop_id": "1"},
        {"id": "103", "company": "Amazon", "role": "SDE II", "platform": "LinkedIn", "status": "REJECTED", "loop_id": "1"},
        {"id": "104", "company": "Netflix", "role": "UI Engineer", "platform": "LinkedIn", "status": "APPLIED", "loop_id": "1"},
        {"id": "105", "company": "Apple", "role": "Swift Developer", "platform": "Indeed", "status": "APPLIED", "loop_id": "1"},
    ]

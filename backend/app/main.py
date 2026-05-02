from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import resume, jobs, gmail, dashboard, settings as settings_router
import os

app = FastAPI(title=settings.APP_NAME)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router)
app.include_router(jobs.router)
app.include_router(gmail.router)
app.include_router(dashboard.router)
app.include_router(settings_router.router)

@app.get("/")
async def root():
    return {"message": "Welcome to AutoApply API", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/api/logs")
async def get_logs():
    log_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "backend.log")
    if os.path.exists(log_path):
        with open(log_path, "r") as f:
            content = f.read()
        return Response(content=content, media_type="text/plain")
    return {"error": "Log file not found"}


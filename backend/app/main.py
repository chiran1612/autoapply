from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import resume, jobs, gmail, dashboard

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

@app.get("/")
async def root():
    return {"message": "Welcome to AutoApply API", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    APP_NAME: str = "AutoApply API"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "sqlite:///./autoapply.db" # Default to SQLite for local development
    
    # AI - Gemini
    GEMINI_API_KEY: Optional[str] = None
    
    # Playwright / Bots
    LINKEDIN_EMAIL: Optional[str] = None
    LINKEDIN_PASSWORD: Optional[str] = None
    NAUKRI_EMAIL: Optional[str] = None
    NAUKRI_PASSWORD: Optional[str] = None
    INDEED_EMAIL: Optional[str] = None
    INDEED_PASSWORD: Optional[str] = None
    
    # SMTP
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    
    class Config:
        env_file = ".env"

settings = Settings()

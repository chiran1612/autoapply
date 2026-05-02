from fastapi import APIRouter, Body
from app.config import settings
import os

router = APIRouter(prefix="/api/settings", tags=["settings"])

@router.post("/credentials")
async def save_credentials(credentials: dict = Body(...)):
    # Update the .env file (for local development support as requested)
    env_path = ".env"
    
    # Read current lines
    if os.path.exists(env_path):
        with open(env_path, "r") as f:
            lines = f.readlines()
    else:
        lines = []

    # Map of key names to env names
    mapping = {
        "linkedin_email": "LINKEDIN_EMAIL",
        "linkedin_password": "LINKEDIN_PASSWORD",
        "naukri_email": "NAUKRI_EMAIL",
        "naukri_password": "NAUKRI_PASSWORD",
        "indeed_email": "INDEED_EMAIL",
        "indeed_password": "INDEED_PASSWORD",
        "twitter_user": "TWITTER_USER",
        "twitter_pass": "TWITTER_PASS"
    }

    new_lines = []
    processed_keys = set()

    for line in lines:
        matched = False
        for key, env_name in mapping.items():
            if line.startswith(f"{env_name}="):
                new_val = credentials.get(key, "")
                new_lines.append(f"{env_name}={new_val}\n")
                processed_keys.add(env_name)
                matched = True
                break
        if not matched:
            new_lines.append(line)

    # Add any missing keys
    for env_name in mapping.values():
        if env_name not in processed_keys:
            new_val = credentials.get([k for k, v in mapping.items() if v == env_name][0], "")
            new_lines.append(f"{env_name}={new_val}\n")

    with open(env_path, "w") as f:
        f.writelines(new_lines)

    return {"status": "success", "message": "Credentials updated successfully"}

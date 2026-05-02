from fastapi import APIRouter, HTTPException, Body, Header, Request
from typing import List, Dict, Optional
from app.config import settings
import httpx
import uuid

router = APIRouter(prefix="/api", tags=["dashboard"])

async def supabase_request(table: str, method: str = "GET", params: dict = None, data: dict = None, auth_header: str = None):
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        return None
    
    headers = {
        "apikey": settings.SUPABASE_KEY,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    
    # Use the provided JWT if it's valid (3 parts). 
    # Otherwise, fallback to the anon key as the Bearer token for guest access.
    is_valid_jwt = False
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
        if token.count(".") == 2:
            headers["Authorization"] = auth_header
            is_valid_jwt = True
            print(f"Using valid user JWT for {method} {table}")
    
    if not is_valid_jwt:
        # Fallback to anon key for Authorization header
        headers["Authorization"] = f"Bearer {settings.SUPABASE_KEY}"
        print(f"Falling back to anon key for {method} {table}")
    
    url = f"{settings.SUPABASE_URL}/rest/v1/{table}"
    
    async with httpx.AsyncClient() as client:
        try:
            if method == "GET":
                response = await client.get(url, headers=headers, params=params)
            elif method == "POST":
                response = await client.post(url, headers=headers, json=data)
            elif method == "DELETE":
                response = await client.delete(url, headers=headers, params=params)
            
            if response.status_code >= 400:
                print(f"Supabase Error {response.status_code} on {method} {table}: {response.text}")
            
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Supabase {method} request failed: {e}")
            return None

@router.get("/dashboard/stats")
async def get_stats(authorization: Optional[str] = Header(None)):
    loops = await supabase_request("loops", params={"select": "count"}, auth_header=authorization)
    apps = await supabase_request("applications", params={"select": "count"}, auth_header=authorization)
    
    loop_count = loops[0]['count'] if (loops and isinstance(loops, list)) else 0
    app_count = apps[0]['count'] if (apps and isinstance(apps, list)) else 0
    
    return {
        "activeLoops": loop_count,
        "totalApplications": app_count,
        "interviews": 2,
        "successRate": 8.5
    }

@router.get("/loops")
async def get_loops(authorization: Optional[str] = Header(None)):
    data = await supabase_request("loops", params={"select": "*"}, auth_header=authorization)
    return data if data else []

@router.post("/loops")
async def create_loop(loop_data: dict = Body(...), authorization: Optional[str] = Header(None)):
    new_loop = {
        "id": str(uuid.uuid4()),
        "title": loop_data.get("title"),
        "location": loop_data.get("location"),
        "keywords": loop_data.get("keywords"),
        "status": "ACTIVE",
        "user_id": loop_data.get("user_id", "audit-tester"),
        "applications_count": 0
    }
    result = await supabase_request("loops", method="POST", data=new_loop, auth_header=authorization)
    if result:
        return result[0]
    raise HTTPException(status_code=500, detail="Failed to create loop in Supabase.")

@router.delete("/loops/{id}")
async def delete_loop(id: str, authorization: Optional[str] = Header(None)):
    await supabase_request("loops", method="DELETE", params={"id": f"eq.{id}"}, auth_header=authorization)
    return {"status": "success"}

@router.get("/applications")
async def get_applications(authorization: Optional[str] = Header(None)):
    data = await supabase_request("applications", params={"select": "*"}, auth_header=authorization)
    return data if data else []

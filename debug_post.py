import requests
import os
from dotenv import load_dotenv
import uuid

load_dotenv('frontend/.env')
URL = os.getenv('VITE_SUPABASE_URL')
KEY = os.getenv('VITE_SUPABASE_ANON_KEY')

headers = {
    "apikey": KEY,
    "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

new_loop = {
    "id": str(uuid.uuid4()),
    "title": "TEST LOOP",
    "location": "Remote",
    "keywords": "Test",
    "status": "ACTIVE",
    "user_id": "audit-tester", # Using the ID we saw earlier
    "applications_count": 0
}

r = requests.post(f"{URL}/rest/v1/loops", headers=headers, json=new_loop)
print(f"Status: {r.status_code}")
print(f"Response: {r.text}")

import requests
import os
from dotenv import load_dotenv

# Load env from frontend
load_dotenv('frontend/.env')

URL = os.getenv('VITE_SUPABASE_URL')
KEY = os.getenv('VITE_SUPABASE_ANON_KEY')

if not URL or not KEY:
    print("Error: Supabase URL or Key not found in .env")
    exit(1)

headers = {
    "apikey": KEY,
    "Authorization": f"Bearer {KEY}"
}

tables = ["loops", "applications"]

print(f"--- Checking Supabase Data Status ---")
print(f"URL: {URL}")

for table in tables:
    try:
        response = requests.get(f"{URL}/rest/v1/{table}?select=count", headers=headers)
        if response.status_code == 200:
            count = response.json()[0]['count']
            print(f"[OK] Table '{table}': {count} records")
        else:
            print(f"[ERROR] Table '{table}': {response.status_code} - {response.text}")
    except Exception as e:
        print(f"[ERROR] Failed to query '{table}': {e}")

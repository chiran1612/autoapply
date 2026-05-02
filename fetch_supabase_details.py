import requests
import os
from dotenv import load_dotenv
import json

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

print(f"--- Detailed Supabase Status Report ---")
print(f"Project URL: {URL}")

# Check Loops
try:
    print("\n[Table: loops]")
    response = requests.get(f"{URL}/rest/v1/loops?select=*", headers=headers)
    if response.status_code == 200:
        data = response.json()
        print(f"Total Records: {len(data)}")
        if data:
            print("Recent Samples:")
            for item in data[:3]:
                print(f" - ID: {item.get('id')} | Title: {item.get('title')} | Status: {item.get('status')}")
    else:
        print(f"Error fetching loops: {response.status_code}")
except Exception as e:
    print(f"Exception fetching loops: {e}")

# Check Applications
try:
    print("\n[Table: applications]")
    response = requests.get(f"{URL}/rest/v1/applications?select=*", headers=headers)
    if response.status_code == 200:
        data = response.json()
        print(f"Total Records: {len(data)}")
        if data:
            print("Recent Samples:")
            for item in data[:3]:
                print(f" - ID: {item.get('id')} | Company: {item.get('company')} | Status: {item.get('status')}")
    else:
        print(f"Error fetching applications: {response.status_code}")
except Exception as e:
    print(f"Exception fetching applications: {e}")

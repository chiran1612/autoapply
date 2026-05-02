import requests
import json

url = "http://localhost:8000/api/loops"
payload = {
    "title": "PY TEST",
    "location": "Remote",
    "keywords": "python, test",
    "user_id": "audit-tester"
}

r = requests.post(url, json=payload)
print(f"Status: {r.status_code}")
print(f"Response: {r.text}")

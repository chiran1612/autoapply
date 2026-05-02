import httpx
import asyncio

SUPABASE_URL = "https://pgcthjuqrejtummjnivu.supabase.co"
SUPABASE_KEY = "sb_publishable_FpnhWKFhiG0tz8A06vzqNA_cNw7H5kW"

async def create_test_user():
    email = "testuser123@gmail.com"
    password = "password123"
    
    url = f"{SUPABASE_URL}/auth/v1/signup"
    headers = {
        "apikey": SUPABASE_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "email": email,
        "password": password
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, headers=headers, json=data)
            if response.status_code == 200:
                print(f"Successfully signed up {email}")
                print(response.json())
            elif response.status_code == 400 and "User already registered" in response.text:
                print(f"User {email} already exists. Attempting login...")
                login_url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
                login_response = await client.post(login_url, headers=headers, json=data)
                print(f"Login Status: {login_response.status_code}")
                if login_response.status_code == 200:
                    print("Login successful. Here is your session token:")
                    print(login_response.json().get("access_token"))
                else:
                    print(f"Login failed: {login_response.text}")
            else:
                print(f"Failed to sign up: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(create_test_user())

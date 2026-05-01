import os.path
import base64
import logging
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

class GmailService:
    def __init__(self):
        self.creds = None
        # The file token.json stores the user's access and refresh tokens
        if os.path.exists('token.json'):
            self.creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    async def scan_for_interviews(self):
        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                self.creds.refresh(Request())
            else:
                return {"status": "error", "message": "Gmail authentication required"}

        try:
            service = build('gmail', 'v1', credentials=self.creds)
            
            # Search for interview keywords
            query = 'subject:(Interview OR "Schedule an interview" OR "Invitation to interview")'
            results = service.users().messages().list(userId='me', q=query, maxResults=10).execute()
            messages = results.get('messages', [])

            interviews = []
            if not messages:
                logger.info("No interview emails found.")
            else:
                for message in messages:
                    msg = service.users().messages().get(userId='me', id=message['id']).execute()
                    
                    # Extract snippet and subject
                    snippet = msg.get('snippet', '')
                    headers = msg.get('payload', {}).get('headers', [])
                    subject = next((h['value'] for h in headers if h['name'] == 'Subject'), 'No Subject')
                    
                    interviews.append({
                        "id": message['id'],
                        "subject": subject,
                        "snippet": snippet,
                        "date": msg.get('internalDate')
                    })
            
            return {"status": "success", "interviews": interviews}

        except Exception as e:
            logger.error(f"Gmail scan failed: {e}")
            return {"status": "error", "message": str(e)}

gmail_service = GmailService()

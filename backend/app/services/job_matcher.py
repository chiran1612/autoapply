from google import genai
from app.config import settings
import json

class JobMatcher:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        else:
            self.client = None

    async def score_job(self, profile_summary: str, job_description: str):
        if not self.client:
            return {"score": 50, "reason": "AI scoring not available (no key)"}

        prompt = f"""
        Given this candidate profile summary:
        {profile_summary}

        And this job description:
        {job_description}

        Rate the match on a scale of 0-100. Consider skills, experience level, and role alignment.
        Return ONLY valid JSON: {{"score": integer, "reason": "short explanation"}}
        """

        try:
            response = self.client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
            )
            cleaned_text = response.text.strip()
            if cleaned_text.startswith("```json"):
                cleaned_text = cleaned_text[7:-3].strip()
            elif cleaned_text.startswith("```"):
                cleaned_text = cleaned_text[3:-3].strip()

            return json.loads(cleaned_text)
        except Exception as e:
            return {"score": 0, "reason": f"Scoring error: {str(e)}"}

job_matcher = JobMatcher()

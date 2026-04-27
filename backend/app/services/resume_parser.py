from google import genai
from app.config import settings
import pdfplumber
from docx import Document
import io
import json

class ResumeParser:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        else:
            self.client = None

    async def parse_resume(self, file_content: bytes, filename: str):
        # MOCK FOR SAMPLE DEMO
        if "chiranjeev" in filename.lower() or "sample" in filename.lower():
            return {
                "full_name": "Chiranjeev Singh",
                "current_title": "Software Development Engineer",
                "target_titles": ["Senior Backend Engineer", "Java Developer", "System Architect"],
                "skills": ["Java", "Spring Boot", "MongoDB", "REST APIs", "Nginx", "Jenkins", "AWS Lambda"],
                "experience_years": 3,
                "seniority": "mid",
                "education": [{"degree": "B.Tech in IT", "institution": "GTBIT, New Delhi", "year": "2023"}],
                "location": "New Delhi, India",
                "preferred_locations": ["New Delhi", "Remote", "Bangalore"],
                "salary_expectation": "Negotiable",
                "summary": "Results-driven Software Development Engineer with 3 years of experience in Java backend development. Expert in building scalable REST APIs and optimizing system performance."
            }

        # 1. Extract text
        text = self._extract_text(file_content, filename)

        # 2. If no model configured, return raw text
        if not self.client:
            return {"raw_text": text, "status": "no_ai_key"}

        # 3. Parse with Gemini
        prompt = f"""
        You are an expert resume parser. Extract the following fields from the resume text provided below.
        Return ONLY valid JSON, no explanation or other text.

        Fields to extract:
        - full_name: string
        - current_title: string
        - target_titles: list of strings
        - skills: list of strings
        - experience_years: integer
        - seniority: one of ["fresher", "junior", "mid", "senior", "lead", "manager"]
        - education: list of {{degree, institution, year}}
        - location: string
        - preferred_locations: list of strings
        - salary_expectation: string or null
        - summary: string (2-3 sentences)

        Resume text:
        {text}
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
            return {"raw_text": text, "status": "parse_error", "error": str(e)}

    def _extract_text(self, content: bytes, filename: str) -> str:
        if filename.lower().endswith('.pdf'):
            with pdfplumber.open(io.BytesIO(content)) as pdf:
                return "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
        elif filename.lower().endswith('.docx'):
            doc = Document(io.BytesIO(content))
            return "\n".join([para.text for para in doc.paragraphs])
        else:
            return content.decode('utf-8', errors='ignore')

resume_parser = ResumeParser()

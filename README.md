# AutoApply
> AI-powered job search, auto-application, and response tracking system

AutoApply is an end-to-end job application automation platform. A user uploads their resume once, and the system handles the rest.

## 🚀 Features
- **AI Resume Parsing**: Extracts skills and experience automatically using Gemini.
- **Job Search Engine**: Scours LinkedIn, Naukri, Indeed, and Twitter (X) for matching roles.
- **Auto-Apply Bots**: Uses Playwright to apply to relevant jobs automatically.
- **Gmail Tracking**: Monitors your inbox for interview invites and rejections.
- **Premium Dashboard**: Real-time status tracking with sleek analytics.

## 🛠 Tech Stack
- **Backend**: FastAPI, SQLAlchemy, Celery, Redis, Playwright.
- **Frontend**: React, Vite, Tailwind CSS.
- **AI**: Google Gemini API.

## 🏁 Getting Started

### Backend Setup
1. `cd backend`
2. `python -m venv venv`
3. `.\venv\Scripts\activate` (Windows)
4. `pip install -r requirements.txt`
5. Create a `.env` file and add your `GEMINI_API_KEY`.
6. `uvicorn app.main:app --reload`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## 📅 Progress
Check [task.md](./task.md) for current implementation status.
Check [implementation_plan.md](./implementation_plan.md) for the roadmap.
Check [walkthrough.md](./walkthrough.md) for a summary of changes.

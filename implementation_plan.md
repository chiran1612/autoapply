# AutoApply Implementation Plan

AutoApply is an AI-powered job search and automation platform. This plan covers the full development lifecycle, starting with the foundation and Phase 1 (Resume Parsing).

## User Review Required

> [!IMPORTANT]
> **Docker Not Found**: Docker and Docker Compose were not detected on your system. I will proceed with local setup instructions (Python venv and Node.js). You will need to have PostgreSQL and Redis installed locally for the full system to work, or I can use SQLite for initial development.

> [!NOTE]
> **AI Choice**: I will implement the AI logic using the **Gemini API** (as it is natively available to me) instead of Claude, unless you specifically require Claude. This will simplify the setup as I can use the same models I'm powered by.

## Proposed Changes

### Project Foundation

#### [NEW] Directory Structure
Initialize the project with the following structure:
- `backend/`: FastAPI application
- `frontend/`: Vite/React application
- `shared/`: Shared types/config (optional)

#### [NEW] `backend/requirements.txt`
Define backend dependencies: FastAPI, SQLAlchemy, Pydantic, Anthropic/Google-GenerativeAI, Playwright, Celery, Redis.

#### [NEW] `frontend/package.json`
Initialize React app with Vite, Tailwind CSS, and Axios.

---

### Phase 1: Resume Parser & AI Profile Extraction

#### [NEW] `backend/app/services/resume_parser.py`
Logic to extract text from PDF/DOCX and parse it into a structured JSON profile using Gemini/AI.

#### [NEW] `backend/app/routers/resume.py`
API endpoints for resume upload and profile management.

#### [NEW] `frontend/src/components/ResumeUpload.jsx`
A premium-designed upload component with drag-and-drop and progress indicators.

---

### Phase 2-5 (Overview)
- **Phase 2**: Job search engines for LinkedIn, Naukri, Indeed, and Twitter (X).
- **Phase 3**: Automation bots using Playwright.
- **Phase 4**: Gmail integration and classification.
- **Phase 5**: Full Dashboard UI and stats.

## Verification Plan

### Automated Tests
- Test resume parsing with sample PDFs.
- Test API endpoints using `pytest`.
- Test UI components with Playwright/Vitest.

### Manual Verification
- Upload a sample resume and verify the parsed JSON output in the UI.
- Verify status updates in the dashboard after simulated applications.

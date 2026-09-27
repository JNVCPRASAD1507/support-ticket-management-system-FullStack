# Support Ticket Management System

Full-stack: FastAPI + SQLAlchemy/Alembic backend and React + Vite + Material UI frontend. Backend source, migrations, and tests from the supplied archive are retained; the vanilla frontend is replaced.

## Requirements
Python 3.10+ (check backend dependencies), Node.js 20+, npm, PostgreSQL.

## Backend (PowerShell)
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```
Edit `.env` with your PostgreSQL URL and a strong random JWT secret. Never commit `.env`.
```powershell
alembic upgrade head
python scripts/seed_data.py
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
Skip seeding if using an existing database. API docs: http://127.0.0.1:8000/docs ; health: http://127.0.0.1:8000/health

## Frontend
In another terminal:
```powershell
cd frontend
npm install
npm run dev
```
Open the URL Vite prints (normally http://localhost:5173). Configure `VITE_API_URL` using `frontend/.env` if the backend URL differs.

## Tests/build
```powershell
# backend
cd backend
python -m pytest -q
# frontend (from frontend/)
npm run build
```
Run frontend build from `frontend/`, not `backend/`.

## Integration and deployment notes
- Endpoint inventory: [docs/API_ENDPOINTS.md](docs/API_ENDPOINTS.md). Verify payload schemas and permissions in each backend router.
- UI includes sign-in, ticket list/create/detail, status update, comments, and read views for users/categories/notifications.
- Attachment upload/deletion, assignment, admin mutations, and audit-log screens are not yet implemented in this React UI. Feature parity is not complete.
- Tokens remain in localStorage for compatibility with the original API. For higher-security deployments, evaluate secure HttpOnly cookies and CSRF protections.
- Backend tests were not run during packaging. Run them against your configured test database; no production certification is implied.
- Before deployment, restrict CORS to your deployed frontend origin, enforce HTTPS, configure safe file storage/limits, secrets, monitoring/logging, and database backups.

# CampusAssistantAI

A production-oriented FastAPI backend for an AI-powered campus assistant.

CampusAssistantAI provides authenticated API endpoints for student onboarding, campus announcements, FAQ management, and AI-assisted question answering over campus data such as courses, office hours, offices, exams, and announcements.

---

## Overview

This project is designed as a **layered modular monolith**:

- **API layer** handles HTTP routing and request entry points.
- **Service layer** contains application use-cases and orchestration logic.
- **Domain layer** contains AI classification, validation, and response generation logic.
- **Infrastructure layer** handles persistence, repositories, authentication integration, and database access.

This structure keeps the codebase easier to maintain than a tightly-coupled monolith, while avoiding the operational complexity of microservices.

---

## Core Features

- **AI campus assistant endpoint** for answering campus-related questions
- **Supabase-authenticated backend** using JWT verification through JWKS
- **Student setup flow** for onboarding newly authenticated users
- **Role-based announcements** retrieval and management view
- **FAQ item management** endpoints
- **SQLAlchemy-based data access** with repository-style separation
- **CORS configuration** for local development and deployed frontend domains

---

## Tech Stack

- **Python 3.12+**
- **FastAPI**
- **SQLAlchemy**
- **Supabase Auth**
- **OpenAI API**
- **Google Gemini API**
- **Uvicorn**
- **PostgreSQL-compatible database**

---

## Project Structure

```text
CampusAssistantAI/
├── api/                       # Routes and auth dependency
│   ├── dependencies.py
│   └── routes/
├── domain/                    # AI orchestration and validation logic
│   └── ai/
├── infrastructure/            # DB, repositories, external integrations
│   ├── ai/
│   ├── db/
│   └── repositories/
├── schemas/                   # Request validation schemas
│   └── endpoint_validation/
├── services/                  # Application service layer
├── test-red-team/             # QA and red-team assets
├── app.py                     # FastAPI application entry point
└── requirements.txt
```

---

## API Modules

### 1. AI
Handles AI-based campus queries.

**Endpoint**
- `POST /ai-prompt`

**Purpose**
- Accept a user question
- Classify the question
- Select the correct repository
- Fetch relevant data
- Generate a natural-language answer

---

### 2. User Setup and Personnel Loading
Handles onboarding and fetching the current user's stored campus profile.

**Endpoints**
- `GET /load-personnel-data/`
- `POST /load-personnel-data/setup`

---

### 3. Announcements
Supports announcement creation, retrieval, update, delete, and management access.

**Endpoints**
- `POST /announcements`
- `GET /announcements`
- `PUT /announcements/{announcement_id}`
- `DELETE /announcements/{announcement_id}`
- `GET /management/announcements`

---

### 4. FAQ
Supports FAQ retrieval and management.

**Endpoints**
- `GET /faq-items`
- `POST /faq-item`
- `PUT /{faq_item_id}`
- `DELETE /{faq_item_id}`

> Note: the FAQ update and delete routes are currently mounted at root-level path parameters. In a production cleanup, these should usually be moved under a dedicated FAQ prefix such as `/faq-item/{faq_item_id}`.

---

## Authentication

This backend expects a valid **Supabase Bearer token** in the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

The auth flow in `api/dependencies.py` currently:

1. Extracts the Bearer token
2. Resolves the Supabase JWKS endpoint from `SUPABASE_URL`
3. Verifies the JWT signature and issuer
4. Reads user claims such as `sub` and `email`
5. Finds or creates a matching local `User` record

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST:PORT/DB_NAME
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Variable Notes

- `DATABASE_URL`: database connection string used by SQLAlchemy
- `SUPABASE_URL`: used to derive the JWKS URL and issuer for token verification
- `OPENAI_API_KEY`: used by the AI response/classification services
- `GEMINI_API_KEY`: used by Gemini-powered responder/notification logic

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ItayKarp/AICampusAssistant-Hackathon.git
cd CampusAssistantAI
```

### 2. Create and activate a virtual environment

**Windows (PowerShell)**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**macOS / Linux**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the project root and add the required values.

### 5. Start the API

```bash
uvicorn app:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

---

## Local Development

### Allowed frontend origins
The application currently allows CORS for:

- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `https://www.itaykarpov.com`
- `https://itaykarpov.com`

If your frontend runs on a different domain or port, update the `origins` list in `app.py`.

---

## Example Requests

### Health of the API process
Once the server starts, test a protected endpoint with a valid token.

### Example: ask the AI a question

```bash
curl -X POST "http://127.0.0.1:8000/ai-prompt" \
  -H "Authorization: Bearer YOUR_SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"question":"Where is the engineering office?"}'
```

### Example: complete new-user setup

```bash
curl -X POST "http://127.0.0.1:8000/load-personnel-data/setup" \
  -H "Authorization: Bearer YOUR_SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Itay",
    "last_name": "Karpov",
    "major": "Software Engineering",
    "year": 2
  }'
```

### Example: fetch announcements

```bash
curl -X GET "http://127.0.0.1:8000/announcements" \
  -H "Authorization: Bearer YOUR_SUPABASE_ACCESS_TOKEN"
```

---

## Running in Production

A typical production flow:

1. Set environment variables on the host or deployment platform
2. Install dependencies in a virtual environment
3. Run with a production ASGI server configuration
4. Place the app behind a reverse proxy such as Nginx
5. Manage the process with `systemd`, Docker, or a platform service manager

Example `systemd` restart flow:

```bash
sudo systemctl daemon-reload
sudo systemctl restart <your-service-name>
sudo systemctl status <your-service-name>
```

To inspect logs:

```bash
journalctl -u <your-service-name> -n 100 --no-pager
```

---

## Data Model Summary

The project includes models for:

- `User`
- `Student`
- `Course`
- `Exam`
- `Office`
- `OfficeOpeningHour`
- `StudentClass`
- `Announcement`
- `FaqItem`
- `QuestionLog`
- `AuditLog`
- `Notification`
- `SupportTicket`

This gives the backend a solid base for both student-facing features and future administrative features.

---

## Architectural Notes

This project follows a layered modular monolith approach because it fits the problem well:

- **Simple deployment**: one backend service is easier to run during development and hackathon delivery
- **Clear separation of concerns**: routing, domain logic, services, and repositories are separated cleanly
- **Faster iteration**: easier to change the schema, AI logic, and endpoints without cross-service coordination
- **Lower operational overhead**: avoids the infrastructure cost of microservices
- **Scales structurally first**: the codebase remains organized even before splitting into independent services

---

## Known Improvement Opportunities

The codebase is functional, but a few areas are worth tightening before a full production rollout:

- Add a dedicated health-check endpoint
- Normalize route naming for FAQ endpoints
- Add stronger request/response schemas for all endpoints
- Add consistent error handling and logging
- Remove debug `print()` statements from auth dependency code
- Add migration tooling such as Alembic
- Add automated tests for authentication, route permissions, and AI query flows

---

## Troubleshooting

### `SUPABASE_URL is not configured`
Add `SUPABASE_URL` to your `.env` file.

### `JWT verification failed`
Usually means one of the following:
- the frontend token is missing
- the token is expired
- the token issuer does not match your Supabase project
- the request is not sending `Authorization: Bearer <token>` correctly

### Database connection errors
Check:
- `DATABASE_URL`
- database host reachability
- credentials
- SSL requirements, if your provider requires them

### CORS errors in the browser
Add your frontend origin to the `origins` list in `app.py`.

---

## Recommended Next Steps

For a stronger production version, consider adding:

- API versioning
- structured logging
- Alembic migrations
- Docker support
- test coverage for service and repository layers
- role/permission middleware
- stricter OpenAPI documentation examples

---

## License

Choose the license that fits your intended use, for example MIT, Apache-2.0, or a private proprietary license.

---

## Author

Built as an AI campus assistant backend focused on fast delivery, clear modular structure, and practical integration with authentication, database access, and AI orchestration.

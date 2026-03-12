# AI Campus Assistant

An AI-powered campus support platform built for a hackathon, designed to help students quickly get academic and campus information through a natural-language chat interface.

The project combines a **React + TypeScript frontend**, a **FastAPI backend**, **Supabase authentication**, and an **AI-assisted retrieval flow** that answers questions about campus data such as courses, exams, office hours, and announcements.

---

## Table of Contents
- [Overview](#overview)
- [Why This Project](#why-this-project)
- [Core Features](#core-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [How the System Works](#how-the-system-works)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Main API Endpoints](#main-api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Management and Roles](#management-and-roles)
- [Testing and QA](#testing-and-qa)
- [Project Documentation](#project-documentation)
- [Known Challenges](#known-challenges)
- [Future Improvements](#future-improvements)

---

## Overview

The **AI Campus Assistant** is a full-stack web application that allows users to:

- register and sign in
- complete an onboarding/setup flow
- view campus announcements
- ask AI-powered campus questions
- retrieve structured answers from backend data
- access a management area with role-based behavior

The system is designed around a **layered modular monolith** architecture. That means the backend is kept in a single deployable application, but the code is separated into clear layers such as API, services, domain logic, repositories, and infrastructure.

This approach was chosen because it gives the project a professional structure without the extra complexity of microservices.

---

## Why This Project

Students often need quick access to campus information such as:

- course details
- exam dates and rooms
- office opening hours
- announcements
- general campus information

Instead of forcing users to search through multiple systems manually, this project provides a single assistant interface that understands natural language, retrieves relevant data, and returns a clear answer.

---

## Core Features

### Student-facing features
- AI chat for campus-related questions
- campus announcements feed
- authentication and session persistence
- onboarding/setup form after account creation
- reset-password flow

### Management-facing features
- role-aware access to management screens
- announcement retrieval for management users
- create, update, and delete announcement actions
- FAQ management support
- student/personnel setup and user profile handling

### Backend and AI features
- question classification before response generation
- repository-based structured data retrieval
- AI-generated final natural-language answers
- protected routes using Supabase JWT verification
- clean separation between API, services, domain, and infrastructure

---

## Architecture

### Chosen architecture: Layered Modular Monolith

The backend is structured as a **layered modular monolith**.

#### Why this architecture was chosen
- simpler to build and deploy during a hackathon
- easier to debug than distributed services
- more maintainable than a tightly-coupled monolith
- professional enough to scale and present clearly
- keeps business logic separated from transport and persistence concerns

### Backend layers
- **API layer** – routes, request handling, auth dependency
- **Service layer** – use-case orchestration and flow control
- **Domain layer** – AI classification, validation, response logic
- **Repository layer** – structured data fetching from the database
- **Infrastructure layer** – database setup, auth integration, external services
- **Schemas/config** – validation models and configuration

### High-level flow
1. User sends a question from the frontend.
2. Backend receives the request.
3. The classifier determines the question category.
4. Relevant repositories fetch matching structured data.
5. The responder generates the final answer.
6. The backend returns the answer to the frontend.
7. The frontend shows the answer in the chat UI.

---

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- Supabase JS
- Lucide React
- Three.js
- ShaderGradient
- js-cookie

### Backend
- Python 3.12+
- FastAPI
- SQLAlchemy
- PostgreSQL-compatible database
- Supabase Auth
- OpenAI API
- Google Gemini API
- Uvicorn

### Dev / Deployment
- Git / GitHub
- systemd / systemctl
- environment-based configuration

---

## Repository Structure

```text
Hackathon-Full-Git/
├── backend/
│   ├── api/
│   ├── domain/
│   ├── infrastructure/
│   ├── schemas/
│   ├── services/
│   ├── test-red-team/
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   ├── supabase/
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
└── docs/
    ├── ai_tests.md
    ├── backlog.md
    ├── daily_logs.md
    ├── retrospective.md
    ├── srs.md
    ├── sequence_diagram.png
    └── use_case_diagram.png
```

### Frontend structure

```text
src/
  app/
    providers/
    router.tsx
    App.tsx
  config/
    constants.ts
  features/
    auth/
    dashboard/
    management/
    setup/
  shared/
    components/
    lib/
    routes/
    types/
    utils/
```

---

## How the System Works

### AI question flow
1. The user enters a question in the frontend chat interface.
2. The frontend sends the question to the backend AI endpoint.
3. The backend classifier analyzes the question and decides what kind of information is needed.
4. The backend fetches structured data from the appropriate repository.
5. The AI responder uses that data as context.
6. A natural-language answer is returned to the user.

### Examples of supported queries
- “When is the Database Systems exam?”
- “What are the opening hours of the Finance Office on Sunday?”
- “What courses are available?”
- “Show me the latest campus announcements.”

---

## Frontend Setup

Go into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:8000
VITE_BASE_URL=/
VITE_FORGOT_PASSWORD_REDIRECT_URL=http://localhost:5173/reset-password
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the frontend:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Backend Setup

Go into the backend folder:

```bash
cd backend
```

Create a virtual environment.

### macOS / Linux
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### Windows PowerShell
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST:PORT/DB_NAME
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
```

Run the backend:

```bash
uvicorn app:app --reload
```

The backend should then be available at:

```text
http://127.0.0.1:8000
```

---

## Environment Variables

### Frontend

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |
| `VITE_BASE_URL` | Base route for deployment, useful for subpaths like `/hackathon` |
| `VITE_FORGOT_PASSWORD_REDIRECT_URL` | Redirect URL used in the forgot-password flow |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anon key |

### Backend

| Variable | Description |
|---|---|
| `DATABASE_URL` | SQLAlchemy database connection string |
| `SUPABASE_URL` | Used for Supabase JWT/JWKS verification |
| `OPENAI_API_KEY` | OpenAI integration key |
| `GEMINI_API_KEY` | Gemini integration key |

---

## Running the Project

Start the backend first:

```bash
cd backend
uvicorn app:app --reload
```

Then start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Typical local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://127.0.0.1:8000`

---

## Main API Endpoints

### AI
- `POST /ai-prompt`

### User setup / personnel
- `GET /load-personnel-data/`
- `POST /load-personnel-data/setup`

### Announcements
- `GET /announcements`
- `POST /announcements`
- `PUT /announcements/{announcement_id}`
- `DELETE /announcements/{announcement_id}`
- `GET /management/announcements`

### FAQ
- `GET /faq-items`
- `POST /faq-item`
- `PUT /{faq_item_id}`
- `DELETE /{faq_item_id}`

> Note: the FAQ update/delete routing appears to be mounted at root-level parameter paths and would benefit from cleanup under a dedicated FAQ prefix.

---

## Authentication Flow

Authentication is handled with **Supabase**.

### Backend expectation
Protected endpoints expect:

```http
Authorization: Bearer <access_token>
```

### Flow
1. User logs in or registers with Supabase.
2. Frontend stores and boots the session.
3. Backend verifies the Bearer token.
4. Backend resolves the matching local user.
5. User is either sent to setup or into the main app.

### Reset-password flow
The frontend also supports:
- forgot password
- redirect back into the frontend reset page
- session restoration / password update flow

---

## Management and Roles

The project supports at least two roles:

- **student**
- **management**

Role-aware behavior includes:
- management page access
- restricted data retrieval
- announcement management
- FAQ-related actions

The frontend allows navigation into the management area, while the backend decides whether the current user is allowed to access the requested data.

---

## Testing and QA

The repository includes QA and red-team related assets under:

```text
backend/test-red-team/
```

Included files indicate:
- QA reporting
- red-team test runs
- rerun summaries
- JSON result artifacts

The `docs/ai_tests.md` file also includes structured test cases for:
- course lookup
- exam lookup
- office-hours lookup
- validation behavior

The backlog currently shows the following as completed:
- SRS document
- use case diagram
- sequence diagram
- question API endpoint
- assistant service connection
- classifier integration
- exam, office-hours, and course retrieval
- final AI answer generation
- unknown question handling
- empty input handling
- frontend question form testing
- integration bug fixes
- final testing and cleanup

---

## Project Documentation

The `docs/` folder includes supporting project material such as:

- `backlog.md`
- `daily_logs.md`
- `retrospective.md`
- `ai_tests.md`
- `sequence_diagram.png`
- `use_case_diagram.png`

These documents cover:
- progress tracking
- testing
- reflection
- architecture and project planning

---

## Known Challenges

Some of the biggest implementation challenges during the project were:

- migrating authentication to a more suitable JWT-based flow
- aligning classifier output with repository filters
- preventing the AI layer from becoming too broad or too responsible
- frontend routing and reset-password redirects
- integration bugs between frontend response parsing and backend JSON structure

These challenges helped shape the final design into a more controlled and maintainable system.

---

## Future Improvements

Some good next steps for the project would be:

- improve automated test coverage
- standardize classifier output contracts
- strengthen validation between classifier, repositories, and responder
- clean up API route consistency, especially FAQ routes
- improve frontend UX polish and error states
- add more management tools and analytics
- expand supported campus knowledge domains

---

## Final Notes

This project demonstrates a practical full-stack AI application with real architectural thinking behind it. It combines structured backend logic with AI-assisted responses, while keeping the codebase organized enough to maintain, extend, and present professionally.


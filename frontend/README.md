# AI Campus Assistant Frontend

A clean and modern frontend for an AI-powered campus assistant.

This project provides authentication, user setup, campus announcements, an AI chat interface, and a role-aware management area for handling announcements and FAQ content.

---

## Overview

The application is built for a campus environment where users can:

- sign in and register with Supabase authentication
- complete a short personnel setup flow after account creation
- view active campus announcements
- ask questions through the AI assistant
- access a management area with role-based permissions
- manage announcements and FAQ items when authorized

---

## Features

- **Authentication**
  - Login
  - Registration
  - Forgot password flow
  - Reset password page
  - Session bootstrap on app load

- **User setup**
  - Post-registration setup form
  - Stores personnel information such as first name, last name, major, and year

- **Dashboard**
  - Announcement feed
  - AI chat panel
  - Clean, app-style UI

- **Management**
  - Management announcements page
  - Announcement create, update, and delete actions
  - FAQ create and update support
  - Role-aware access behavior

- **Frontend architecture**
  - React + TypeScript + Vite
  - Feature-based folder organization
  - Shared API utilities and reusable UI components

---

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **React Router**
- **Supabase Auth**
- **Lucide React**
- **Three.js / ShaderGradient**
- **js-cookie**

---

## Project Structure

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
      api/
      components/
      pages/
    dashboard/
      api/
      components/
      pages/
    management/
      api/
      components/
      pages/
    setup/
      pages/

  shared/
    components/
    lib/
    routes/
    types/
    utils/
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root.

Use these variables:

```env
VITE_API_URL=http://localhost:8000
VITE_BASE_URL=/
VITE_FORGOT_PASSWORD_REDIRECT_URL=http://localhost:5173/reset-password
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

---

## Environment Variables

| Variable | Required | Description |
|---|---:|---|
| `VITE_API_URL` | Yes | Backend API base URL |
| `VITE_BASE_URL` | Yes | Base path for the app, useful when deployed under a subpath such as `/hackathon` |
| `VITE_FORGOT_PASSWORD_REDIRECT_URL` | Yes | Redirect URL used in the password reset flow |
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase public anon key |

---

## Available Scripts

| Command | Description |
|---|---|
| `npm install` | Installs project dependencies |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Type-checks and builds the project |
| `npm run preview` | Serves the production build locally |

---

## Main App Flow

### Authentication flow

1. User registers or logs in through Supabase
2. Session is validated on app startup
3. If setup is incomplete, user is redirected to the setup page
4. After setup, the user is taken to the dashboard

### Dashboard flow

1. Active announcements are loaded from the backend
2. User can ask questions through the AI prompt bar
3. AI responses are displayed in the chat panel

### Management flow

1. Any authenticated user can navigate to the management route
2. Backend permissions determine what data the user can access
3. Authorized users can manage announcements and FAQ items

---

## API Expectations

This frontend expects a backend that provides endpoints similar to the following:

### Authentication-related

- `GET /load-personnel-data/`
- `POST /load-personnel-data/setup`

### Dashboard

- `GET /announcements`
- `POST /ai-prompt`

### Management

- `GET /management/announcements`
- `POST /management/announcements`
- `PUT /management/announcements/:id`
- `DELETE /management/announcements/:id`
- `GET /faq-items`
- `POST /faq-item`
- `PUT /faq-item/:id` or equivalent fallback path

---

## Routing

The application currently includes these main routes:

- `/login`
- `/register`
- `/reset-password`
- `/setup`
- `/`
- `/management`

---

## Notes

- Authentication is handled with **Supabase**.
- API requests are centralized through a shared HTTP utility.
- Stored session and user-related data are kept in cookies and local storage where needed.
- The app supports deployment under a subpath by using `VITE_BASE_URL`.
- The forgot-password flow redirects users back into the frontend reset-password page.

---

## Troubleshooting

### App fails on startup with missing Supabase variables

Make sure both of these are set:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

### API requests fail immediately

Check that:

- `VITE_API_URL` points to the correct backend
- the backend is running
- CORS is configured correctly on the backend

### Reset password redirects to the wrong page

Check:

- `VITE_BASE_URL`
- `VITE_FORGOT_PASSWORD_REDIRECT_URL`
- Supabase redirect URL settings

### App deployed under a subpath

If the app is hosted under something like `/hackathon`, set:

```env
VITE_BASE_URL=/hackathon/
```

---

## Suggested Production Checklist

- Set production environment variables
- Add the correct Supabase redirect URLs
- Confirm backend CORS settings
- Confirm protected routes behave correctly
- Verify management permissions by role
- Build and test with `npm run build`

---

## License

This project is private unless you choose to add a license.

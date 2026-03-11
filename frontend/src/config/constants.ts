export const API_BASE_URL = import.meta.env.VITE_API_URL;
export const APP_BASE_URL = import.meta.env.VITE_BASE_URL ?? "/";


export const STORAGE_KEYS = {
  token: "hackathon_access_token",
  setupPending: "hackathon_setup_pending",
};

export const COOKIE_KEYS = {
  authPayload: "hackathon_auth_payload",
  personnel: "hackathon_personnel_data",
  role: "hackathon_user_role",
};

export const USER_ROLES = {
  student: "student",
  management: "management",
  admin: "admin",
  authenticated: "authenticated",
} as const;

export const ANNOUNCEMENT_TARGET_ROLES = [
  "student",
  "management",
  "admin",
] as const;

export const FAQ_CATEGORIES = [
  "general",
  "announcements",
  "office_opening_hours",
  "offices",
  "exams",
  "courses",
  "account",
] as const;

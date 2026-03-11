import type { User } from "@supabase/supabase-js";

export type UserRole = string;

export interface AuthPayload {
  token: string;
  user: User;
  user_id: string;
  email: string | null;
  role: UserRole | null;
  expires_at: number | null;
}

export interface PersonnelProfile {
  first_name?: string;
  last_name?: string;
  firstName?: string;
  lastName?: string;
  major?: string;
  year?: string | number;
  role?: string;
  [key: string]: unknown;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  target_role: string;
  is_active: boolean;
}

export interface AnnouncementFormValues {
  title: string;
  content: string;
  target_role: string;
}

export interface FaqItem {
  id: number;
  title: string;
  question: string;
  answer: string;
  category?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string | null;
}

export interface FaqFormValues {
  title: string;
  question: string;
  answer: string;
  category: string;
}

export interface SetupFormValues {
  first_name: string;
  last_name: string;
  major: string;
  year: string;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

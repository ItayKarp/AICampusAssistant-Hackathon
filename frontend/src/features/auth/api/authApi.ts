import { request } from "@/shared/lib/http";
import { AuthPayload, PersonnelProfile, SetupFormValues } from "@/shared/types";
import { createClient, Session, User } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type LoginResult = {
  session: Session | null;
  user: User | null;
};

function normaliseBasePath(value: string | undefined) {
  if (!value || value === "/") return "";
  const trimmed = value.trim().replace(/\/+$/, "");
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function buildAppUrl(path: string) {
  const basePath = normaliseBasePath(import.meta.env.BASE_URL);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${window.location.origin}${basePath}${cleanPath}`;
}

function resolveUserRole(user: User): string | null {
  const candidates = [
    user.app_metadata?.role,
    user.user_metadata?.role,
    user.app_metadata?.user_role,
    user.user_metadata?.user_role,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
  }

  return null;
}

function mapSession(session: Session): AuthPayload {
  return {
    token: session.access_token,
    user: session.user,
    user_id: session.user.id,
    email: session.user.email ?? null,
    role: resolveUserRole(session.user),
    expires_at: session.expires_at ?? null,
  };
}

export async function login(email: string, password: string): Promise<LoginResult> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  return {
    session: data.session,
    user: data.user,
  };
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<LoginResult> {
  const [firstName = "", ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        first_name: firstName,
        last_name: lastName,
      },
      emailRedirectTo: buildAppUrl("/login"),
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    session: data.session,
    user: data.user,
  };
}

export async function signOutFromSupabase(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function forgotPassword(email: string): Promise<{ message: string }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: buildAppUrl("/reset-password"),
  });

  if (error) {
    throw new Error(error.message);
  }

  return { message: "Password reset email sent successfully" };
}

export async function validateAuthSession(): Promise<AuthPayload | null> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  if (!session?.user) {
    return null;
  }

  return mapSession(session);
}

export async function getAccessToken(): Promise<string | null> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return session?.access_token ?? null;
}

export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function getPersonnelData() {
  const token = await getAccessToken();

  return request<PersonnelProfile>("/load-personnel-data/", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export async function setupPersonnelData(values: SetupFormValues) {
  const token = await getAccessToken();

  return request<unknown>("/load-personnel-data/setup", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: values,
  });
}

export async function updatePassword(newPassword: string): Promise<{ message: string }> {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { message: "Password updated successfully" };
}

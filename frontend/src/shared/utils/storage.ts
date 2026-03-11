import Cookies from "js-cookie";
import { COOKIE_KEYS, STORAGE_KEYS } from "@/config/constants";
import { AuthPayload, PersonnelProfile } from "@/shared/types";
import { safeJsonParse } from "./helpers";

export function getStoredToken(): string | null {
  return window.localStorage.getItem(STORAGE_KEYS.token);
}

export function setStoredToken(token: string) {
  window.localStorage.setItem(STORAGE_KEYS.token, token);
}

export function clearStoredToken() {
  window.localStorage.removeItem(STORAGE_KEYS.token);
}

export function getSetupPendingFlag(): boolean {
  return window.localStorage.getItem(STORAGE_KEYS.setupPending) === "true";
}

export function setSetupPendingFlag(value: boolean) {
  if (value) {
    window.localStorage.setItem(STORAGE_KEYS.setupPending, "true");
    return;
  }

  window.localStorage.removeItem(STORAGE_KEYS.setupPending);
}

export function setAuthPayloadCookie(payload: AuthPayload) {
  Cookies.set(COOKIE_KEYS.authPayload, JSON.stringify(payload), { sameSite: "lax" });
  if (payload.role) {
    Cookies.set(COOKIE_KEYS.role, payload.role, { sameSite: "lax" });
  }
}

export function getAuthPayloadCookie(): AuthPayload | null {
  return safeJsonParse<AuthPayload>(Cookies.get(COOKIE_KEYS.authPayload));
}

export function clearAuthCookies() {
  Cookies.remove(COOKIE_KEYS.authPayload);
  Cookies.remove(COOKIE_KEYS.role);
}

export function setPersonnelCookie(payload: PersonnelProfile) {
  Cookies.set(COOKIE_KEYS.personnel, JSON.stringify(payload), { sameSite: "lax" });
}

export function getPersonnelCookie(): PersonnelProfile | null {
  return safeJsonParse<PersonnelProfile>(Cookies.get(COOKIE_KEYS.personnel));
}

export function clearPersonnelCookie() {
  Cookies.remove(COOKIE_KEYS.personnel);
}

export function clearAllSessionStorage() {
  clearStoredToken();
  setSetupPendingFlag(false);
  clearAuthCookies();
  clearPersonnelCookie();
}
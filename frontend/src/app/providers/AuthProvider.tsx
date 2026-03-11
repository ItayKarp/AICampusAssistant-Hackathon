import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getPersonnelData, signOutFromSupabase, validateAuthSession } from "@/features/auth/api/authApi";
import { AuthPayload, PersonnelProfile } from "@/shared/types";
import {
  clearAllSessionStorage,
  getAuthPayloadCookie,
  getPersonnelCookie,
  getStoredToken,
  getSetupPendingFlag,
  setAuthPayloadCookie,
  setPersonnelCookie,
  setSetupPendingFlag,
  setStoredToken,
} from "@/shared/utils/storage";

type AuthContextValue = {
  token: string | null;
  authPayload: AuthPayload | null;
  personnel: PersonnelProfile | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  needsSetup: boolean;
  role: string | null;
  saveTokenOnly: (token: string) => void;
  bootstrapSession: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [authPayload, setAuthPayload] = useState<AuthPayload | null>(() =>
    getAuthPayloadCookie(),
  );
  const [personnel, setPersonnel] = useState<PersonnelProfile | null>(() =>
    getPersonnelCookie(),
  );
  const [isBootstrapping, setIsBootstrapping] = useState<boolean>(!!getStoredToken());
  const [needsSetup, setNeedsSetup] = useState<boolean>(false);

  const clearLocalSession = useCallback(() => {
    clearAllSessionStorage();
    setToken(null);
    setAuthPayload(null);
    setPersonnel(null);
    setNeedsSetup(false);
    setIsBootstrapping(false);
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOutFromSupabase();
    } catch {
      // local cleanup still needs to happen even if the remote signout fails
    } finally {
      clearLocalSession();
    }
  }, [clearLocalSession]);

  const saveTokenOnly = useCallback((nextToken: string) => {
    setIsBootstrapping(true);
    setStoredToken(nextToken);
    setToken(nextToken);
  }, []);

  const bootstrapSession = useCallback(async () => {
    const currentToken = getStoredToken();

    if (!currentToken) {
      clearLocalSession();
      return;
    }

    setIsBootstrapping(true);

    try {
      const sessionPayload = await validateAuthSession();

      if (!sessionPayload) {
        clearLocalSession();
        return;
      }

      setAuthPayload(sessionPayload);
      setAuthPayloadCookie(sessionPayload);
      setStoredToken(sessionPayload.token);
      setToken(sessionPayload.token);

      if (getSetupPendingFlag()) {
        setPersonnel(null);
        setNeedsSetup(true);
        return;
      }

      try {
        const personnelData = await getPersonnelData();
        setPersonnel(personnelData);
        setPersonnelCookie(personnelData);
        setSetupPendingFlag(false);
        setNeedsSetup(false);
      } catch {
        setPersonnel(null);
        setNeedsSetup(true);
        setSetupPendingFlag(true);
      }
    } catch {
      clearLocalSession();
      return;
    } finally {
      setIsBootstrapping(false);
    }
  }, [clearLocalSession]);

  useEffect(() => {
    if (token) {
      void bootstrapSession();
    } else {
      setIsBootstrapping(false);
    }
  }, [token, bootstrapSession]);

  const derivedRole = authPayload?.role ?? (typeof personnel?.role === "string" ? personnel.role : null);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      authPayload,
      personnel,
      isAuthenticated: Boolean(token && authPayload),
      isBootstrapping,
      needsSetup,
      role: derivedRole,
      saveTokenOnly,
      bootstrapSession,
      logout,
    }),
    [
      token,
      authPayload,
      personnel,
      isBootstrapping,
      needsSetup,
      derivedRole,
      saveTokenOnly,
      bootstrapSession,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}

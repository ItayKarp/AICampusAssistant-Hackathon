import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";

type ProtectedRouteProps = {
  allowedRoles?: string[];
  allowSetupRoute?: boolean;
};

export function ProtectedRoute({
  allowedRoles,
  allowSetupRoute = false,
}: ProtectedRouteProps) {
  const auth = useAuth();

  if (auth.isBootstrapping) {
    return (
      <div className="route-loader-shell">
        <div className="route-loader-card">
          <div className="spinner" />
          <p>Loading your session…</p>
        </div>
      </div>
    );
  }

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowSetupRoute && auth.needsSetup) {
    return <Navigate to="/setup" replace />;
  }

  if (allowSetupRoute && !auth.needsSetup) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && (!auth.role || !allowedRoles.includes(auth.role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

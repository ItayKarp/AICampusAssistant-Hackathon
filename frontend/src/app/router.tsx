import { Navigate, Route, Routes } from "react-router";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage";
import { ManagementPage } from "@/features/management/pages/ManagementPage";
import { SetupPage } from "@/features/setup/pages/SetupPage";
import { ProtectedRoute } from "@/shared/routes/ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route element={<ProtectedRoute allowSetupRoute />}>
        <Route path="/setup" element={<SetupPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/management" element={<ManagementPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
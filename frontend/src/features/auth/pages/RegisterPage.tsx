import { Link, Navigate } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { GradientBackdrop } from "@/shared/components/GradientBackdrop";

export function RegisterPage() {
  const auth = useAuth();

  if (auth.token && !auth.isBootstrapping) {
    return <Navigate to={auth.needsSetup ? "/setup" : "/"} replace />;
  }

  return (
    <div className="screen auth-screen">
      <GradientBackdrop variant="login" />

      <div className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">Hackathon Campus Assistant</span>
          <h1>Register</h1>
          <p>Create your account and continue into the personnel setup flow.</p>
        </div>

        <RegisterForm />

        <div className="auth-footer-row">
          <Link className="ghost-button" to="/login">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
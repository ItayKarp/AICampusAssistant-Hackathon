import { useState } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { ForgotPasswordModal } from "@/features/auth/components/ForgotPasswordModal";
import { GradientBackdrop } from "@/shared/components/GradientBackdrop";

export function LoginPage() {
  const auth = useAuth();
  const [forgotOpen, setForgotOpen] = useState(false);

  if (auth.token && !auth.isBootstrapping) {
    return <Navigate to={auth.needsSetup ? "/setup" : "/"} replace />;
  }

  return (
    <div className="screen auth-screen">
      <GradientBackdrop variant="login" />

      <div className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">Hackathon Campus Assistant</span>
          <h1>Login</h1>
          <p>
            Sign in to access announcements, AI prompts, and the management
            workspace.
          </p>
        </div>

        <LoginForm />

        <div className="auth-footer-row">
          <button
            type="button"
            className="ghost-button"
            onClick={() => setForgotOpen(true)}
          >
            Forgot password
          </button>

          <Link className="ghost-button" to="/register">
            Register
          </Link>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </div>
  );
}
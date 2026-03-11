import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/features/auth/api/authApi";
import { GradientBackdrop } from "@/shared/components/GradientBackdrop";

export function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === "PASSWORD_RECOVERY" || Boolean(session)) {
        setIsReady(true);
        setIsChecking(false);
      }
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;

      if (data.session) {
        setIsReady(true);
      }

      setIsChecking(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    if (password.length < 6) {
      setStatus("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus(error.message);
      setIsSubmitting(false);
      return;
    }

    setStatus("Password updated successfully. Redirecting to login...");

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
  }

  return (
    <div className="screen auth-screen">
      <GradientBackdrop variant="login" />

      <div className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">Hackathon Campus Assistant</span>
          <h1>Reset password</h1>
          <p>Choose a new password for your account.</p>
        </div>

        {isChecking ? (
          <p>Checking recovery link...</p>
        ) : !isReady ? (
          <div className="status-info">
            This recovery link is invalid or expired. Please request a new reset email.
          </div>
        ) : (
          <form className="form-stack" onSubmit={handleSubmit}>
            <label className="field">
              <span>New password</span>
              <input
                className="app-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            <label className="field">
              <span>Confirm new password</span>
              <input
                className="app-input"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </label>

            {status ? <div className="status-info">{status}</div> : null}

            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

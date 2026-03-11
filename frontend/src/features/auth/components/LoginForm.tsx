import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";
import { login } from "@/features/auth/api/authApi";
import { extractTokenFromResponse } from "@/shared/utils/helpers";

export function LoginForm() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await login(email, password);
      const token = extractTokenFromResponse(response);

      if (!token) {
        throw new Error("Login succeeded but no session token was returned.");
      }

      auth.saveTokenOnly(token);
      await auth.bootstrapSession();
      navigate("/", { replace: true });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      <label className="field">
        <span>Email</span>
        <input
          className="app-input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label className="field">
        <span>Password</span>
        <input
          className="app-input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>

      {status ? <div className="status-error">{status}</div> : null}

      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}

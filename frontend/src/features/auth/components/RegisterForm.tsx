import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";
import { register } from "@/features/auth/api/authApi";
import { extractTokenFromResponse } from "@/shared/utils/helpers";
import { setSetupPendingFlag } from "@/shared/utils/storage";

export function RegisterForm() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await register(fullName, email, password);
      const token = extractTokenFromResponse(response);

      if (!token) {
        setStatus(
          "Account created. Check your email and confirm the account before logging in.",
        );
        return;
      }

      setSetupPendingFlag(true);
      auth.saveTokenOnly(token);
      navigate("/setup", { replace: true });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      <label className="field">
        <span>Full name</span>
        <input
          className="app-input"
          type="text"
          placeholder="Itay Karpov"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />
      </label>

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
        {isSubmitting ? "Creating account..." : "Register"}
      </button>
    </form>
  );
}

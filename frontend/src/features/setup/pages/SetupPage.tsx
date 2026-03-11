import { FormEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";
import { setupPersonnelData } from "@/features/auth/api/authApi";
import { GradientBackdrop } from "@/shared/components/GradientBackdrop";
import { SetupFormValues } from "@/shared/types";
import { setSetupPendingFlag } from "@/shared/utils/storage";

const initialValues: SetupFormValues = {
  first_name: "",
  last_name: "",
  major: "",
  year: "",
};

export function SetupPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState<SetupFormValues>(initialValues);
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!auth.token) return;

    if (!values.first_name && auth.personnel?.first_name) {
      setValues((current) => ({
        ...current,
        first_name: String(auth.personnel?.first_name ?? ""),
        last_name: String(auth.personnel?.last_name ?? ""),
        major: String(auth.personnel?.major ?? ""),
        year: String(auth.personnel?.year ?? ""),
      }));
    }
  }, [auth.token, auth.personnel, values.first_name]);

  if (!auth.token && !auth.isBootstrapping) {
    return <Navigate to="/login" replace />;
  }

  if (!auth.needsSetup && auth.personnel && !auth.isBootstrapping) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      await setupPersonnelData(values);
      setSetupPendingFlag(false);
      await auth.bootstrapSession();
      navigate("/", { replace: true });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Setup failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="screen auth-screen">
      <GradientBackdrop variant="login" />

      <div className="auth-card auth-card-wide">
        <div className="auth-copy">
          <span className="eyebrow">Final step</span>
          <h1>Personnel setup</h1>
          <p>
            Complete the setup form before entering the main dashboard.
          </p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span>First name</span>
            <input
              className="app-input"
              value={values.first_name}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  first_name: event.target.value,
                }))
              }
              required
            />
          </label>

          <label className="field">
            <span>Last name</span>
            <input
              className="app-input"
              value={values.last_name}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  last_name: event.target.value,
                }))
              }
              required
            />
          </label>

          <label className="field">
            <span>Major</span>
            <input
              className="app-input"
              value={values.major}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  major: event.target.value,
                }))
              }
              required
            />
          </label>

          <label className="field">
            <span>Year</span>
            <input
              className="app-input"
              value={values.year}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  year: event.target.value,
                }))
              }
              required
            />
          </label>

          {status ? <div className="status-error full-span">{status}</div> : null}

          <div className="full-span">
            <button
              className="primary-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Finish setup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
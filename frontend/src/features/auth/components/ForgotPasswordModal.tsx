import { FormEvent, useState } from "react";
import { forgotPassword } from "@/features/auth/api/authApi";
import { Modal } from "@/shared/components/Modal";

type ForgotPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ForgotPasswordModal({
                                      isOpen,
                                      onClose,
                                    }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      await forgotPassword(email);
      setStatus("Check your email for the reset link.");
    } catch (error) {
      setStatus(
          error instanceof Error
              ? error.message
              : "Forgot-password request failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
      <Modal isOpen={isOpen} title="Forgot password" onClose={onClose}>
        <form className="form-stack" onSubmit={handleSubmit}>
          <p className="muted-text">
            Enter your email and we’ll send you a password reset link.
          </p>

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

          {status ? <div className="status-info">{status}</div> : null}

          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send reset link"}
          </button>
        </form>
      </Modal>
  );
}
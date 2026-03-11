import { FormEvent, useEffect, useState } from "react";
import { ANNOUNCEMENT_TARGET_ROLES } from "@/config/constants";
import { Modal } from "@/shared/components/Modal";
import { Announcement, AnnouncementFormValues } from "@/shared/types";

type AnnouncementFormModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialValue?: Announcement | null;
  onClose: () => void;
  onSubmit: (values: AnnouncementFormValues) => Promise<void>;
};

const defaultValues: AnnouncementFormValues = {
  title: "",
  content: "",
  target_role: "student",
};

export function AnnouncementFormModal({
  isOpen,
  mode,
  initialValue,
  onClose,
  onSubmit,
}: AnnouncementFormModalProps) {
  const [values, setValues] = useState<AnnouncementFormValues>(defaultValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialValue) {
      setValues({
        title: initialValue.title,
        content: initialValue.content,
        target_role: initialValue.target_role,
      });
    } else {
      setValues(defaultValues);
    }

    setStatus(null);
  }, [isOpen, mode, initialValue]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      await onSubmit(values);
      onClose();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Submit failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      title={mode === "create" ? "Create announcement" : "Update announcement"}
      onClose={onClose}
    >
      <form className="form-stack" onSubmit={handleSubmit}>
        {mode === "edit" && initialValue ? (
          <>
            <label className="field">
              <span>ID</span>
              <input className="app-input" value={initialValue.id} disabled />
            </label>

            <label className="field">
              <span>is_active</span>
              <input
                className="app-input"
                value={String(initialValue.is_active)}
                disabled
              />
            </label>
          </>
        ) : null}

        <label className="field">
          <span>Title</span>
          <input
            className="app-input"
            value={values.title}
            onChange={(event) =>
              setValues((current) => ({ ...current, title: event.target.value }))
            }
            required
          />
        </label>

        <label className="field">
          <span>Content</span>
          <textarea
            className="app-textarea"
            value={values.content}
            onChange={(event) =>
              setValues((current) => ({ ...current, content: event.target.value }))
            }
            rows={5}
            required
          />
        </label>

        <label className="field">
          <span>Target role</span>
          <select
            className="app-input"
            value={values.target_role}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                target_role: event.target.value,
              }))
            }
          >
            {ANNOUNCEMENT_TARGET_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        {status ? <div className="status-error">{status}</div> : null}

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Submit"}
        </button>
      </form>
    </Modal>
  );
}
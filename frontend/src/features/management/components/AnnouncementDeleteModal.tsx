import { FormEvent, useState } from "react";
import { Modal } from "@/shared/components/Modal";
import { Announcement } from "@/shared/types";

type AnnouncementDeleteModalProps = {
  isOpen: boolean;
  announcement: Announcement | null;
  onClose: () => void;
  onDelete: (details: string) => Promise<void>;
};

export function AnnouncementDeleteModal({
  isOpen,
  announcement,
  onClose,
  onDelete,
}: AnnouncementDeleteModalProps) {
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      await onDelete(details);
      setDetails("");
      onClose();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal isOpen={isOpen} title="Delete announcement" onClose={onClose}>
      <form className="form-stack" onSubmit={handleSubmit}>
        <div className="detail-card">
          <p><strong>ID:</strong> {announcement?.id ?? "—"}</p>
          <p><strong>Title:</strong> {announcement?.title ?? "—"}</p>
          <p><strong>Content:</strong> {announcement?.content ?? "—"}</p>
        </div>

        <label className="field">
          <span>Deletion details</span>
          <textarea
            className="app-textarea"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            rows={4}
            required
          />
        </label>

        {status ? <div className="status-error">{status}</div> : null}

        <button className="danger-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Deleting..." : "Delete"}
        </button>
      </form>
    </Modal>
  );
}
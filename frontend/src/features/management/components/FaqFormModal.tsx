import { FormEvent, useEffect, useState } from "react";
import { FAQ_CATEGORIES } from "@/config/constants";
import { Modal } from "@/shared/components/Modal";
import { FaqFormValues, FaqItem } from "@/shared/types";
import { formatDateTime } from "@/shared/utils/helpers";

type FaqFormModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialValue?: FaqItem | null;
  onClose: () => void;
  onSubmit: (values: FaqFormValues | Pick<FaqItem, "title" | "question" | "answer">) => Promise<void>;
};

const defaultValues: FaqFormValues = {
  title: "",
  question: "",
  answer: "",
  category: "general",
};

export function FaqFormModal({
  isOpen,
  mode,
  initialValue,
  onClose,
  onSubmit,
}: FaqFormModalProps) {
  const [values, setValues] = useState<FaqFormValues>(defaultValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialValue) {
      setValues({
        title: initialValue.title,
        question: initialValue.question,
        answer: initialValue.answer,
        category: initialValue.category ?? "general",
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
      if (mode === "create") {
        await onSubmit(values);
      } else {
        await onSubmit({
          title: values.title,
          question: values.question,
          answer: values.answer,
        });
      }

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
      title={mode === "create" ? "Create FAQ item" : "Update FAQ item"}
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

            <label className="field">
              <span>created_at</span>
              <input
                className="app-input"
                value={formatDateTime(initialValue.created_at)}
                disabled
              />
            </label>

            <label className="field">
              <span>updated_at</span>
              <input
                className="app-input"
                value={formatDateTime(initialValue.updated_at)}
                disabled
              />
            </label>
          </>
        ) : (
          <label className="field">
            <span>Category</span>
            <select
              className="app-input"
              value={values.category}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  category: event.target.value,
                }))
              }
            >
              {FAQ_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        )}

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
          <span>Question</span>
          <textarea
            className="app-textarea"
            value={values.question}
            onChange={(event) =>
              setValues((current) => ({ ...current, question: event.target.value }))
            }
            rows={3}
            required
          />
        </label>

        <label className="field">
          <span>Answer</span>
          <textarea
            className="app-textarea"
            value={values.answer}
            onChange={(event) =>
              setValues((current) => ({ ...current, answer: event.target.value }))
            }
            rows={5}
            required
          />
        </label>

        {status ? <div className="status-error">{status}</div> : null}

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Submit"}
        </button>
      </form>
    </Modal>
  );
}
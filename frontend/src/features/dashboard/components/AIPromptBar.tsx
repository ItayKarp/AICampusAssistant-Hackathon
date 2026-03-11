import { FormEvent, useState } from "react";
import { SendHorizontal } from "lucide-react";

type AIPromptBarProps = {
  onSubmit: (question: string) => Promise<void>;
  isBusy: boolean;
};

export function AIPromptBar({ onSubmit, isBusy }: AIPromptBarProps) {
  const [question, setQuestion] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = question.trim();
    if (!trimmed || isBusy) return;

    setQuestion("");
    await onSubmit(trimmed);
  }

  return (
    <form className="ai-prompt-bar" onSubmit={handleSubmit}>
      <input
        className="ai-prompt-input"
        placeholder="Ask the campus AI anything..."
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />
      <button className="primary-button ai-prompt-button" type="submit" disabled={isBusy}>
        <SendHorizontal size={16} />
        <span>{isBusy ? "Sending..." : "Send"}</span>
      </button>
    </form>
  );
}
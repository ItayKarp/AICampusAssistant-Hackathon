import { AIMessage } from "@/shared/types";

export function ChatFeed({ messages }: { messages: AIMessage[] }) {
  if (!messages.length) {
    return (
      <div className="empty-state large">
        Your AI conversation will appear here after the first prompt.
      </div>
    );
  }

  return (
    <div className="chat-feed">
      {messages.map((message) => (
        <article
          key={message.id}
          className={
            message.role === "user" ? "chat-bubble user" : "chat-bubble assistant"
          }
        >
          <span className="chat-role">
            {message.role === "user" ? "You" : "AI"}
          </span>
          <p>{message.content}</p>
        </article>
      ))}
    </div>
  );
}
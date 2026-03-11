import { useEffect, useState } from "react";
import { LogOut, Shield, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";
import { askAI, getAnnouncements } from "@/features/dashboard/api/dashboardApi";
import { AIPromptBar } from "@/features/dashboard/components/AIPromptBar";
import { AnnouncementTable } from "@/features/dashboard/components/AnnouncementTable";
import { ChatFeed } from "@/features/dashboard/components/ChatFeed";
import { GradientBackdrop } from "@/shared/components/GradientBackdrop";
import { Panel } from "@/shared/components/Panel";
import { AIMessage, Announcement } from "@/shared/types";
import { extractAiText, getDisplayName } from "@/shared/utils/helpers";

export function DashboardPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
  const [isSendingPrompt, setIsSendingPrompt] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadAnnouncements() {
      setIsLoadingAnnouncements(true);

      try {
        const data = await getAnnouncements();
        if (!active) return;

        setAnnouncements(data.filter((item) => item.is_active));
      } finally {
        if (active) {
          setIsLoadingAnnouncements(false);
        }
      }
    }

    void loadAnnouncements();

    return () => {
      active = false;
    };
  }, []);


  async function handlePrompt(question: string) {
    const userMessage: AIMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
      createdAt: Date.now(),
    };

    setMessages((current) => [...current, userMessage]);
    setIsSendingPrompt(true);

    try {
      const response = await askAI(question);

      const assistantMessage: AIMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: extractAiText(response),
        createdAt: Date.now(),
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      const assistantMessage: AIMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "The AI prompt request failed.",
        createdAt: Date.now(),
      };

      setMessages((current) => [...current, assistantMessage]);
    } finally {
      setIsSendingPrompt(false);
    }
  }

  async function handleLogout() {
    await auth.logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="screen app-screen">
      <GradientBackdrop variant="main" />

      <div className="app-page">
        <header className="topbar">
          <div>
            <span className="eyebrow">Dashboard</span>
            <h1>Welcome, {getDisplayName(auth.personnel ?? null)}</h1>
            <p className="muted-text">
              Role: <strong>{auth.role ?? "unknown"}</strong>
            </p>
          </div>

          <div className="topbar-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/management")}
            >
              <Shield size={16} />
              <span>Management</span>
            </button>

            <button type="button" className="secondary-button" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <main className="dashboard-grid">
          <Panel
            title="Announcements"
            subtitle="Active announcement feed"
            className="announcements-panel"
          >
            {isLoadingAnnouncements ? (
              <div className="empty-state">Loading announcements...</div>
            ) : (
              <AnnouncementTable announcements={announcements} />
            )}
          </Panel>

          <Panel
            title="Campus AI"
            subtitle="Ask questions with the fixed prompt bar below"
            action={
              <div className="icon-chip">
                <Sparkles size={16} />
                <span>Live</span>
              </div>
            }
            className="chat-panel"
          >
            <ChatFeed messages={messages} />
          </Panel>
        </main>
      </div>

      <AIPromptBar onSubmit={handlePrompt} isBusy={isSendingPrompt} />
    </div>
  );
}

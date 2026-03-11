import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/app/providers/AuthProvider";
import { GradientBackdrop } from "@/shared/components/GradientBackdrop";
import { Announcement, AnnouncementFormValues, FaqFormValues, FaqItem } from "@/shared/types";
import {
  createAnnouncement,
  createFaqItem,
  deleteAnnouncement,
  getFaqItems,
  getManagementAnnouncements,
  updateAnnouncement,
  updateFaqItem,
} from "@/features/management/api/managementApi";
import { AnnouncementsSection } from "@/features/management/components/AnnouncementsSection";
import { FaqSection } from "@/features/management/components/FaqSection";

export function ManagementPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [isAnnouncementsLoading, setIsAnnouncementsLoading] = useState(true);
  const [isFaqLoading, setIsFaqLoading] = useState(true);
  // @ts-ignore
  const [loadError, setLoadError] = useState<string | null>(null);

  const isAdmin = useMemo(() => auth.role === "admin", [auth.role]);

  async function loadData() {
    setIsAnnouncementsLoading(true);
    setIsFaqLoading(true);
    setLoadError(null);

    try {
      const announcementPromise = getManagementAnnouncements();
      const faqPromise = isAdmin ? getFaqItems() : Promise.resolve([]);

      const [announcementData, faqData] = await Promise.all([
        announcementPromise,
        faqPromise,
      ]);

      setAnnouncements(announcementData);
      setFaqItems(faqData as FaqItem[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Management data could not be loaded.";
      setLoadError(message);
      navigate(-1);
    } finally {
      setIsAnnouncementsLoading(false);
      setIsFaqLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, [isAdmin]);

  async function handleCreateAnnouncement(values: AnnouncementFormValues) {
    await createAnnouncement(values);
    await loadData();
  }

  async function handleUpdateAnnouncement(
    announcementId: number,
    values: AnnouncementFormValues,
  ) {
    await updateAnnouncement(announcementId, values);
    await loadData();
  }

  async function handleDeleteAnnouncement(announcementId: number, details: string) {
    await deleteAnnouncement(announcementId, details);
    await loadData();
  }

  async function handleCreateFaq(values: FaqFormValues) {
    await createFaqItem(values);
    await loadData();
  }

  async function handleUpdateFaq(
    faqItemId: number,
    values: Pick<FaqItem, "title" | "question" | "answer">,
  ) {
    await updateFaqItem(faqItemId, values);
    await loadData();
  }

  async function handleLogout() {
    await auth.logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="screen app-screen">
      <GradientBackdrop variant="management" />

      <div className="app-page">
        <header className="topbar">
          <div>
            <span className="eyebrow">Management workspace</span>
            <h1>Content administration</h1>
            <p className="muted-text">
              Manage announcements{isAdmin ? " and FAQ items" : ""}.
            </p>
          </div>

          <div className="topbar-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <button type="button" className="secondary-button" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <main className="management-stack">
          <AnnouncementsSection
            announcements={announcements}
            isLoading={isAnnouncementsLoading}
            onCreate={handleCreateAnnouncement}
            onUpdate={handleUpdateAnnouncement}
            onDelete={handleDeleteAnnouncement}
          />

          {isAdmin ? (
            <FaqSection
              faqItems={faqItems}
              isLoading={isFaqLoading}
              onCreate={handleCreateFaq}
              onUpdate={handleUpdateFaq}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}

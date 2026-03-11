import { request, requestWithFallback } from "@/shared/lib/http";
import { Announcement, AnnouncementFormValues, FaqFormValues, FaqItem } from "@/shared/types";

export function getManagementAnnouncements() {
  return request<Announcement[]>("/announcements");
}

export function createAnnouncement(values: AnnouncementFormValues) {
  return request<Announcement>("/announcements", {
    method: "POST",
    body: values,
  });
}

export function updateAnnouncement(
  announcementId: number,
  values: AnnouncementFormValues,
) {
  return request<Announcement>(`/announcements/${announcementId}`, {
    method: "PUT",
    body: values,
  });
}

export function deleteAnnouncement(announcementId: number, details: string) {
  return request<unknown>(`/announcements/${announcementId}`, {
    method: "DELETE",
    body: { details },
  });
}

export function getFaqItems() {
  return request<FaqItem[]>("/faq-items");
}

export function createFaqItem(values: FaqFormValues) {
  return request<FaqItem>("/faq-item", {
    method: "POST",
    body: values,
  });
}

export function updateFaqItem(
  faqItemId: number,
  values: Pick<FaqItem, "title" | "question" | "answer">,
) {
  return requestWithFallback<FaqItem>(
    [`/${faqItemId}`, `/faq-item/${faqItemId}`, `/faq-items/${faqItemId}`],
    {
      method: "PUT",
      body: values,
    },
  );
}
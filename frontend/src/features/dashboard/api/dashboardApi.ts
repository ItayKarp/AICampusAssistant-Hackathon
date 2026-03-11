import { request } from "@/shared/lib/http";
import { Announcement } from "@/shared/types";

export function getAnnouncements() {
  return request<Announcement[]>("/announcements");
}

export function askAI(question: string) {
  return request<unknown>("/ai-prompt", {
    method: "POST",
    body: { question },
  });
}
import { Announcement } from "@/shared/types";
import { DataTable } from "@/shared/components/DataTable";

export function AnnouncementTable({
  announcements,
}: {
  announcements: Announcement[];
}) {
  return (
    <DataTable
      rows={announcements}
      emptyMessage="No active announcements were returned."
      columns={[
        {
          key: "title",
          title: "Title",
          render: (row) => <strong>{row.title}</strong>,
        },
        {
          key: "content",
          title: "Content",
          render: (row) => <span>{row.content}</span>,
        },
      ]}
    />
  );
}
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { DropdownMenu } from "@/shared/components/DropdownMenu";
import { DataTable } from "@/shared/components/DataTable";
import { Panel } from "@/shared/components/Panel";
import { Announcement, AnnouncementFormValues } from "@/shared/types";
import { AnnouncementDeleteModal } from "./AnnouncementDeleteModal";
import { AnnouncementFormModal } from "./AnnouncementFormModal";

type AnnouncementsSectionProps = {
  announcements: Announcement[];
  isLoading: boolean;
  onCreate: (values: AnnouncementFormValues) => Promise<void>;
  onUpdate: (announcementId: number, values: AnnouncementFormValues) => Promise<void>;
  onDelete: (announcementId: number, details: string) => Promise<void>;
};

export function AnnouncementsSection({
  announcements,
  isLoading,
  onCreate,
  onUpdate,
  onDelete,
}: AnnouncementsSectionProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Announcement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);

  const rows = useMemo(() => announcements, [announcements]);

  return (
    <>
      <Panel
        title="Announcements"
        subtitle="Create, update, and delete announcement records"
        action={
          <button type="button" className="primary-button" onClick={() => setCreateOpen(true)}>
            <Plus size={16} />
            <span>Create</span>
          </button>
        }
      >
        {isLoading ? (
          <div className="empty-state">Loading announcements...</div>
        ) : (
          <DataTable
            rows={rows}
            emptyMessage="No announcements found."
            columns={[
              { key: "id", title: "ID", render: (row) => row.id },
              { key: "title", title: "Title", render: (row) => row.title },
              { key: "content", title: "Content", render: (row) => row.content },
              {
                key: "target_role",
                title: "Target role",
                render: (row) => row.target_role,
              },
              {
                key: "is_active",
                title: "is_active",
                render: (row) => String(row.is_active),
              },
              {
                key: "actions",
                title: "",
                render: (row) => (
                  <DropdownMenu
                    items={[
                      { label: "Update", onClick: () => setEditTarget(row) },
                      {
                        label: "Delete",
                        danger: true,
                        onClick: () => setDeleteTarget(row),
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        )}
      </Panel>

      <AnnouncementFormModal
        isOpen={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreate}
      />

      <AnnouncementFormModal
        isOpen={Boolean(editTarget)}
        mode="edit"
        initialValue={editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={async (values) => {
          if (!editTarget) return;
          await onUpdate(editTarget.id, values);
        }}
      />

      <AnnouncementDeleteModal
        isOpen={Boolean(deleteTarget)}
        announcement={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onDelete={async (details) => {
          if (!deleteTarget) return;
          await onDelete(deleteTarget.id, details);
        }}
      />
    </>
  );
}
import { useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "@/shared/components/DataTable";
import { DropdownMenu } from "@/shared/components/DropdownMenu";
import { Panel } from "@/shared/components/Panel";
import { FaqFormValues, FaqItem } from "@/shared/types";
import { FaqFormModal } from "./FaqFormModal";

type FaqSectionProps = {
  faqItems: FaqItem[];
  isLoading: boolean;
  onCreate: (values: FaqFormValues) => Promise<void>;
  onUpdate: (
    faqItemId: number,
    values: Pick<FaqItem, "title" | "question" | "answer">,
  ) => Promise<void>;
};

export function FaqSection({
  faqItems,
  isLoading,
  onCreate,
  onUpdate,
}: FaqSectionProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<FaqItem | null>(null);

  return (
    <>
      <Panel
        title="FAQ"
        subtitle="Admin-only FAQ management workspace"
        action={
          <button type="button" className="primary-button" onClick={() => setCreateOpen(true)}>
            <Plus size={16} />
            <span>Create</span>
          </button>
        }
      >
        {isLoading ? (
          <div className="empty-state">Loading FAQ items...</div>
        ) : (
          <DataTable
            rows={faqItems}
            emptyMessage="No FAQ items found."
            columns={[
              { key: "id", title: "ID", render: (row) => row.id },
              { key: "title", title: "Title", render: (row) => row.title },
              {
                key: "question",
                title: "Question",
                render: (row) => row.question,
              },
              { key: "answer", title: "Answer", render: (row) => row.answer },
              {
                key: "category",
                title: "Category",
                render: (row) => row.category ?? "—",
              },
              {
                key: "actions",
                title: "",
                render: (row) => (
                  <DropdownMenu
                    items={[
                      { label: "Update", onClick: () => setEditTarget(row) },
                    ]}
                  />
                ),
              },
            ]}
          />
        )}
      </Panel>

      <FaqFormModal
        isOpen={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
        onSubmit={async (values) => {
          await onCreate(values as FaqFormValues);
        }}
      />

      <FaqFormModal
        isOpen={Boolean(editTarget)}
        mode="edit"
        initialValue={editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={async (values) => {
          if (!editTarget) return;

          await onUpdate(
            editTarget.id,
            values as Pick<FaqItem, "title" | "question" | "answer">,
          );
        }}
      />
    </>
  );
}
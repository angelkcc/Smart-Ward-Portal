"use client";

import { useState } from "react";
import { NoticeForm } from "./NoticeForm";
import { NoticeCategoryBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Alert, EmptyState, ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Layout";
import { ConfirmDialog, Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { toApiError } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { useFetch } from "@/hooks/useFetch";
import { deleteNotice, listNotices } from "@/services/notice.service";
import type { Notice } from "@/types";

export function NoticesAdmin() {
  const toast = useToast();
  const { data, error, loading, reload } = useFetch(listNotices);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [toDelete, setToDelete] = useState<Notice | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteNotice(toDelete._id);
      toast.success("Notice deleted.");
      setToDelete(null);
      reload();
    } catch (err) {
      toast.error(toApiError(err).message);
    } finally {
      setDeleting(false);
    }
  }

  let body;
  if (loading && !data) body = <LoadingBlock label="Loading notices…" />;
  else if (error) body = <ErrorState error={error} onRetry={reload} />;
  else if (!data || data.length === 0)
    body = (
      <EmptyState
        icon="bell"
        title="No published notices"
        description="Publish a notice so citizens can read it."
        action={<Button onClick={() => setCreating(true)}>New notice</Button>}
      />
    );
  else
    body = (
      <Card className="p-0 sm:p-0">
        <ul className="divide-y divide-slate-200">
          {data.map((notice) => (
            <li
              key={notice._id}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <NoticeCategoryBadge category={notice.category} />
                  <span className="text-sm text-slate-600">
                    {formatDate(notice.createdAt)}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{notice.title}</h2>
                <p className="line-clamp-2 whitespace-pre-line text-base text-slate-600">
                  {notice.description}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="secondary" size="sm" onClick={() => setEditing(notice)}>
                  <Icon name="edit" className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-700 hover:bg-red-50"
                  onClick={() => setToDelete(notice)}
                >
                  <Icon name="trash" className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    );

  return (
    <div className="space-y-6">
      <Alert tone="info">
        This list shows published notices only, because that is all the server
        returns. A notice you unpublish will no longer appear here.
      </Alert>

      <div className="flex justify-end">
        <Button onClick={() => setCreating(true)}>
          <Icon name="plus" className="h-5 w-5" />
          New notice
        </Button>
      </div>

      {body}

      <Modal open={creating} title="New notice" onClose={() => setCreating(false)} wide>
        <NoticeForm
          onCancel={() => setCreating(false)}
          onSaved={() => {
            setCreating(false);
            reload();
          }}
        />
      </Modal>

      <Modal
        open={editing !== null}
        title="Edit notice"
        onClose={() => setEditing(null)}
        wide
      >
        {editing && (
          <NoticeForm
            notice={editing}
            onCancel={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              reload();
            }}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this notice?"
        message={
          <p>“{toDelete?.title}” will be permanently removed. This cannot be undone.</p>
        }
        confirmLabel="Delete notice"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}

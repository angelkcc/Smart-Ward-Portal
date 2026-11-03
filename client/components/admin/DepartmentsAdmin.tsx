"use client";

import { useState } from "react";
import { DepartmentForm } from "./DepartmentForm";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState, ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Layout";
import { ConfirmDialog, Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { toApiError } from "@/lib/api";
import { departmentCategoryLabel } from "@/lib/format";
import { useFetch } from "@/hooks/useFetch";
import { deleteDepartment, listDepartments } from "@/services/department.service";
import type { Department } from "@/types";

export function DepartmentsAdmin() {
  const toast = useToast();
  const { data, error, loading, reload } = useFetch(listDepartments);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [toDelete, setToDelete] = useState<Department | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteDepartment(toDelete._id);
      toast.success("Department deleted.");
      setToDelete(null);
      reload();
    } catch (err) {
      // e.g. 409 when complaints are still assigned to this department
      toast.error(toApiError(err).message);
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  let body;
  if (loading && !data) body = <LoadingBlock label="Loading departments…" />;
  else if (error) body = <ErrorState error={error} onRetry={reload} />;
  else if (!data || data.length === 0)
    body = (
      <EmptyState
        icon="building"
        title="No departments yet"
        description="Create a department so complaints can be assigned to it."
        action={<Button onClick={() => setCreating(true)}>Create department</Button>}
      />
    );
  else
    body = (
      <ul className="grid gap-5 md:grid-cols-2">
        {data.map((department) => (
          <li key={department._id}>
            <Card className="flex h-full flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">{department.name}</h2>
                <Badge tone="slate">{departmentCategoryLabel(department.category)}</Badge>
                <Badge tone={department.active ? "green" : "amber"}>
                  {department.active ? "Active" : "Not active"}
                </Badge>
              </div>
              <p className="flex-1 text-base text-slate-700">{department.description}</p>
              {(department.contact_email || department.contact_phone) && (
                <p className="text-sm text-slate-600">
                  {[department.contact_phone, department.contact_email]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
              <div className="flex gap-2 border-t border-slate-200 pt-3">
                <Button variant="secondary" size="sm" onClick={() => setEditing(department)}>
                  <Icon name="edit" className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-700 hover:bg-red-50"
                  onClick={() => setToDelete(department)}
                >
                  <Icon name="trash" className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setCreating(true)}>
          <Icon name="plus" className="h-5 w-5" />
          New department
        </Button>
      </div>

      {body}

      <Modal open={creating} title="New department" onClose={() => setCreating(false)}>
        <DepartmentForm
          onCancel={() => setCreating(false)}
          onSaved={() => {
            setCreating(false);
            reload();
          }}
        />
      </Modal>

      <Modal
        open={editing !== null}
        title="Edit department"
        onClose={() => setEditing(null)}
      >
        {editing && (
          <DepartmentForm
            department={editing}
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
        title="Delete this department?"
        message={
          <p>
            “{toDelete?.name}” will be permanently removed. It cannot be deleted
            while complaints are assigned to it.
          </p>
        }
        confirmLabel="Delete department"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}


"use client";

import { useState } from "react";
import { ProjectForm } from "./ProjectForm";
import { Button } from "@/components/ui/Button";
import {
  Alert,
  EmptyState,
  ErrorState,
  LoadingBlock,
} from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Layout";
import { ConfirmDialog, Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { toApiError } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { useFetch } from "@/hooks/useFetch";
import {
  deleteProject,
  listAdminProjects,
} from "@/services/project.service";
import type { Project } from "@/types";

function statusLabel(status: Project["status"]) {
  return {
    PLANNED: "Planned",
    ONGOING: "Ongoing",
    COMPLETED: "Completed",
    ON_HOLD: "On hold",
  }[status];
}

export function ProjectsAdmin() {
  const toast = useToast();
  const { data, error, loading, reload } = useFetch(listAdminProjects);

  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [toDelete, setToDelete] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (!toDelete) return;

    setDeleting(true);

    try {
      await deleteProject(toDelete._id);
      toast.success("Project deleted successfully.");
      setToDelete(null);
      reload();
    } catch (err) {
      toast.error(toApiError(err).message);
    } finally {
      setDeleting(false);
    }
  }

  let body;

  if (loading && !data) {
    body = <LoadingBlock label="Loading projects…" />;
  } else if (error) {
    body = <ErrorState error={error} onRetry={reload} />;
  } else if (!data || data.length === 0) {
    body = (
      <EmptyState
        icon="building"
        title="No projects yet"
        description="Add a project so citizens can see what the ward is working on."
        action={
          <Button onClick={() => setCreating(true)}>
            <Icon name="plus" className="h-5 w-5" />
            Add project
          </Button>
        }
      />
    );
  } else {
    body = (
      <Card className="p-0 sm:p-0">
        <ul className="divide-y divide-slate-200">
          {data.map((project) => (
            <li
              key={project._id}
              className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-900">
                    {statusLabel(project.status)}
                  </span>

                  <span className="text-sm text-slate-500">
                    {project.published ? "Published" : "Unpublished"}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-slate-900">
                  {project.title}
                </h2>

                <p className="text-sm text-slate-600">
                  {project.category} · {project.location}
                </p>

                <p className="line-clamp-2 text-base text-slate-600">
                  {project.description}
                </p>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-blue-700"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <p className="text-sm text-slate-500">
                  Added {formatDate(project.createdAt)}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditing(project)}
                >
                  <Icon name="edit" className="h-4 w-4" />
                  Edit
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-700 hover:bg-red-50"
                  onClick={() => setToDelete(project)}
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
  }

  return (
    <div className="space-y-6">
      <Alert tone="info">
        Manage ward development projects here. Only published projects are
        visible to citizens.
      </Alert>

      <div className="flex justify-end">
        <Button onClick={() => setCreating(true)}>
          <Icon name="plus" className="h-5 w-5" />
          New project
        </Button>
      </div>

      {body}

      <Modal
        open={creating}
        title="New project"
        onClose={() => setCreating(false)}
        wide
      >
        <ProjectForm
          onCancel={() => setCreating(false)}
          onSaved={() => {
            setCreating(false);
            reload();
          }}
        />
      </Modal>

      <Modal
        open={editing !== null}
        title="Edit project"
        onClose={() => setEditing(null)}
        wide
      >
        {editing && (
          <ProjectForm
            project={editing}
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
        title="Delete this project?"
        message={
          <p>
            “{toDelete?.title}” will be permanently deleted. This cannot be
            undone.
          </p>
        }
        confirmLabel="Delete project"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}

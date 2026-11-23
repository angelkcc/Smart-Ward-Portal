import { apiFetch } from "@/lib/api";
import type { Project, ProjectInput } from "@/types";

/** GET /api/v1/projects - public; published projects */
export const listProjects = () =>
  apiFetch<Project[]>("/projects");

/** GET /api/v1/projects/admin/all - admin; all projects */
export const listAdminProjects = () =>
  apiFetch<Project[]>("/projects/admin/all");

/** GET /api/v1/projects/:id */
export const getProject = (id: string) =>
  apiFetch<Project>(`/projects/${id}`);

/** POST /api/v1/projects - admin only */
export const createProject = (input: ProjectInput) =>
  apiFetch<Project>("/projects", {
    method: "POST",
    body: input,
  });

/** PUT /api/v1/projects/:id - admin only */
export const updateProject = (
  id: string,
  input: Partial<ProjectInput>,
) =>
  apiFetch<Project>(`/projects/${id}`, {
    method: "PUT",
    body: input,
  });

/** DELETE /api/v1/projects/:id - admin only */
export const deleteProject = (id: string) =>
  apiFetch<null>(`/projects/${id}`, {
    method: "DELETE",
  });
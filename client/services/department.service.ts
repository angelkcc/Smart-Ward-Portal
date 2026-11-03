import { apiFetch } from "@/lib/api";
import type { Department, DepartmentInput } from "@/types";

/** GET /api/v1/departments - signed-in users */
export const listDepartments = () => apiFetch<Department[]>("/departments");

/** GET /api/v1/departments/:id */
export const getDepartment = (id: string) =>
  apiFetch<Department>(`/departments/${id}`);

/** POST /api/v1/departments - admin only */
export const createDepartment = (input: DepartmentInput) =>
  apiFetch<Department>("/departments", { method: "POST", body: input });

/** PATCH /api/v1/departments/:id - admin only */
export const updateDepartment = (id: string, input: Partial<DepartmentInput>) =>
  apiFetch<Department>(`/departments/${id}`, { method: "PATCH", body: input });

/** DELETE /api/v1/departments/:id - admin only (409 while complaints use it) */
export const deleteDepartment = (id: string) =>
  apiFetch<null>(`/departments/${id}`, { method: "DELETE" });

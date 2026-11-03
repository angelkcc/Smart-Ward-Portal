import { apiFetch } from "@/lib/api";
import type { Complaint, ComplaintStatus, CreateComplaintInput } from "@/types";

/**
 * GET /api/v1/complaints
 * The backend decides what comes back: admins get everything, citizens get
 * only the complaints they created.
 */
export const listComplaints = () => apiFetch<Complaint[]>("/complaints");

/** GET /api/v1/complaints/:id (403 when it belongs to someone else) */
export const getComplaint = (id: string) =>
  apiFetch<Complaint>(`/complaints/${id}`);

/** POST /api/v1/complaints */
export const createComplaint = (input: CreateComplaintInput) =>
  apiFetch<Complaint>("/complaints", { method: "POST", body: input });

/** PATCH /api/v1/complaints/:id/department - admin only */
export const assignDepartment = (id: string, departmentId: string) =>
  apiFetch<Complaint>(`/complaints/${id}/department`, {
    method: "PATCH",
    body: { department_id: departmentId },
  });

/** PATCH /api/v1/complaints/:id/status - admin only */
export const updateStatus = (id: string, status: ComplaintStatus) =>
  apiFetch<Complaint>(`/complaints/${id}/status`, {
    method: "PATCH",
    body: { status },
  });

/** PATCH /api/v1/complaints/:id/assign - admin only; the backend also sets status to ASSIGNED */
export const assignToUser = (id: string, userId: string) =>
  apiFetch<Complaint>(`/complaints/${id}/assign`, {
    method: "PATCH",
    body: { assigned_to: userId },
  });

/** DELETE /api/v1/complaints/:id - admin only */
export const deleteComplaint = (id: string) =>
  apiFetch<null>(`/complaints/${id}`, { method: "DELETE" });

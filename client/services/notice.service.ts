import { apiFetch } from "@/lib/api";
import type { Notice, NoticeInput } from "@/types";

/** GET /api/v1/notices - signed-in users; the backend only returns published notices */
export const listNotices = () => apiFetch<Notice[]>("/notices");

/** GET /api/v1/notices/:id */
export const getNotice = (id: string) => apiFetch<Notice>(`/notices/${id}`);

/** POST /api/v1/notices/createNotice - admin only */
export const createNotice = (input: NoticeInput) =>
  apiFetch<Notice>("/notices/createNotice", { method: "POST", body: input });

/** PUT /api/v1/notices/updateNotice/:id - admin only */
export const updateNotice = (id: string, input: Partial<NoticeInput>) =>
  apiFetch<Notice>(`/notices/updateNotice/${id}`, {
    method: "PUT",
    body: input,
  });

/** DELETE /api/v1/notices/deleteNotice/:id - admin only */
export const deleteNotice = (id: string) =>
  apiFetch<null>(`/notices/deleteNotice/${id}`, { method: "DELETE" });

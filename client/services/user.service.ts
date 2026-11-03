import { apiFetch } from "@/lib/api";
import type { User } from "@/types";

/** GET /api/v1/users/profile - the signed-in user (401 when not signed in) */
export const getProfile = () => apiFetch<User>("/users/profile");

/** GET /api/v1/users - admin only */
export const listUsers = () => apiFetch<User[]>("/users");

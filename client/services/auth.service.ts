import { apiFetch } from "@/lib/api";
import type { LoginResult, RegisterInput, User } from "@/types";

/** POST /api/v1/auth/register  -> data: the created user (without password) */
export const register = (input: RegisterInput) =>
  apiFetch<User>("/auth/register", { method: "POST", body: input });

/**
 * POST /api/v1/auth/login -> data: { user, access_token }
 * The backend also sets the `access_token` cookie, which is what protected
 * endpoints actually read. We never store the token ourselves.
 */
export const login = (email: string, password: string) =>
  apiFetch<LoginResult>("/auth/login", {
    method: "POST",
    body: { email, password },
  });

/** POST /api/v1/auth/logout -> clears the cookie */
export const logout = () =>
  apiFetch<null>("/auth/logout", { method: "POST" });

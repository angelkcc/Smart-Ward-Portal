import type { ApiEnvelope } from "@/types";

/**
 * Base path of the backend API.
 *
 * The backend mounts everything under /api/v1 and does not enable CORS, so by
 * default the browser talks to this Next.js app (same origin) and
 * `next.config.ts` forwards /api/v1/* to the Express server. That keeps the
 * `access_token` cookie working without touching the backend.
 *
 * Only set NEXT_PUBLIC_API_URL if you deliberately point at another origin
 * (the backend would then need CORS enabled for credentials).
 */
const API_BASE = (process.env.NEXT_PUBLIC_BASE_URL ?? "/api/v1").replace(
  /\/$/,
  "",
);

/** Fired on any 401 so the auth context can drop a stale session. */
export const UNAUTHORIZED_EVENT = "auth:unauthorized";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (error instanceof Error) return new ApiError(error.message, 0);
  return new ApiError("Something went wrong. Please try again.", 0);
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
}

function readMessage(payload: unknown): string | null {
  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof (payload as { message: unknown }).message === "string"
  ) {
    return (payload as { message: string }).message;
  }
  return null;
}

/**
 * Calls the backend and returns the `data` field of the response envelope.
 * Throws ApiError (with the backend's own message) when the request fails.
 */
export async function apiFetch<T>(
  path: string,
  { method = "GET", body }: RequestOptions = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: "include",
    });
  } catch {
    throw new ApiError(
      "Cannot reach the server. Please check your connection and try again.",
      0,
    );
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }
    const fallback =
      response.status >= 500
        ? "The server is not responding right now. Please try again shortly."
        : `Request failed (${response.status}).`;
    throw new ApiError(readMessage(payload) ?? fallback, response.status);
  }

  return (payload as ApiEnvelope<T>).data;
}

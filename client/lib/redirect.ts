/**
 * Reads `?next=/some/page` from the current URL, but only accepts paths on
 * this same site. Anything else (for example https://evil.example) is ignored,
 * which prevents open-redirect tricks. Call this from event handlers only,
 * never during render.
 */
export function readSafeNextPath(): string | null {
  if (typeof window === "undefined") return null;
  const next = new URLSearchParams(window.location.search).get("next");
  if (!next) return null;
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
    return null;
  }
  return next;
}

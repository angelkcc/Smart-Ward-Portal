import type {
  ComplaintCategory,
  ComplaintStatus,
  DepartmentCategory,
  NoticeCategory,
  UserRef,
} from "@/types";

/** "WATER_SUPPLY" -> "Water supply" */
export function humanize(value: string): string {
  const spaced = value.replace(/_/g, " ").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export const complaintCategoryLabel = (c: ComplaintCategory) => humanize(c);
export const departmentCategoryLabel = (c: DepartmentCategory) => humanize(c);
export const noticeCategoryLabel = (c: NoticeCategory) => humanize(c);
export const complaintStatusLabel = (s: ComplaintStatus) => humanize(s);

export function formatDate(value?: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value?: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/** Populated references come back as objects; un-populated ones as plain ids. */
export function userName(ref: UserRef | string | null | undefined): string {
  if (!ref) return "—";
  if (typeof ref === "string") return "—";
  return ref.full_name || ref.email || "—";
}

/** Only allow http(s) links so user-supplied text can never become a javascript: URL. */
export function safeHttpUrl(value?: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

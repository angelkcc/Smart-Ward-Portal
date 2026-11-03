import type { ReactNode } from "react";
import {
  complaintCategoryLabel,
  complaintStatusLabel,
  cn,
  noticeCategoryLabel,
} from "@/lib/format";
import type {
  ComplaintCategory,
  ComplaintStatus,
  NoticeCategory,
} from "@/types";

type Tone =
  | "slate"
  | "blue"
  | "teal"
  | "green"
  | "amber"
  | "red"
  | "indigo"
  | "orange"
  | "sky";

const TONES: Record<Tone, string> = {
  slate: "bg-slate-100 text-slate-800 ring-slate-300",
  blue: "bg-blue-50 text-blue-900 ring-blue-200",
  teal: "bg-teal-50 text-teal-900 ring-teal-200",
  green: "bg-green-50 text-green-900 ring-green-200",
  amber: "bg-amber-50 text-amber-900 ring-amber-300",
  red: "bg-red-50 text-red-900 ring-red-200",
  indigo: "bg-indigo-50 text-indigo-900 ring-indigo-200",
  orange: "bg-orange-50 text-orange-900 ring-orange-200",
  sky: "bg-sky-50 text-sky-900 ring-sky-200",
};

export function Badge({
  tone = "slate",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ring-1 ring-inset",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const STATUS_TONE: Record<ComplaintStatus, Tone> = {
  PENDING: "amber",
  ASSIGNED: "blue",
  IN_PROGRESS: "indigo",
  RESOLVED: "green",
  REJECTED: "red",
};

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  return <Badge tone={STATUS_TONE[status]}>{complaintStatusLabel(status)}</Badge>;
}

const NOTICE_TONE: Record<NoticeCategory, Tone> = {
  GENERAL: "slate",
  HEALTH: "green",
  EDUCATION: "indigo",
  EVENT: "teal",
  EMERGENCY: "red",
  ROAD: "orange",
  WATER: "sky",
};

export function NoticeCategoryBadge({ category }: { category: NoticeCategory }) {
  return <Badge tone={NOTICE_TONE[category]}>{noticeCategoryLabel(category)}</Badge>;
}

export function ComplaintCategoryBadge({
  category,
}: {
  category: ComplaintCategory;
}) {
  return <Badge tone="slate">{complaintCategoryLabel(category)}</Badge>;
}


import type { NoticeCategory } from "@/types";

const categoryStyles: Record<string, string> = {
  GENERAL: "bg-blue-50 text-blue-800 ring-blue-200",
  URGENT: "bg-red-50 text-red-700 ring-red-200",
  EVENT: "bg-purple-50 text-purple-800 ring-purple-200",
  HOLIDAY: "bg-amber-50 text-amber-800 ring-amber-200",
  PUBLIC_SERVICE: "bg-emerald-50 text-emerald-800 ring-emerald-200",
};

export function NoticeCategoryBadge({
  category,
}: {
  category: NoticeCategory;
}) {
  const styles =
    categoryStyles[category] ?? "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold tracking-wide ring-1 ring-inset ${styles}`}
    >
      {category.replace(/_/g, " ")}
    </span>
  );
}

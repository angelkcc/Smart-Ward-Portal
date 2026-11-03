import type { NoticeCategory } from "@/types";

const categoryStyles: Record<string, string> = {
  GENERAL: "bg-blue-100 text-blue-800",
  URGENT: "bg-red-100 text-red-800",
  EVENT: "bg-purple-100 text-purple-800",
  HOLIDAY: "bg-amber-100 text-amber-800",
  PUBLIC_SERVICE: "bg-green-100 text-green-800",
};

export function NoticeCategoryBadge({
  category,
}: {
  category: NoticeCategory;
}) {
  const styles =
    categoryStyles[category] ?? "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {category.replace(/_/g, " ")}
    </span>
  );
}
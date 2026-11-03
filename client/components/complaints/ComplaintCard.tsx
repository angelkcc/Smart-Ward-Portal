import Link from "next/link";
import { ComplaintCategoryBadge, StatusBadge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { formatDate } from "@/lib/format";
import type { Complaint } from "@/types";

export function departmentName(complaint: Complaint): string | null {
  const dept = complaint.department;
  return dept && typeof dept === "object" ? dept.name : null;
}

export function assigneeName(complaint: Complaint): string | null {
  const person = complaint.assigned_to;
  return person && typeof person === "object"
    ? person.full_name || person.email
    : null;
}

export function ComplaintCard({
  complaint,
  href,
}: {
  complaint: Complaint;
  href: string;
}) {
  const department = departmentName(complaint);
  return (
    <article className="relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-teal-600 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <StatusBadge status={complaint.status} />
        <time dateTime={complaint.createdAt} className="text-sm text-slate-600">
          {formatDate(complaint.createdAt)}
        </time>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">
        <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
          {complaint.title}
        </Link>
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-base text-slate-600">
        <Icon name="pin" className="h-4 w-4 shrink-0" />
        {complaint.location}
      </p>
      <div className="mt-3 flex flex-1 flex-wrap items-end gap-2">
        <ComplaintCategoryBadge category={complaint.category} />
        <span className="text-sm text-slate-600">
          {department ? `Department: ${department}` : "No department yet"}
        </span>
      </div>
    </article>
  );
}

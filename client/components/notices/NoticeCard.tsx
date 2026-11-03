import Link from "next/link";
import { NoticeCategoryBadge } from "@/components/notices/NoticeCategoryBadge";
import { Icon } from "@/components/ui/Icon";
import { formatDate } from "@/lib/format";
import type { Notice } from "@/types";

export function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <article className="relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-teal-600 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <NoticeCategoryBadge category={notice.category} />
        <time dateTime={notice.createdAt} className="text-sm text-slate-600">
          {formatDate(notice.createdAt)}
        </time>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">
        <Link
          href={`/notices/${notice._id}`}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {notice.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 whitespace-pre-line text-base text-slate-600">
        {notice.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-base font-semibold text-blue-900">
        Read notice
        <Icon name="arrowRight" className="h-4 w-4" />
      </span>
    </article>
  );
}

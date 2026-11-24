
import Link from "next/link";
import { NoticeCategoryBadge } from "@/components/notices/NoticeCategoryBadge";
import { Icon } from "@/components/ui/Icon";
import { formatDate } from "@/lib/format";
import type { Notice } from "@/types";

export function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-700">
      <div className="h-1 w-full bg-gradient-to-r from-blue-900 to-teal-600" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <NoticeCategoryBadge category={notice.category} />

          <time
            dateTime={notice.createdAt}
            className="text-xs font-medium text-slate-500"
          >
            {formatDate(notice.createdAt)}
          </time>
        </div>

        <h3 className="mt-5 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-900">
          <Link
            href={`/notices/${notice._id}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {notice.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 whitespace-pre-line text-sm leading-7 text-slate-600">
          {notice.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-sm font-bold text-blue-900">
            Read full notice
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-900 transition-all group-hover:translate-x-1 group-hover:bg-blue-900 group-hover:text-white">
            <Icon name="arrowRight" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

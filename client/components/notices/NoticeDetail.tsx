
"use client";

import { useParams } from "next/navigation";
import { useCallback } from "react";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { NoticeCategoryBadge } from "@/components/notices/NoticeCategoryBadge";
import { ButtonLink } from "@/components/ui/Button";
import { ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Layout";
import { ApiError } from "@/lib/api";
import { formatDateTime, userName } from "@/lib/format";
import { useFetch } from "@/hooks/useFetch";
import { getNotice } from "@/services/notice.service";

function NoticeBody({ id }: { id: string }) {
  const fetchNotice = useCallback(() => getNotice(id), [id]);
  const { data: notice, error, loading, reload } = useFetch(fetchNotice);

  if (loading) return <LoadingBlock label="Loading notice…" />;

  if (error) {
    return error.status === 404 ? (
      <ErrorState
        error={
          new ApiError(
            "This notice could not be found. It may have been removed.",
            404,
          )
        }
      />
    ) : (
      <ErrorState error={error} onRetry={reload} />
    );
  }

  if (!notice) return null;

  return (
    <Card className="overflow-hidden !p-0">
      <div className="h-2 bg-gradient-to-r from-blue-900 to-teal-600" />

      <div className="p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <NoticeCategoryBadge category={notice.category} />

          <span className="inline-flex items-center gap-2 text-sm text-slate-500">
            <Icon name="clock" className="h-4 w-4" />
            Published {formatDateTime(notice.createdAt)}
          </span>
        </div>

        <h1 className="mt-7 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {notice.title}
        </h1>

        <div className="my-8 h-px bg-slate-200" />

        {/* Plain text only: backend content is never rendered as HTML. */}
        <p className="whitespace-pre-line text-base leading-8 text-slate-700 sm:text-lg">
          {notice.description}
        </p>

        <div className="mt-10 rounded-xl bg-slate-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Notice information
          </p>

          <p className="mt-3 text-sm text-slate-700">
            Posted by{" "}
            <span className="font-semibold text-slate-900">
              {userName(notice.created_by)}
            </span>
          </p>

          {notice.updatedAt !== notice.createdAt && (
            <p className="mt-2 text-sm text-slate-500">
              Last updated {formatDateTime(notice.updatedAt)}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

export function NoticeDetail() {
  const params = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <ButtonLink href="/notices" variant="ghost" size="sm">
        <Icon name="arrowLeft" className="mr-2 h-4 w-4" />
        All notices
      </ButtonLink>

      <RequireAuth>
        <NoticeBody id={params.id} />
      </RequireAuth>
    </div>
  );
}

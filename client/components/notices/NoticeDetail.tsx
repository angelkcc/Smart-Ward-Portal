"use client";

import { useParams } from "next/navigation";
import { useCallback } from "react";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { NoticeCategoryBadge } from "@/components/ui/Badge";
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
    <Card className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <NoticeCategoryBadge category={notice.category} />
        <span className="text-sm text-slate-600">
          Published {formatDateTime(notice.createdAt)}
        </span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {notice.title}
      </h1>
      {/* Plain text only: the backend text is never rendered as HTML. */}
      <p className="whitespace-pre-line text-lg leading-relaxed text-slate-800">
        {notice.description}
      </p>
      <p className="border-t border-slate-200 pt-4 text-sm text-slate-600">
        Posted by {userName(notice.created_by)}
        {notice.updatedAt !== notice.createdAt &&
          ` · Updated ${formatDateTime(notice.updatedAt)}`}
      </p>
    </Card>
  );
}

export function NoticeDetail() {
  const params = useParams<{ id: string }>();
  return (
    <div className="space-y-6">
      <ButtonLink href="/notices" variant="ghost" size="sm">
        <Icon name="arrowLeft" className="h-4 w-4" />
        All notices
      </ButtonLink>
      <RequireAuth>
        <NoticeBody id={params.id} />
      </RequireAuth>
    </div>
  );
}

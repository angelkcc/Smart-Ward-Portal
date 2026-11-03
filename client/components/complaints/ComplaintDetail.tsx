"use client";

import { useCallback, type ReactNode } from "react";
import { assigneeName, departmentName } from "./ComplaintCard";
import { StatusProgress } from "./StatusProgress";
import { ComplaintActions } from "@/components/admin/ComplaintActions";
import { ComplaintCategoryBadge, StatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Layout";
import { formatDateTime, safeHttpUrl, userName } from "@/lib/format";
import { useFetch } from "@/hooks/useFetch";
import { getComplaint } from "@/services/complaint.service";

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-sm font-medium text-slate-600">{label}</dt>
      <dd className="mt-0.5 text-base text-slate-900">{children}</dd>
    </div>
  );
}

/**
 * One complaint. The backend only returns it to the person who created it or
 * to an administrator (403 otherwise); `admin` just adds the management panel.
 */
export function ComplaintDetail({ id, admin = false }: { id: string; admin?: boolean }) {
  const fetchComplaint = useCallback(() => getComplaint(id), [id]);
  const { data: complaint, error, loading, reload } = useFetch(fetchComplaint);

  const backHref = admin ? "/admin/complaints" : "/complaints";

  if (loading && !complaint) return <LoadingBlock label="Loading complaint…" />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (!complaint) return null;

  const department = departmentName(complaint);
  const assignee = assigneeName(complaint);
  const imageUrl = safeHttpUrl(complaint.image);

  return (
    <div className="space-y-6">
      <ButtonLink href={backHref} variant="ghost" size="sm">
        <Icon name="arrowLeft" className="h-4 w-4" />
        {admin ? "All complaints" : "My complaints"}
      </ButtonLink>

      <Card className="space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={complaint.status} />
            <ComplaintCategoryBadge category={complaint.category} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {complaint.title}
          </h1>
        </div>

        <StatusProgress status={complaint.status} />

        <div>
          <h2 className="mb-1 text-lg font-semibold text-slate-900">Description</h2>
          {/* Plain text only: user-written text is never rendered as HTML. */}
          <p className="whitespace-pre-line text-base leading-relaxed text-slate-800">
            {complaint.description}
          </p>
        </div>

        <dl className="grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
          <Detail label="Location">{complaint.location}</Detail>
          <Detail label="Submitted">{formatDateTime(complaint.createdAt)}</Detail>
          <Detail label="Department">{department ?? "Not assigned yet"}</Detail>
          <Detail label="Assigned staff member">{assignee ?? "Not assigned yet"}</Detail>
          <Detail label="Last updated">{formatDateTime(complaint.updatedAt)}</Detail>
          {admin && <Detail label="Submitted by">{userName(complaint.created_by)}</Detail>}
          {imageUrl && (
            <Detail label="Photo">
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-blue-900 underline underline-offset-4"
              >
                Open photo link
                <Icon name="external" className="h-4 w-4" />
              </a>
            </Detail>
          )}
        </dl>
      </Card>

      {admin && (
        <ComplaintActions
          key={complaint.updatedAt}
          complaint={complaint}
          onChanged={reload}
        />
      )}
    </div>
  );
}

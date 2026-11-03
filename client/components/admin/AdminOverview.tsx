"use client";

import Link from "next/link";
import { StatTile } from "./StatTile";
import { StatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState, ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { Card } from "@/components/ui/Layout";
import { complaintStatusLabel, formatDate } from "@/lib/format";
import { useFetch } from "@/hooks/useFetch";
import { listComplaints } from "@/services/complaint.service";
import { listDepartments } from "@/services/department.service";
import { listNotices } from "@/services/notice.service";
import { COMPLAINT_STATUSES } from "@/types";

// Every number on this page is counted from live API responses.
const loadOverview = () =>
  Promise.all([listComplaints(), listDepartments(), listNotices()]).then(
    ([complaints, departments, notices]) => ({ complaints, departments, notices }),
  );

export function AdminOverview() {
  const { data, error, loading, reload } = useFetch(loadOverview);

  if (loading && !data) return <LoadingBlock label="Loading overview…" />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (!data) return null;

  const { complaints, departments, notices } = data;
  const countByStatus = (status: string) =>
    complaints.filter((complaint) => complaint.status === status).length;
  const withoutDepartment = complaints.filter((c) => !c.department).length;
  const activeDepartments = departments.filter((d) => d.active).length;

  return (
    <div className="space-y-10">
      <section aria-labelledby="complaints-stats" className="space-y-4">
        <h2 id="complaints-stats" className="text-xl font-bold text-slate-900">
          Complaints
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatTile label="Total" value={complaints.length} />
          {COMPLAINT_STATUSES.map((status) => (
            <StatTile
              key={status}
              label={complaintStatusLabel(status)}
              value={countByStatus(status)}
            />
          ))}
        </div>
        {withoutDepartment > 0 && (
          <p className="text-base text-slate-700">
            {withoutDepartment} complaint{withoutDepartment === 1 ? "" : "s"}{" "}
            not yet assigned to a department.{" "}
            <Link
              href="/admin/complaints"
              className="font-semibold text-blue-900 underline underline-offset-4"
            >
              Review complaints
            </Link>
          </p>
        )}
      </section>

      <section aria-labelledby="other-stats" className="space-y-4">
        <h2 id="other-stats" className="text-xl font-bold text-slate-900">
          Departments and notices
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatTile
            label="Departments"
            value={departments.length}
            hint={`${activeDepartments} active`}
          />
          <StatTile
            label="Published notices"
            value={notices.length}
            hint="Unpublished notices are not counted"
          />
          <StatTile label="Complaints resolved" value={countByStatus("RESOLVED")} />
        </div>
      </section>

      <section aria-labelledby="recent" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="recent" className="text-xl font-bold text-slate-900">
            Latest complaints
          </h2>
          <ButtonLink href="/admin/complaints" variant="secondary" size="sm">
            View all
          </ButtonLink>
        </div>
        {complaints.length === 0 ? (
          <EmptyState
            icon="chat"
            title="No complaints yet"
            description="Complaints submitted by citizens will appear here."
          />
        ) : (
          <Card className="p-0 sm:p-0">
            <ul className="divide-y divide-slate-200">
              {complaints.slice(0, 5).map((complaint) => (
                <li
                  key={complaint._id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/admin/complaints/${complaint._id}`}
                      className="block truncate text-base font-semibold text-blue-900 underline-offset-4 hover:underline"
                    >
                      {complaint.title}
                    </Link>
                    <p className="text-sm text-slate-600">
                      {complaint.location} · {formatDate(complaint.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={complaint.status} />
                </li>
              ))}
            </ul>
          </Card>
        )}
      </section>
    </div>
  );
}

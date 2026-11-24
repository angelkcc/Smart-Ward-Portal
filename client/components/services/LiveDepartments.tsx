
"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState, ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Layout";
import { useAuth } from "@/context/AuthContext";
import { departmentCategoryLabel } from "@/lib/format";
import { useFetch } from "@/hooks/useFetch";
import { listDepartments } from "@/services/department.service";

function DepartmentList() {
  const { data, error, loading, reload } = useFetch(listDepartments);

  if (loading) return <LoadingBlock label="Loading departments…" />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <EmptyState
          icon="building"
          title="No departments have been set up yet"
          description="Departments appear here once an administrator adds them. Complaints are assigned to these departments."
        />
      </div>
    );
  }

  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {data.map((department) => (
        <li key={department._id}>
          <Card className="h-full !p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                <Icon name="building" className="h-6 w-6" />
              </span>

              <div className="flex flex-wrap justify-end gap-2">
                <Badge tone="slate">
                  {departmentCategoryLabel(department.category)}
                </Badge>

                {!department.active && (
                  <Badge tone="amber">Not active</Badge>
                )}
              </div>
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              {department.name}
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              {department.description}
            </p>

            {(department.contact_email || department.contact_phone) && (
              <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                {department.contact_phone && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                      <Icon name="chat" className="h-4 w-4" />
                    </span>
                    <span>{department.contact_phone}</span>
                  </div>
                )}

                {department.contact_email && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                      <Icon name="document" className="h-4 w-4" />
                    </span>
                    <span className="break-all">
                      {department.contact_email}
                    </span>
                  </div>
                )}
              </div>
            )}
          </Card>
        </li>
      ))}
    </ul>
  );
}

/** Real department records from the backend (login required by the API). */
export function LiveDepartments() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingBlock label="Loading…" />;

  if (!user) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <EmptyState
          icon="lock"
          title="Log in to see departments in the system"
          description="These are the departments complaints can be assigned to."
          action={
            <ButtonLink href="/login?next=/services">
              Log in
            </ButtonLink>
          }
        />
      </div>
    );
  }

  return <DepartmentList />;
}

"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState, ErrorState, LoadingBlock } from "@/components/ui/Feedback";
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
      <EmptyState
        icon="building"
        title="No departments have been set up yet"
        description="Departments appear here once an administrator adds them. Complaints are assigned to these departments."
      />
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {data.map((department) => (
        <li key={department._id}>
          <Card className="h-full space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900">
                {department.name}
              </h3>
              <Badge tone="slate">
                {departmentCategoryLabel(department.category)}
              </Badge>
              {!department.active && <Badge tone="amber">Not active</Badge>}
            </div>
            <p className="text-base text-slate-600">{department.description}</p>
            {(department.contact_email || department.contact_phone) && (
              <p className="text-sm text-slate-700">
                {department.contact_phone}
                {department.contact_phone && department.contact_email && " · "}
                {department.contact_email}
              </p>
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
      <EmptyState
        icon="lock"
        title="Log in to see departments in the system"
        description="These are the departments complaints can be assigned to."
        action={<ButtonLink href="/login?next=/services">Log in</ButtonLink>}
      />
    );
  }
  return <DepartmentList />;
}

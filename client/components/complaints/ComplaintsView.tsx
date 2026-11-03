"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ComplaintCard } from "./ComplaintCard";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Alert, EmptyState, ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { Button, ButtonLink } from "@/components/ui/Button";
import { FilterSelect, SearchInput } from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";
import { complaintStatusLabel } from "@/lib/format";
import { useFetch } from "@/hooks/useFetch";
import { listComplaints } from "@/services/complaint.service";
import { COMPLAINT_STATUSES, type ComplaintStatus } from "@/types";

function ComplaintsList() {
  const { isAdmin } = useAuth();
  const { data, error, loading, reload } = useFetch(listComplaints);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ComplaintStatus | "ALL">("ALL");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (data ?? []).filter((complaint) => {
      if (status !== "ALL" && complaint.status !== status) return false;
      if (!term) return true;
      return (
        complaint.title.toLowerCase().includes(term) ||
        complaint.location.toLowerCase().includes(term)
      );
    });
  }, [data, search, status]);

  if (loading) return <LoadingBlock label="Loading your complaints…" />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon="chat"
        title="You have not submitted any complaints"
        description="If something in your area needs the ward office's attention, you can report it here."
        action={<ButtonLink href="/complaints/new">Submit a complaint</ButtonLink>}
      />
    );
  }

  const filtersActive = search.trim() !== "" || status !== "ALL";

  return (
    <div className="space-y-6">
      {isAdmin && (
        <Alert tone="info" title="You are logged in as an administrator">
          This list shows every complaint. To assign, update or delete
          complaints, use the{" "}
          <Link href="/admin/complaints" className="font-semibold underline">
            admin dashboard
          </Link>
          .
        </Alert>
      )}

      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_14rem]">
        <SearchInput
          label="Search complaints"
          placeholder="Title or location"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FilterSelect
          label="Status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as ComplaintStatus | "ALL")
          }
        >
          <option value="ALL">All statuses</option>
          {COMPLAINT_STATUSES.map((value) => (
            <option key={value} value={value}>
              {complaintStatusLabel(value)}
            </option>
          ))}
        </FilterSelect>
      </div>

      <p className="text-base text-slate-600" aria-live="polite">
        Showing {filtered.length} of {data.length} complaints
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="No complaints match your search"
          action={
            filtersActive ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setStatus("ALL");
                }}
              >
                Clear search and filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((complaint) => (
            <li key={complaint._id}>
              <ComplaintCard
                complaint={complaint}
                href={`/complaints/${complaint._id}`}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ComplaintsView() {
  return (
    <RequireAuth>
      <ComplaintsList />
    </RequireAuth>
  );
}

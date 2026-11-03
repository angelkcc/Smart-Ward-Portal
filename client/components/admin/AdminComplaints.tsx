"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { departmentName } from "@/components/complaints/ComplaintCard";
import { StatusBadge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState, ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { FilterSelect, SearchInput } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { ConfirmDialog } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { toApiError } from "@/lib/api";
import {
  complaintCategoryLabel,
  complaintStatusLabel,
  formatDate,
  userName,
} from "@/lib/format";
import { useFetch } from "@/hooks/useFetch";
import { deleteComplaint, listComplaints } from "@/services/complaint.service";
import { listDepartments } from "@/services/department.service";
import {
  COMPLAINT_CATEGORIES,
  COMPLAINT_STATUSES,
  type Complaint,
  type ComplaintCategory,
  type ComplaintStatus,
} from "@/types";

const loadData = () =>
  Promise.all([listComplaints(), listDepartments()]).then(
    ([complaints, departments]) => ({ complaints, departments }),
  );

export function AdminComplaints() {
  const toast = useToast();
  const { data, error, loading, reload } = useFetch(loadData);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ComplaintStatus | "ALL">("ALL");
  const [category, setCategory] = useState<ComplaintCategory | "ALL">("ALL");
  const [department, setDepartment] = useState("ALL"); // "ALL" | "NONE" | department id
  const [toDelete, setToDelete] = useState<Complaint | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (data?.complaints ?? []).filter((complaint) => {
      if (status !== "ALL" && complaint.status !== status) return false;
      if (category !== "ALL" && complaint.category !== category) return false;
      if (department === "NONE" && complaint.department) return false;
      if (department !== "ALL" && department !== "NONE") {
        const dept = complaint.department;
        const id = dept && typeof dept === "object" ? dept._id : dept;
        if (id !== department) return false;
      }
      if (!term) return true;
      return (
        complaint.title.toLowerCase().includes(term) ||
        complaint.location.toLowerCase().includes(term) ||
        userName(complaint.created_by).toLowerCase().includes(term)
      );
    });
  }, [data, search, status, category, department]);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteComplaint(toDelete._id);
      toast.success("Complaint deleted.");
      setToDelete(null);
      reload();
    } catch (err) {
      toast.error(toApiError(err).message);
    } finally {
      setDeleting(false);
    }
  }

  if (loading && !data) return <LoadingBlock label="Loading complaints…" />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (!data) return null;

  if (data.complaints.length === 0) {
    return (
      <EmptyState
        icon="chat"
        title="No complaints yet"
        description="Complaints submitted by citizens will appear here."
      />
    );
  }

  const filtersActive =
    search.trim() !== "" || status !== "ALL" || category !== "ALL" || department !== "ALL";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-4">
        <SearchInput
          label="Search"
          placeholder="Title, location or name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FilterSelect
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value as ComplaintStatus | "ALL")}
        >
          <option value="ALL">All statuses</option>
          {COMPLAINT_STATUSES.map((value) => (
            <option key={value} value={value}>
              {complaintStatusLabel(value)}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect
          label="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value as ComplaintCategory | "ALL")}
        >
          <option value="ALL">All categories</option>
          {COMPLAINT_CATEGORIES.map((value) => (
            <option key={value} value={value}>
              {complaintCategoryLabel(value)}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect
          label="Department"
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
        >
          <option value="ALL">All departments</option>
          <option value="NONE">Not assigned</option>
          {data.departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </FilterSelect>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-base text-slate-600" aria-live="polite">
          Showing {filtered.length} of {data.complaints.length} complaints
        </p>
        {filtersActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch("");
              setStatus("ALL");
              setCategory("ALL");
              setDepartment("ALL");
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="search" title="No complaints match these filters" />
      ) : (
        <>
          {/* Wide screens: table */}
          <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm md:block">
            <table className="w-full text-left text-base">
              <caption className="sr-only">Complaints</caption>
              <thead className="bg-slate-50 text-sm text-slate-700">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Complaint</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Department</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Submitted</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((complaint) => (
                  <tr key={complaint._id} className="align-top">
                    <td className="max-w-xs px-4 py-3">
                      <Link
                        href={`/admin/complaints/${complaint._id}`}
                        className="font-semibold text-blue-900 underline-offset-4 hover:underline"
                      >
                        {complaint.title}
                      </Link>
                      <p className="text-sm text-slate-600">
                        {complaintCategoryLabel(complaint.category)} · {complaint.location}
                      </p>
                      <p className="text-sm text-slate-600">
                        By {userName(complaint.created_by)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-800">
                      {departmentName(complaint) ?? <span className="text-slate-500">Not assigned</span>}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                      {formatDate(complaint.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <ButtonLink
                          href={`/admin/complaints/${complaint._id}`}
                          variant="secondary"
                          size="sm"
                        >
                          Manage
                        </ButtonLink>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label={`Delete ${complaint.title}`}
                          onClick={() => setToDelete(complaint)}
                          className="text-red-700 hover:bg-red-50"
                        >
                          <Icon name="trash" className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phones: cards */}
          <ul className="space-y-4 md:hidden">
            {filtered.map((complaint) => (
              <li
                key={complaint._id}
                className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/admin/complaints/${complaint._id}`}
                    className="text-base font-semibold text-blue-900 underline-offset-4 hover:underline"
                  >
                    {complaint.title}
                  </Link>
                  <StatusBadge status={complaint.status} />
                </div>
                <p className="text-sm text-slate-600">
                  {complaintCategoryLabel(complaint.category)} · {complaint.location}
                </p>
                <p className="text-sm text-slate-600">
                  {departmentName(complaint) ?? "No department"} · {formatDate(complaint.createdAt)}
                </p>
                <div className="flex gap-2">
                  <ButtonLink
                    href={`/admin/complaints/${complaint._id}`}
                    variant="secondary"
                    size="sm"
                  >
                    Manage
                  </ButtonLink>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setToDelete(complaint)}
                    className="text-red-700 hover:bg-red-50"
                  >
                    <Icon name="trash" className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete this complaint?"
        message={
          <p>
            “{toDelete?.title}” will be permanently removed. This cannot be undone.
          </p>
        }
        confirmLabel="Delete complaint"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}

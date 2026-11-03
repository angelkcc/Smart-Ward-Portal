"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";
import { SelectField } from "@/components/ui/Field";
import { Card } from "@/components/ui/Layout";
import { ConfirmDialog } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { toApiError } from "@/lib/api";
import { complaintStatusLabel } from "@/lib/format";
import { useFetch } from "@/hooks/useFetch";
import * as complaintService from "@/services/complaint.service";
import { listDepartments } from "@/services/department.service";
import { listUsers } from "@/services/user.service";
import { COMPLAINT_STATUSES, type Complaint, type ComplaintStatus } from "@/types";

/**
 * Admin-only management panel for one complaint. Every button calls the real
 * PATCH / DELETE endpoint; the backend rejects non-admins with 403 regardless
 * of what this component shows.
 */
export function ComplaintActions({
  complaint,
  onChanged,
}: {
  complaint: Complaint;
  onChanged: () => void;
}) {
  const router = useRouter();
  const toast = useToast();
  const departments = useFetch(listDepartments);
  const users = useFetch(listUsers);

  const currentDepartmentId =
    complaint.department && typeof complaint.department === "object"
      ? complaint.department._id
      : "";
  const currentAssigneeId =
    complaint.assigned_to && typeof complaint.assigned_to === "object"
      ? complaint.assigned_to._id
      : "";

  const [status, setStatus] = useState<ComplaintStatus>(complaint.status);
  const [departmentId, setDepartmentId] = useState(currentDepartmentId);
  const [assigneeId, setAssigneeId] = useState(currentAssigneeId);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function run(action: string, task: () => Promise<unknown>, success: string) {
    setBusy(action);
    try {
      await task();
      toast.success(success);
      onChanged();
    } catch (error) {
      toast.error(toApiError(error).message);
    } finally {
      setBusy(null);
    }
  }

  async function handleDelete() {
    setBusy("delete");
    try {
      await complaintService.deleteComplaint(complaint._id);
      toast.success("Complaint deleted.");
      router.push("/admin/complaints");
    } catch (error) {
      toast.error(toApiError(error).message);
      setBusy(null);
      setConfirmDelete(false);
    }
  }

  const activeDepartments = (departments.data ?? []).filter((d) => d.active);
  // Staff = accounts with the ADMIN role (the backend has no separate staff role).
  const staff = (users.data ?? []).filter((u) => u.role === "ADMIN");

  return (
    <Card className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Manage this complaint</h2>
        <p className="mt-1 text-base text-slate-600">
          Changes are saved to the ward system straight away.
        </p>
      </div>

      <section className="space-y-3" aria-labelledby="status-heading">
        <h3 id="status-heading" className="text-lg font-semibold text-slate-900">
          Status
        </h3>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <SelectField
            label="Set status"
            value={status}
            onChange={(event) => setStatus(event.target.value as ComplaintStatus)}
            className="sm:w-60"
          >
            {COMPLAINT_STATUSES.map((value) => (
              <option key={value} value={value}>
                {complaintStatusLabel(value)}
              </option>
            ))}
          </SelectField>
          <Button
            onClick={() =>
              run(
                "status",
                () => complaintService.updateStatus(complaint._id, status),
                "Status updated.",
              )
            }
            loading={busy === "status"}
            disabled={busy !== null || status === complaint.status}
          >
            Update status
          </Button>
        </div>
      </section>

      <section className="space-y-3 border-t border-slate-200 pt-6" aria-labelledby="dept-heading">
        <h3 id="dept-heading" className="text-lg font-semibold text-slate-900">
          Department
        </h3>
        {departments.error ? (
          <Alert tone="error">Could not load departments: {departments.error.message}</Alert>
        ) : activeDepartments.length === 0 && !departments.loading ? (
          <Alert tone="warning" title="No active departments">
            Add or activate a department on the Departments page first.
          </Alert>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <SelectField
              label="Assign to department"
              value={departmentId}
              onChange={(event) => setDepartmentId(event.target.value)}
              disabled={departments.loading}
              className="sm:w-80"
            >
              <option value="">Choose a department…</option>
              {activeDepartments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </SelectField>
            <Button
              onClick={() =>
                run(
                  "department",
                  () => complaintService.assignDepartment(complaint._id, departmentId),
                  "Department assigned.",
                )
              }
              loading={busy === "department"}
              disabled={busy !== null || !departmentId || departmentId === currentDepartmentId}
            >
              Assign department
            </Button>
          </div>
        )}
      </section>

      <section className="space-y-3 border-t border-slate-200 pt-6" aria-labelledby="staff-heading">
        <h3 id="staff-heading" className="text-lg font-semibold text-slate-900">
          Staff member
        </h3>
        {users.error ? (
          <Alert tone="error">Could not load staff: {users.error.message}</Alert>
        ) : (
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <SelectField
                label="Assign to staff member"
                hint="Assigning a staff member also sets the status to Assigned."
                value={assigneeId}
                onChange={(event) => setAssigneeId(event.target.value)}
                disabled={users.loading}
                className="sm:w-80"
              >
                <option value="">Choose a staff member…</option>
                {staff.map((person) => (
                  <option key={person._id} value={person._id}>
                    {person.full_name} ({person.email})
                  </option>
                ))}
              </SelectField>
              <Button
                onClick={() =>
                  run(
                    "assign",
                    () => complaintService.assignToUser(complaint._id, assigneeId),
                    "Staff member assigned.",
                  )
                }
                loading={busy === "assign"}
                disabled={busy !== null || !assigneeId || assigneeId === currentAssigneeId}
              >
                Assign staff member
              </Button>
            </div>
          </>
        )}
      </section>

      <section className="space-y-3 border-t border-slate-200 pt-6">
        <h3 className="text-lg font-semibold text-slate-900">Delete</h3>
        <p className="text-base text-slate-600">
          Deleting removes the complaint permanently. This cannot be undone.
        </p>
        <Button variant="danger" onClick={() => setConfirmDelete(true)} disabled={busy !== null}>
          Delete complaint
        </Button>
      </section>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this complaint?"
        message={
          <p>
            “{complaint.title}” will be permanently removed. This cannot be
            undone.
          </p>
        }
        confirmLabel="Delete complaint"
        busy={busy === "delete"}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </Card>
  );
}

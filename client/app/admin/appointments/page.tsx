
"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/Layout";
import { useToast } from "@/components/ui/Toast";
import {
  listAppointments,
  updateAppointment,
} from "@/services/appointment.service";
import type {
  Appointment,
  AppointmentStatus,
} from "@/types";

function formatStatus(status: AppointmentStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function statusStyle(status: AppointmentStatus) {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    case "RESCHEDULED":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-amber-100 text-amber-800";
  }
}

function displayService(service: string) {
  return service.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (char) =>
    char.toUpperCase(),
  );
}

export default function AdminAppointmentsPage() {
  const toast = useToast();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [adminNote, setAdminNote] = useState("");

  const fetchAppointments = useCallback(async () => {
    setLoading(true);

    try {
      const result = await listAppointments();
      setAppointments(result);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not load appointments.",
      );
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void fetchAppointments();
  }, [fetchAppointments]);

  function openReview(appointment: Appointment) {
    setSelectedId(appointment._id);
    setPreferredDate(appointment.preferred_date);
    setPreferredTime(appointment.preferred_time);
    setAdminNote(appointment.admin_note ?? "");
  }

  function closeReview() {
    setSelectedId(null);
    setPreferredDate("");
    setPreferredTime("");
    setAdminNote("");
  }

  async function handleUpdate(
    appointment: Appointment,
    status: AppointmentStatus,
  ) {
    if (
      (status === "APPROVED" || status === "RESCHEDULED") &&
      (!preferredDate || !preferredTime)
    ) {
      toast.error("Please select an appointment date and time.");
      return;
    }

    setUpdatingId(appointment._id);

    try {
      await updateAppointment(appointment._id, {
        status,
        admin_note: adminNote,
        ...(status === "APPROVED" || status === "RESCHEDULED"
          ? {
              preferred_date: preferredDate,
              preferred_time: preferredTime,
            }
          : {}),
      });

      toast.success(
        `Appointment ${formatStatus(status).toLowerCase()} successfully.`,
      );

      closeReview();
      await fetchAppointments();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update appointment.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  const pendingCount = appointments.filter(
    (item) => item.status === "PENDING",
  ).length;

  const approvedCount = appointments.filter(
    (item) => item.status === "APPROVED",
  ).length;

  const rejectedCount = appointments.filter(
    (item) => item.status === "REJECTED",
  ).length;

  return (
    <>
      <PageHeader
        title="Appointments"
        description="View residents' appointment applications and manage their requests."
      />

      {/* Summary cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Total applications
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {appointments.length}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-medium text-amber-800">Pending</p>
          <p className="mt-2 text-3xl font-bold text-amber-900">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <p className="text-sm font-medium text-green-800">Approved</p>
          <p className="mt-2 text-3xl font-bold text-green-900">
            {approvedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-800">Rejected</p>
          <p className="mt-2 text-3xl font-bold text-red-900">
            {rejectedCount}
          </p>
        </div>
      </div>

      {/* Appointment list */}
      <div className="mt-10">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Appointment applications
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review and update appointment requests submitted by citizens.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={fetchAppointments}
            loading={loading}
          >
            <Icon name="clock" className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              Loading appointment applications...
            </p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <Icon
              name="clipboard"
              className="mx-auto h-10 w-10 text-slate-400"
            />
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No appointments yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Appointment applications submitted by residents will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {appointments.map((appointment) => {
              const isSelected = selectedId === appointment._id;
              const isUpdating = updatingId === appointment._id;

              const applicant =
                typeof appointment.created_by === "object"
                  ? appointment.created_by
                  : null;

              return (
                <div
                  key={appointment._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-slate-900">
                            {appointment.full_name}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle(appointment.status)}`}
                          >
                            {formatStatus(appointment.status)}
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                          {appointment.phone_number}
                          {applicant?.email
                            ? ` · ${applicant.email}`
                            : ""}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            isSelected
                              ? closeReview()
                              : openReview(appointment)
                          }
                        >
                          {isSelected ? "Close details" : "Review application"}
                        </Button>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Requested service
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {displayService(appointment.service)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Preferred date
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {appointment.preferred_date}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Preferred time
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {appointment.preferred_time}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-6 border-t border-slate-200 pt-6">
                        <h4 className="text-base font-bold text-slate-900">
                          Application details
                        </h4>

                        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Reason for appointment
                          </p>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                            {appointment.reason}
                          </p>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`date-${appointment._id}`}
                              className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                              Appointment date
                            </label>
                            <input
                              id={`date-${appointment._id}`}
                              type="date"
                              value={preferredDate}
                              min={new Date().toLocaleDateString("en-CA")}
                              onChange={(event) =>
                                setPreferredDate(event.target.value)
                              }
                              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`time-${appointment._id}`}
                              className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                              Appointment time
                            </label>
                            <input
                              id={`time-${appointment._id}`}
                              type="time"
                              value={preferredTime}
                              onChange={(event) =>
                                setPreferredTime(event.target.value)
                              }
                              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>
                        </div>

                        <div className="mt-5">
                          <label
                            htmlFor={`note-${appointment._id}`}
                            className="mb-2 block text-sm font-semibold text-slate-700"
                          >
                            Admin note
                          </label>
                          <textarea
                            id={`note-${appointment._id}`}
                            rows={3}
                            value={adminNote}
                            onChange={(event) =>
                              setAdminNote(event.target.value)
                            }
                            placeholder="Add a message for the applicant..."
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {appointment.admin_note && (
                          <p className="mt-3 text-xs text-slate-500">
                            Previous admin note: {appointment.admin_note}
                          </p>
                        )}

                        <div className="mt-6 flex flex-wrap gap-3">
                          <Button
                            variant="primary"
                            size="sm"
                            loading={isUpdating}
                            disabled={isUpdating}
                            onClick={() =>
                              handleUpdate(appointment, "APPROVED")
                            }
                          >
                            <Icon name="checkCircle" className="mr-2 h-4 w-4" />
                            Approve
                          </Button>

                          <Button
                            variant="accent"
                            size="sm"
                            loading={isUpdating}
                            disabled={isUpdating}
                            onClick={() =>
                              handleUpdate(appointment, "RESCHEDULED")
                            }
                          >
                            <Icon name="clock" className="mr-2 h-4 w-4" />
                            Reschedule
                          </Button>

                          <Button
                            variant="danger"
                            size="sm"
                            loading={isUpdating}
                            disabled={isUpdating}
                            onClick={() =>
                              handleUpdate(appointment, "REJECTED")
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

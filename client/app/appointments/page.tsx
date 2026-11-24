
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { listAppointments } from "@/services/appointment.service";
import type { Appointment } from "@/types";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Container, PageHeader } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";

function StatusBadge({ status }: { status: Appointment["status"] }) {
  const styles = {
    PENDING: "bg-amber-100 text-amber-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    RESCHEDULED: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

export default function MyAppointmentsPage() {
  const toast = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);

    try {
      const result = await listAppointments();
      setAppointments(result);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not load your appointments.",
      );
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void fetchAppointments();
  }, [fetchAppointments]);

  return (
    <RequireAuth>
      <div className="min-h-screen bg-slate-50">
        <Container className="py-12 sm:py-16">
          <PageHeader
            eyebrow="Citizen portal"
            title="My Appointments"
            description="View your appointment applications and check their latest status."
          />

          <div className="mt-8 flex flex-wrap justify-between gap-3">
            <p className="text-sm text-slate-600">
              {appointments.length} application(s) submitted
            </p>

            <ButtonLink href="/appointments/new" size="md">
              <Icon name="plus" className="mr-2 h-4 w-4" />
              Book an Appointment
            </ButtonLink>
          </div>

          {loading ? (
            <div className="mt-8 rounded-2xl border bg-white p-10 text-center">
              Loading your appointments...
            </div>
          ) : appointments.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <Icon name="clipboard" className="mx-auto h-12 w-12 text-slate-400" />

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                No appointments yet
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                You haven't submitted any appointment applications.
              </p>

              <div className="mt-6">
                <ButtonLink href="/appointments/new" size="lg">
                  Book Your First Appointment
                </ButtonLink>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-5">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-lg font-bold text-slate-900">
                      {appointment.service.replaceAll("_", " ")}
                    </h2>

                    <StatusBadge status={appointment.status} />
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Applicant
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-900">
                        {appointment.full_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Phone number
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-900">
                        {appointment.phone_number}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Appointment date
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-900">
                        {appointment.preferred_date}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Appointment time
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-900">
                        {appointment.preferred_time}
                      </p>
                    </div>
                  </div>

                  {appointment.admin_note && (
                    <div className="mt-5 rounded-xl bg-blue-50 p-4">
                      <p className="text-sm font-bold text-blue-950">
                        Message from ward administration
                      </p>
                      <p className="mt-2 text-sm leading-6 text-blue-900">
                        {appointment.admin_note}
                      </p>
                    </div>
                  )}

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-sm text-slate-500">
                      Application reason
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {appointment.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/services"
              className="text-sm font-semibold text-blue-900 hover:underline"
            >
              ← Back to Ward Services
            </Link>
          </div>
        </Container>
      </div>
    </RequireAuth>
  );
}

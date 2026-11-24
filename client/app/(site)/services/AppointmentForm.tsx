
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";
import { Card } from "@/components/ui/Layout";
import { toApiError } from "@/lib/api";
import { useToast } from "@/components/ui/Toast";
import { createAppointment } from "@/services/appointment.service";
import type { AppointmentInput, AppointmentService } from "@/types";

const SERVICES: { value: AppointmentService; label: string }[] = [
  { value: "BIRTH_REGISTRATION", label: "Birth Registration" },
  { value: "DEATH_REGISTRATION", label: "Death Registration" },
  { value: "MARRIAGE_REGISTRATION", label: "Marriage Registration" },
  { value: "LAND_OWNERSHIP", label: "Land Ownership / Transfer" },
  { value: "WARD_RECOMMENDATION", label: "Ward Recommendation" },
  { value: "OTHER", label: "Other Service" },
];

function Form() {
  const router = useRouter();
  const toast = useToast();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<AppointmentService | "">("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const today = new Date();
  const minimumDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    if (!service) {
      setError("Please select a service.");
      return;
    }

    if (phone.trim().length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    const input: AppointmentInput = {
      full_name: fullName.trim(),
      phone_number: phone.trim(),
      service,
      preferred_date: date,
      preferred_time: time,
      reason: reason.trim(),
    };

    setError("");
    setSubmitting(true);

    try {
      await createAppointment(input);
      toast.success("Your appointment request has been submitted.");
      router.push("/appointments");
    } catch (err) {
      setError(toApiError(err).message);
      setSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto max-w-3xl !p-6 sm:!p-8">
      <div className="mb-7">
        <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
          Ward No. 9
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Appointment application
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Complete the form below to request an appointment at the ward office.
          Your request will remain pending until reviewed by an administrator.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <Alert tone="error" title="Could not submit appointment">
            {error}
          </Alert>
        )}

        <div>
          <label htmlFor="full_name" className="mb-2 block text-sm font-semibold text-slate-700">
            Full name
          </label>
          <input
            id="full_name"
            required
            minLength={3}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">
            Phone number
          </label>
          <input
            id="phone"
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your contact number"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-semibold text-slate-700">
            Select service
          </label>
          <select
            id="service"
            required
            value={service}
            onChange={(e) => setService(e.target.value as AppointmentService | "")}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Choose a service</option>
            {SERVICES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-2 block text-sm font-semibold text-slate-700">
              Preferred date
            </label>
            <input
              id="date"
              required
              type="date"
              min={minimumDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="time" className="mb-2 block text-sm font-semibold text-slate-700">
              Preferred time
            </label>
            <input
              id="time"
              required
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reason" className="mb-2 block text-sm font-semibold text-slate-700">
            Reason for appointment
          </label>
          <textarea
            id="reason"
            required
            minLength={5}
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Briefly explain what you need help with..."
            className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          Submitting this form sends an appointment request. It does not
          guarantee your preferred date or time. Please wait for approval
          from the ward office.
        </div>

        <Button type="submit" size="lg" loading={submitting} className="w-full">Submit appointment request</Button>
      </form>
    </Card>
  );
}

export function AppointmentForm() {
  return (
    <RequireAuth>
      <Form />
    </RequireAuth>
  );
}

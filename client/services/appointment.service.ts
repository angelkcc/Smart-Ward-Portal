
import { apiFetch } from "@/lib/api";
import type {
  Appointment,
  AppointmentInput,
  AppointmentStatus,
} from "@/types";

export const createAppointment = (input: AppointmentInput) =>
  apiFetch<Appointment>("/appointments", {
    method: "POST",
    body: input,
  });

export const listAppointments = () =>
  apiFetch<Appointment[]>("/appointments");

export const getAppointment = (id: string) =>
  apiFetch<Appointment>(`/appointments/${id}`);

export const updateAppointment = (
  id: string,
  input: {
    status: AppointmentStatus;
    admin_note?: string;
    preferred_date?: string;
    preferred_time?: string;
  },
) =>
  apiFetch<Appointment>(`/appointments/${id}`, {
    method: "PATCH",
    body: input,
  });

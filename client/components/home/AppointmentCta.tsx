
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function AppointmentCta() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-950 via-blue-900 to-slate-900 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-teal-200">
                <Icon name="clock" className="h-4 w-4" />
                Online Appointment Service
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                Your Ward Visit, Planned in Advance
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">
                Request an appointment online, choose your preferred
                date and time, and let ward staff review your application.
                You can also track your appointment status without visiting
                the ward office.
              </p>

              <div className="mt-6 space-y-3 text-sm text-blue-100">
                <p className="flex items-center gap-2">
                  <Icon name="checkCircle" className="h-4 w-4 text-teal-300" />
                  Submit appointment applications online
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="checkCircle" className="h-4 w-4 text-teal-300" />
                  Check approval and rejection status
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="checkCircle" className="h-4 w-4 text-teal-300" />
                  View updated appointment dates and times
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-teal-200">
                <Icon name="clipboard" className="h-7 w-7" />
              </span>

              <h3 className="mt-5 text-xl font-bold">
                Manage Your Appointments
              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                Apply for a new appointment or check the progress of an
                application you have already submitted.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink
                  href="/appointments/new"
                  variant="light"
                  size="lg"
                  className="w-full"
                >
                  Book an Appointment
                  <Icon name="arrowRight" className="ml-2 h-4 w-4" />
                </ButtonLink>

                <Link
                  href="/appointments"
                  className="flex w-full items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <Icon name="search" className="mr-2 h-4 w-4" />
                  Track My Appointment
                </Link>
              </div>

              <p className="mt-4 text-center text-xs text-blue-200">
                Login required to access your applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

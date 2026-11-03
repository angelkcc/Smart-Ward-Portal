import type { Metadata } from "next";
import Link from "next/link";
import { DocumentChecklist } from "@/components/services/DocumentChecklist";
import { LiveDepartments } from "@/components/services/LiveDepartments";
import { Alert } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { Card, Container, PageHeader } from "@/components/ui/Layout";
import { ONLINE_SERVICES, SERVICE_DEPARTMENTS } from "@/content/services";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <Container className="space-y-14 py-10">
      <PageHeader
        eyebrow="Where to start"
        title="Ward services"
        description="Find out which department to approach, and what you can already do online."
      />

      <section aria-labelledby="online-heading" className="space-y-5">
        <div>
          <h2 id="online-heading" className="text-2xl font-bold text-slate-900">
            Available online now
          </h2>
          <p className="mt-1 text-base text-slate-600">
            These services work through this portal today.
          </p>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {ONLINE_SERVICES.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-800">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-1 text-base text-slate-600">
                  {service.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="guidance-heading" className="space-y-5">
        <div>
          <h2 id="guidance-heading" className="text-2xl font-bold text-slate-900">
            Departments at the ward office
          </h2>
          <p className="mt-1 text-base text-slate-600">
            The ward office has four departments.
          </p>
        </div>
        <Alert tone="info" title="General guidance only">
          The descriptions below are general. Applications for these services
          cannot be submitted through this portal yet, so please visit the ward
          office and confirm what you need to bring.
        </Alert>
        <ul className="grid gap-5 md:grid-cols-2">
          {SERVICE_DEPARTMENTS.map((department) => (
            <li key={department.id}>
              <Card className="h-full space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <Icon name={department.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {department.name}
                  </h3>
                </div>
                <p className="text-base text-slate-700">{department.summary}</p>
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="mb-2 text-base font-semibold text-slate-900">
                    Documents to prepare
                  </h4>
                  {department.documents.length > 0 ? (
                    <DocumentChecklist documents={department.documents} />
                  ) : (
                    <p className="text-base text-slate-600">
                      A verified document checklist has not been published for
                      this department yet. Please ask the ward office before
                      your visit.
                    </p>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="live-heading" className="space-y-5">
        <div>
          <h2 id="live-heading" className="text-2xl font-bold text-slate-900">
            Departments in the portal
          </h2>
          <p className="mt-1 text-base text-slate-600">
            The departments currently set up in the system for handling
            complaints.
          </p>
        </div>
        <LiveDepartments />
      </section>
    </Container>
  );
}

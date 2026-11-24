
"use client";

import { useState } from "react";
import { DocumentChecklist } from "@/components/services/DocumentChecklist";
import { LiveDepartments } from "@/components/services/LiveDepartments";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Container, PageHeader } from "@/components/ui/Layout";
import Link from "next/link";

const SERVICES: Array<{
  id: string;
  title: string;
  description: string;
  icon: IconName;
  documents: Array<{ name: string; note?: string }>;
}> = [
  {
    id: "birth",
    title: "Birth Registration",
    description: "Register a newborn child's birth and obtain a birth certificate.",
    icon: "users",
    documents: [
      { name: "Parents' citizenship certificates", note: "Copies of the father's and mother's citizenship certificates." },
      { name: "Informant's citizenship certificate", note: "Identification of the person reporting the birth." },
      { name: "Hospital birth report", note: "If the child was born at a hospital or health institution." },
      { name: "Vaccination card", note: "For a home birth, the first vaccination record may be required." },
      { name: "Online birth registration form", note: "Complete the official event registration form and bring the token details." },
      { name: "Migration certificate", note: "If applicable to your circumstances." },
    ],
  },
  {
    id: "death",
    title: "Death Registration",
    description: "Register a death and obtain an official death registration certificate.",
    icon: "document",
    documents: [
      { name: "Deceased person's citizenship", note: "If citizenship was issued; otherwise, bring an available identity document." },
      { name: "Informant's citizenship certificate", note: "Citizenship of the person reporting the death." },
      { name: "Hospital death report", note: "If the death occurred at a health institution." },
      { name: "Online death registration form", note: "Complete the official event registration form." },
      { name: "Additional supporting documents", note: "The ward may request further evidence depending on the circumstances." },
    ],
  },
  {
    id: "land",
    title: "Land Ownership / Transfer",
    description: "Prepare for land ownership-related recommendations or transfer procedures.",
    icon: "building",
    documents: [
      { name: "Land ownership certificate (Lalpurja)", note: "Bring the original and copies if available." },
      { name: "Citizenship certificates", note: "Of the relevant landowners and applicants." },
      { name: "Latest property tax receipt", note: "Proof of applicable property tax payment." },
      { name: "Land parcel details", note: "Plot number, cadastral map or other available land records." },
      { name: "Application or written request", note: "Explain the specific land-related service you need." },
      { name: "Relationship or death certificate", note: "If the request concerns inheritance or transfer after a death." },
    ],
  },
  {
    id: "marriage",
    title: "Marriage Registration",
    description: "Register a marriage and obtain an official marriage certificate.",
    icon: "users",
    documents: [
      { name: "Citizenship certificates", note: "Identification documents of both applicants." },
      { name: "Marriage registration application", note: "Complete the applicable registration form." },
      { name: "Photographs", note: "Bring passport-size photographs if requested." },
      { name: "Witness identification", note: "Citizenship documents of witnesses, where required." },
      { name: "Additional supporting documents", note: "The ward may request further documents depending on the circumstances." },
    ],
  },
  {
    id: "recommendation",
    title: "Ward Recommendation",
    description: "Apply for a recommendation or verification letter from the ward.",
    icon: "clipboard",
    documents: [
      { name: "Citizenship certificate", note: "Of the applicant." },
      { name: "Written application", note: "Clearly mention the recommendation you need." },
      { name: "Supporting certificates", note: "Documents relevant to your specific request." },
      { name: "Photographs", note: "If required for the particular recommendation." },
    ],
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(SERVICES[0]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Container className="py-12 sm:py-16">
        <PageHeader
          eyebrow="Citizen service guide"
          title="Ward Services"
          description="Find the service you need, prepare your documents, and learn which ward department can assist you."
        />

        {/* Service selection */}
        <section className="mt-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              What service do you need?
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Choose a service below to see a preparation checklist.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const active = selectedService.id === service.id;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(service)}
                  aria-pressed={active}
                  className={`flex h-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                    active
                      ? "border-blue-800 bg-blue-50 shadow-md ring-1 ring-blue-800"
                      : "border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      active
                        ? "bg-blue-900 text-white"
                        : "bg-blue-50 text-blue-900"
                    }`}
                  >
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-900">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {service.description}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-900">
                      {active ? "Selected" : "View checklist"}
                      <Icon name="arrowRight" className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected service checklist */}
        <section className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="mb-5">
              <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
                Get prepared
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Documents for {selectedService.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Tick each document as you prepare it. You can switch services
                whenever you need.
              </p>
            </div>

            <DocumentChecklist
              key={selectedService.id}
              documents={selectedService.documents}
            />
          </div>

          {/* Important information */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-900">
                <Icon name="info" className="h-5 w-5" />
              </span>

              <h3 className="mt-4 text-lg font-bold text-blue-950">
                Before visiting the ward
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-7 text-blue-950">
                <li>• Carry original documents and photocopies.</li>
                <li>• Check whether your service requires an online form.</li>
                <li>• Confirm the latest requirements with the ward office.</li>
                <li>• Some services may require additional verification.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h3 className="font-bold text-amber-950">
                Important document notice
              </h3>
              <p className="mt-2 text-sm leading-7 text-amber-900">
                These checklists are general preparation guides, not official
                approval requirements. The ward office may request additional
                documents depending on your individual situation.
              </p>
            </div>

            <a
              href="https://donidcr.gov.np/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-blue-900 shadow-sm transition-colors hover:bg-blue-50"
            >
              Official registration information
              <Icon name="external" className="h-4 w-4" />
            </a>
          </div>
        </section>

       
{/* Appointment information */}
<section className="mt-14">
  <div className="overflow-hidden rounded-3xl bg-linear-to-r from-blue-950 to-blue-800 p-7 text-white shadow-lg sm:p-10">
    <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
          <Icon name="clock" className="h-4 w-4" />
          Online appointment service
        </span>

        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
          Plan your visit to the ward office
        </h2>

        <p className="mt-3 text-sm leading-7 text-blue-100 sm:text-base">
          Save time by submitting an appointment request online.
          Choose the service you need, select your preferred date
          and time, and provide the details of your visit.
        </p>

        <p className="mt-3 text-sm leading-7 text-blue-100">
          Your request will be sent to ward staff for review.
          You can check your appointment status after submitting it.
        </p>
      </div>

      <div className="shrink-0 rounded-2xl bg-white/10 p-5 sm:w-60">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-teal-200">
          <Icon name="clock" className="h-7 w-7" />
        </span>

        <h3 className="mt-4 text-lg font-bold">
          Ready to book?
        </h3>

        <p className="mt-2 text-sm leading-6 text-blue-100">
          Submit your appointment application in just a few steps.
        </p>
       <Link href="/appointments/new" className="mt-5 flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-950 shadow-sm transition hover:bg-blue-50">
        Book an Appointment
       <Icon name="arrowRight" className="ml-2 h-4 w-4" />
       </Link>
       <Link href="/appointments" className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">
       <Icon name="search" className="mr-2 h-4 w-4" />
        Track My Appointment
       </Link>
        <p className="mt-3 text-center text-xs text-blue-200">
          Login required to submit a request
        </p>
      </div>
    </div>
  </div>
</section>


        {/* Departments */}
        <section className="mt-16">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
              Get assistance
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Ward Departments
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Find the departments responsible for handling ward services and
              citizen complaints.
            </p>
          </div>

          <LiveDepartments />
        </section>
      </Container>
    </div>
  );
}

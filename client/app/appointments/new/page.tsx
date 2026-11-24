
import { AppointmentForm } from "@/app/(site)/services/AppointmentForm";
import { Container, PageHeader } from "@/components/ui/Layout";

export default function NewAppointmentPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Container className="py-12 sm:py-16">
        <PageHeader
          eyebrow="Online ward service"
          title="Book an appointment"
          description="Request a visit to Ward No. 9, Bholdhoka, Lalitpur."
        />

        <div className="mt-8">
          <AppointmentForm />
        </div>
      </Container>
    </div>
  );
}

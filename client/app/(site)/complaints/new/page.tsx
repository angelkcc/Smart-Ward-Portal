import type { Metadata } from "next";
import { ComplaintForm } from "@/components/complaints/ComplaintForm";
import { Container, PageHeader } from "@/components/ui/Layout";

export const metadata: Metadata = { title: "Submit a complaint" };

export default function NewComplaintPage() {
  return (
    <Container className="max-w-2xl py-10">
      <PageHeader
        eyebrow="Complaints"
        title="Submit a complaint"
        description="Tell the ward office about a problem in your area. You will be able to follow its status afterwards."
      />
      <ComplaintForm />
    </Container>
  );
}

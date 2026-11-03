import type { Metadata } from "next";
import { ComplaintsView } from "@/components/complaints/ComplaintsView";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container, PageHeader } from "@/components/ui/Layout";

export const metadata: Metadata = { title: "My complaints" };

export default function ComplaintsPage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Complaints"
        title="My complaints"
        description="Follow the complaints you have submitted to the ward office."
        actions={
          <ButtonLink href="/complaints/new">
            <Icon name="plus" className="h-5 w-5" />
            Submit a complaint
          </ButtonLink>
        }
      />
      <ComplaintsView />
    </Container>
  );
}

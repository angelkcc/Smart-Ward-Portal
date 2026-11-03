import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Feedback";
import { Container, PageHeader } from "@/components/ui/Layout";

export const metadata: Metadata = { title: "Development projects" };

/**
 * The backend has no development-project model or endpoint yet, so this page
 * is an honest placeholder. When a project API exists, replace the empty
 * state with a list fetched through a new `project.service.ts`.
 */
export default function ProjectsPage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Transparency"
        title="Development projects"
        description="Follow ward development work and how it is progressing."
      />
      <EmptyState
        icon="hammer"
        title="No project updates published yet"
        description="Project updates will appear here when the ward publishes them. Until then, please check the notices or ask at the ward office."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/notices">Read notices</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              View services
            </ButtonLink>
          </div>
        }
      />
    </Container>
  );
}

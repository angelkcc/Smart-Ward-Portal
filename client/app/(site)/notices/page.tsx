import type { Metadata } from "next";
import { NoticesView } from "@/components/notices/NoticesView";
import { Container, PageHeader } from "@/components/ui/Layout";

export const metadata: Metadata = { title: "Notices" };

export default function NoticesPage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Ward notices"
        title="Public notices"
        description="Announcements published by the ward office. You need to be logged in to read them."
      />
      <NoticesView />
    </Container>
  );
}

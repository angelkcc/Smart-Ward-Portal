
import { NoticesView } from "@/components/notices/NoticesView";
import { Container, PageHeader } from "@/components/ui/Layout";

export default function NoticesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Container className="py-12 sm:py-16">
        <div className="space-y-8">
          <PageHeader
            eyebrow="Ward communication"
            title="Ward Notices"
            description="Stay informed about announcements, public services, events, holidays, and important updates from Ward No. 9."
          />

          <NoticesView />
        </div>
      </Container>
    </div>
  );
}

import { NoticesAdmin } from "@/components/admin/NoticesAdmin";
import { PageHeader } from "@/components/ui/Layout";

export default function AdminNoticesPage() {
  return (
    <>
      <PageHeader
        title="Notices"
        description="Publish, edit and remove notices shown to citizens."
      />
      <NoticesAdmin />
    </>
  );
}

import { AdminOverview } from "@/components/admin/AdminOverview";
import { PageHeader } from "@/components/ui/Layout";

export default function AdminHomePage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="A live summary of complaints, departments and notices."
      />
      <AdminOverview />
    </>
  );
}

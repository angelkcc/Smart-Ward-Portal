import { AdminComplaints } from "@/components/admin/AdminComplaints";
import { PageHeader } from "@/components/ui/Layout";

export default function AdminComplaintsPage() {
  return (
    <>
      <PageHeader
        title="Complaints"
        description="Review complaints, assign them to departments and staff, and update their status."
      />
      <AdminComplaints />
    </>
  );
}

import { DepartmentsAdmin } from "@/components/admin/DepartmentsAdmin";
import { PageHeader } from "@/components/ui/Layout";

export default function AdminDepartmentsPage() {
  return (
    <>
      <PageHeader
        title="Departments"
        description="Departments that complaints can be assigned to."
      />
      <DepartmentsAdmin />
    </>
  );
}

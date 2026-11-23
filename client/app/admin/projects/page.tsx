import { ProjectsAdmin } from "@/components/admin/ProjectsAdmin";
import { PageHeader } from "@/components/ui/Layout";

export default function AdminProjectsPage() {
  return (
    <>
      <PageHeader
        title="Ward Projects"
        description="Add, update and manage development projects in your ward."
      />
      <ProjectsAdmin />
    </>
  );
}
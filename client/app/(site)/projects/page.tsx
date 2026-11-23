
import { ProjectsList } from "@/components/projects/ProjectsList";
import { Container } from "@/components/ui/Layout";

export default function ProjectsPage() {
  return (
    <section className="py-12">
      <Container>
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-900">
            Ward Development
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Our Projects
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Explore development projects and initiatives being carried out
            for the betterment of our community.
          </p>
        </div>

        <ProjectsList />
      </Container>
    </section>
  );
}

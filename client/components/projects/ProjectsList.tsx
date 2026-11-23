
"use client";

import { useFetch } from "@/hooks/useFetch";
import { listProjects } from "@/services/project.service";
import type { Project } from "@/types";

function getStatusLabel(status: Project["status"]) {
  switch (status) {
    case "PLANNED":
      return "Planned";
    case "ONGOING":
      return "Ongoing";
    case "COMPLETED":
      return "Completed";
    case "ON_HOLD":
      return "On Hold";
    default:
      return status;
  }
}

export function ProjectsList() {
  const { data, error, loading, reload } = useFetch(listProjects);

  if (loading) {
    return (
      <div className="py-12 text-center text-slate-500">
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-600">
          Unable to load projects. Please try again.
        </p>
        <button
          onClick={reload}
          className="rounded-lg bg-blue-900 px-5 py-2 text-white hover:bg-blue-800"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white py-12 text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          No projects available yet
        </h3>
        <p className="mt-2 text-slate-500">
          Ward development projects will appear here once published.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((project: Project) => (
        <article
          key={project._id}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
        >
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="h-48 w-full object-cover"
            />
          ) : (
            <div className="flex h-48 items-center justify-center bg-slate-100 text-slate-400">
              No project image
            </div>
          )}

          <div className="p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-900">
                {project.category}
              </span>

              <span className="text-xs font-semibold text-slate-600">
                {getStatusLabel(project.status)}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              {project.title}
            </h2>

            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
              {project.description}
            </p>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-800">Location:</span>{" "}
                {project.location}
              </p>

              {project.budget !== undefined && (
                <p>
                  <span className="font-medium text-slate-800">Budget:</span>{" "}
                  NPR {project.budget.toLocaleString("en-IN")}
                </p>
              )}
            </div>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">Progress</span>
                <span className="font-semibold text-blue-900">
                  {project.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-900"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

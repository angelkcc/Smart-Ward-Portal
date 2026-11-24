
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";
import { useToast } from "@/components/ui/Toast";
import { toApiError } from "@/lib/api";
import {
  createProject,
  updateProject,
} from "@/services/project.service";
import type { Project, ProjectInput, ProjectStatus } from "@/types";

interface ProjectFormProps {
  project?: Project;
  onCancel: () => void;
  onSaved: () => void;
}

const initialForm: ProjectInput = {
  title: "",
  description: "",
  category: "",
  location: "",
  budget: undefined,
  status: "PLANNED",
  progress: 0,
  start_date: "",
  expected_completion_date: "",
  image_url: "",
  published: true,
};

export function ProjectForm({
  project,
  onCancel,
  onSaved,
}: ProjectFormProps) {
  const toast = useToast();

  const [form, setForm] = useState<ProjectInput>(initialForm);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        description: project.description,
        category: project.category,
        location: project.location,
        budget: project.budget,
        status: project.status,
        progress: project.progress,
        start_date: project.start_date?.slice(0, 10) ?? "",
        expected_completion_date:
          project.expected_completion_date?.slice(0, 10) ?? "",
        image_url: project.image_url ?? "",
        published: project.published,
      });

      setImagePreview(project.image_url ?? "");
    } else {
      setForm(initialForm);
      setImagePreview("");
    }

    setSelectedImage(null);
  }, [project]);

  useEffect(() => {
    if (!selectedImage) return;

    const previewUrl = URL.createObjectURL(selectedImage);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedImage]);

  function updateField<K extends keyof ProjectInput>(
    field: K,
    value: ProjectInput[K],
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setSubmitError("Please select a JPG, PNG or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSubmitError("Image size must be less than 5MB.");
      event.target.value = "";
      return;
    }

    setSubmitError(null);
    setSelectedImage(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    if (
      !form.title?.trim() ||
      !form.description?.trim() ||
      !form.category?.trim() ||
      !form.location?.trim()
    ) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    if (
      form.progress === undefined ||
      form.progress < 0 ||
      form.progress > 100
    ) {
      setSubmitError("Progress must be between 0 and 100.");
      return;
    }

    const payload = new FormData();

    payload.append("title", form.title.trim());
    payload.append("description", form.description.trim());
    payload.append("category", form.category.trim());
    payload.append("location", form.location.trim());
    payload.append("status", form.status ?? "PLANNED");
    payload.append("progress", String(form.progress));
    payload.append("published", String(form.published ?? true));

    if (form.budget !== undefined && form.budget !== 0) {
      payload.append("budget", String(Number(form.budget)));
    }

    if (form.start_date) {
      payload.append("start_date", form.start_date);
    }

    if (form.expected_completion_date) {
      payload.append(
        "expected_completion_date",
        form.expected_completion_date,
      );
    }

    if (selectedImage) {
      payload.append("image", selectedImage);
    }

    setSubmitting(true);

    try {
      if (project) {
        await updateProject(project._id, payload);
        toast.success("Project updated successfully.");
      } else {
        await createProject(payload);
        toast.success("Project created successfully.");
      }

      onSaved();
    } catch (error) {
      setSubmitError(toApiError(error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitError && <Alert tone="error">{submitError}</Alert>}

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          Project title *
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="e.g. Road Construction at Bholdhoka"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          Description *
        </label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Describe the project and the work being carried out..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Category *
          </label>
          <input
            required
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="Infrastructure"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Location *
          </label>
          <input
            required
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="Bholdhoka, Ward No. 9"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Budget (NPR)
          </label>
          <input
            type="number"
            min="0"
            value={form.budget ?? ""}
            onChange={(e) =>
              updateField(
                "budget",
                e.target.value === "" ? undefined : Number(e.target.value),
              )
            }
            placeholder="2000000"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Status
          </label>
          <select
            value={form.status ?? "PLANNED"}
            onChange={(e) =>
              updateField("status", e.target.value as ProjectStatus)
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-600"
          >
            <option value="PLANNED">Planned</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="ON_HOLD">On hold</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          Progress: {form.progress ?? 0}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={form.progress ?? 0}
          onChange={(e) =>
            updateField("progress", Number(e.target.value))
          }
          className="w-full accent-blue-700"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Start date
          </label>
          <input
            type="date"
            value={form.start_date ?? ""}
            onChange={(e) => updateField("start_date", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Expected completion
          </label>
          <input
            type="date"
            value={form.expected_completion_date ?? ""}
            onChange={(e) =>
              updateField("expected_completion_date", e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-700">
          Project image
        </label>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
        />

        <p className="mt-1 text-xs text-slate-500">
          JPG, PNG or WEBP. Maximum size: 5MB.
        </p>

        {imagePreview && (
          <div className="mt-3">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Image preview
            </p>
            <img
              src={imagePreview}
              alt="Project preview"
              className="h-48 w-full rounded-lg border border-slate-200 object-cover sm:w-72"
            />
          </div>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={form.published ?? true}
          onChange={(e) => updateField("published", e.target.checked)}
          className="h-4 w-4 accent-blue-700"
        />
        Publish this project so citizens can see it
      </label>

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" loading={submitting}>
          {project ? "Save changes" : "Create project"}
        </Button>
      </div>
    </form>
  );
}

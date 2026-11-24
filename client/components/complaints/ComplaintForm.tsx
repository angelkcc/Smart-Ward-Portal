
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";
import { SelectField, TextArea, TextField } from "@/components/ui/Field";
import { Card } from "@/components/ui/Layout";
import { useToast } from "@/components/ui/Toast";
import { toApiError } from "@/lib/api";
import { complaintCategoryLabel } from "@/lib/format";
import { createComplaint } from "@/services/complaint.service";
import { hasErrors, type FieldErrors } from "@/lib/validation";
import { COMPLAINT_CATEGORIES, type ComplaintCategory } from "@/types";

type ComplaintField =
  | "title"
  | "category"
  | "location"
  | "description"
  | "image";

function Form() {
  const router = useRouter();
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ComplaintCategory | "">("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [errors, setErrors] = useState<FieldErrors<ComplaintField>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Generate image preview
  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [image]);

  // Handle image selection
  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        image: "Only JPG, PNG and WEBP images are allowed.",
      }));
      event.target.value = "";
      setImage(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        image: "Image size must be less than 5MB.",
      }));
      event.target.value = "";
      setImage(null);
      return;
    }

    setErrors((previous) => ({
      ...previous,
      image: undefined,
    }));

    setImage(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    // Same limits as the backend model
    const nextErrors: FieldErrors<ComplaintField> = {};

    if (title.trim().length < 3) {
      nextErrors.title =
        "Please write a short title (at least 3 characters).";
    }

    if (!category) {
      nextErrors.category = "Please choose a category.";
    }

    if (!location.trim()) {
      nextErrors.location =
        "Please tell us where the problem is.";
    }

    if (description.trim().length < 10) {
      nextErrors.description =
        "Please describe the problem in a little more detail (at least 10 characters).";
    }

    setErrors(nextErrors);
    setSubmitError(null);

    if (hasErrors(nextErrors) || !category) return;

    // Create FormData for text fields and image
    const payload = new FormData();

    payload.append("title", title.trim());
    payload.append("category", category);
    payload.append("location", location.trim());
    payload.append("description", description.trim());

    if (image) {
      payload.append("image", image);
    }

    setSubmitting(true);

    try {
      const created = await createComplaint(payload);

      toast.success("Your complaint has been submitted.");

      router.push(`/complaints/${created._id}`);
    } catch (error) {
      setSubmitError(toApiError(error).message);
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {submitError && (
          <Alert tone="error" title="Your complaint was not submitted">
            {submitError}
          </Alert>
        )}

        <TextField
          label="Title"
          hint="A short summary, for example: Broken streetlight near the school."
          required
          maxLength={150}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          error={errors.title}
        />

        <SelectField
          label="Category"
          required
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as ComplaintCategory | "")
          }
          error={errors.category}
        >
          <option value="">Choose a category…</option>
          {COMPLAINT_CATEGORIES.map((value) => (
            <option key={value} value={value}>
              {complaintCategoryLabel(value)}
            </option>
          ))}
        </SelectField>

        <TextField
          label="Location"
          hint="Street, landmark or area where the problem is."
          required
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          error={errors.location}
        />

        <TextArea
          label="Description"
          hint="Explain what is wrong and how long it has been a problem."
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          error={errors.description}
        />

        {/* Image upload */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Attach a photo (optional)
          </label>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
          />

          <p className="mt-1 text-xs text-slate-500">
            Upload a photo showing the problem. JPG, PNG or WEBP, maximum 5MB.
          </p>

          {errors.image && (
            <p className="mt-1 text-sm text-red-600">
              {errors.image}
            </p>
          )}

          {imagePreview && (
            <div className="mt-3">
              <p className="mb-2 text-sm font-medium text-slate-700">
                Selected photo preview
              </p>

              <img
                src={imagePreview}
                alt="Complaint evidence preview"
                className="h-48 w-full rounded-lg border border-slate-200 object-cover sm:w-72"
              />

              <button
                type="button"
                onClick={() => setImage(null)}
                className="mt-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove photo
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" size="lg" loading={submitting}>
            {submitting ? "Submitting…" : "Submit complaint"}
          </Button>

          <ButtonLink href="/complaints" variant="secondary" size="lg">
            Cancel
          </ButtonLink>
        </div>
      </form>
    </Card>
  );
}

export function ComplaintForm() {
  return (
    <RequireAuth>
      <Form />
    </RequireAuth>
  );
}

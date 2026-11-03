"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";
import { SelectField, TextArea, TextField } from "@/components/ui/Field";
import { Card } from "@/components/ui/Layout";
import { useToast } from "@/components/ui/Toast";
import { toApiError } from "@/lib/api";
import { complaintCategoryLabel } from "@/lib/format";
import { createComplaint } from "@/services/complaint.service";
import { hasErrors, isHttpUrl, type FieldErrors } from "@/lib/validation";
import { COMPLAINT_CATEGORIES, type ComplaintCategory } from "@/types";

type ComplaintField = "title" | "category" | "location" | "description" | "image";

function Form() {
  const router = useRouter();
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ComplaintCategory | "">("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState<FieldErrors<ComplaintField>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    // Same limits as the backend model: title >= 3, description >= 10.
    const nextErrors: FieldErrors<ComplaintField> = {};
    if (title.trim().length < 3)
      nextErrors.title = "Please write a short title (at least 3 characters).";
    if (!category) nextErrors.category = "Please choose a category.";
    if (!location.trim())
      nextErrors.location = "Please tell us where the problem is.";
    if (description.trim().length < 10)
      nextErrors.description =
        "Please describe the problem in a little more detail (at least 10 characters).";
    if (image.trim() && !isHttpUrl(image.trim()))
      nextErrors.image = "The image link must start with http:// or https://";
    setErrors(nextErrors);
    setSubmitError(null);
    if (hasErrors(nextErrors) || !category) return;

    setSubmitting(true);
    try {
      const created = await createComplaint({
        title: title.trim(),
        category,
        location: location.trim(),
        description: description.trim(),
        ...(image.trim() ? { image: image.trim() } : {}),
      });
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
        <TextField
          label="Photo link (optional)"
          type="url"
          inputMode="url"
          hint="Photo uploads are not available yet. If your photo is already online, paste its web address here."
          value={image}
          onChange={(event) => setImage(event.target.value)}
          error={errors.image}
        />
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

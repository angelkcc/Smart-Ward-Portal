"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";
import { CheckboxField, SelectField, TextArea, TextField } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { toApiError } from "@/lib/api";
import { noticeCategoryLabel } from "@/lib/format";
import { createNotice, updateNotice } from "@/services/notice.service";
import { hasErrors, type FieldErrors } from "@/lib/validation";
import { NOTICE_CATEGORIES, type Notice, type NoticeCategory } from "@/types";

type NoticeField = "title" | "description" | "category";

/** Create (no `notice`) or edit (with `notice`) a notice. */
export function NoticeForm({
  notice,
  onSaved,
  onCancel,
}: {
  notice?: Notice;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const toast = useToast();

  const [title, setTitle] = useState(notice?.title ?? "");
  const [description, setDescription] = useState(notice?.description ?? "");
  const [category, setCategory] = useState<NoticeCategory | "">(
    notice?.category ?? "",
  );
  const [published, setPublished] = useState(notice?.published ?? true);
  const [errors, setErrors] = useState<FieldErrors<NoticeField>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: FieldErrors<NoticeField> = {};
    if (title.trim().length < 3)
      nextErrors.title = "Title must be at least 3 characters.";
    if (description.trim().length < 10)
      nextErrors.description = "Text must be at least 10 characters.";
    if (!category) nextErrors.category = "Please choose a category.";
    setErrors(nextErrors);
    setSubmitError(null);
    if (hasErrors(nextErrors) || !category) return;

    const input = {
      title: title.trim(),
      description: description.trim(),
      category,
      published,
    };

    setSubmitting(true);
    try {
      if (notice) {
        await updateNotice(notice._id, input);
        toast.success("Notice updated.");
      } else {
        await createNotice(input);
        toast.success("Notice created.");
      }
      onSaved();
    } catch (error) {
      setSubmitError(toApiError(error).message);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {submitError && <Alert tone="error">{submitError}</Alert>}
      <TextField
        label="Title"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        error={errors.title}
      />
      <SelectField
        label="Category"
        required
        value={category}
        onChange={(event) => setCategory(event.target.value as NoticeCategory | "")}
        error={errors.category}
      >
        <option value="">Choose a category…</option>
        {NOTICE_CATEGORIES.map((value) => (
          <option key={value} value={value}>
            {noticeCategoryLabel(value)}
          </option>
        ))}
      </SelectField>
      <TextArea
        label="Notice text"
        required
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        error={errors.description}
      />
      <CheckboxField
        label="Published"
        hint="Only published notices are visible to citizens."
        checked={published}
        onChange={(event) => setPublished(event.target.checked)}
      />
      {!published && (
        <Alert tone="warning" title="Hidden from this list">
          The server only lists published notices, so an unpublished notice
          will disappear from this page and cannot be edited here afterwards.
        </Alert>
      )}
      <div className="flex flex-wrap justify-end gap-3 pt-2">
        <Button variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          {notice ? "Save changes" : "Publish notice"}
        </Button>
      </div>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";
import { CheckboxField, SelectField, TextArea, TextField } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toast";
import { toApiError } from "@/lib/api";
import { departmentCategoryLabel } from "@/lib/format";
import { createDepartment, updateDepartment } from "@/services/department.service";
import { EMAIL_PATTERN, hasErrors, type FieldErrors } from "@/lib/validation";
import {
  DEPARTMENT_CATEGORIES,
  type Department,
  type DepartmentCategory,
} from "@/types";

type DepartmentField = "name" | "description" | "category" | "contact_email";

/** Create (no `department`) or edit (with `department`) a department. */
export function DepartmentForm({
  department,
  onSaved,
  onCancel,
}: {
  department?: Department;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const toast = useToast();
  const editing = Boolean(department);

  const [name, setName] = useState(department?.name ?? "");
  const [description, setDescription] = useState(department?.description ?? "");
  const [category, setCategory] = useState<DepartmentCategory | "">(
    department?.category ?? "",
  );
  const [email, setEmail] = useState(department?.contact_email ?? "");
  const [phone, setPhone] = useState(department?.contact_phone ?? "");
  const [active, setActive] = useState(department?.active ?? true);
  const [errors, setErrors] = useState<FieldErrors<DepartmentField>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: FieldErrors<DepartmentField> = {};
    if (name.trim().length < 3)
      nextErrors.name = "Name must be at least 3 characters.";
    if (description.trim().length < 10)
      nextErrors.description = "Description must be at least 10 characters.";
    if (!category) nextErrors.category = "Please choose a category.";
    if (email.trim() && !EMAIL_PATTERN.test(email.trim()))
      nextErrors.contact_email = "Please enter a valid email address.";
    setErrors(nextErrors);
    setSubmitError(null);
    if (hasErrors(nextErrors) || !category) return;

    setSubmitting(true);
    try {
      if (department) {
        await updateDepartment(department._id, {
          name: name.trim(),
          description: description.trim(),
          category,
          contact_email: email.trim(),
          contact_phone: phone.trim(),
          active,
        });
        toast.success("Department updated.");
      } else {
        await createDepartment({
          name: name.trim(),
          description: description.trim(),
          category,
          ...(email.trim() ? { contact_email: email.trim() } : {}),
          ...(phone.trim() ? { contact_phone: phone.trim() } : {}),
        });
        toast.success("Department created.");
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
        label="Name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={errors.name}
      />
      <SelectField
        label="Category"
        required
        value={category}
        onChange={(event) => setCategory(event.target.value as DepartmentCategory | "")}
        error={errors.category}
      >
        <option value="">Choose a category…</option>
        {DEPARTMENT_CATEGORIES.map((value) => (
          <option key={value} value={value}>
            {departmentCategoryLabel(value)}
          </option>
        ))}
      </SelectField>
      <TextArea
        label="Description"
        required
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        error={errors.description}
        className="min-h-24"
      />
      <TextField
        label="Contact email (optional)"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={errors.contact_email}
      />
      <TextField
        label="Contact phone (optional)"
        type="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      {editing && (
        <CheckboxField
          label="Active"
          hint="Complaints can only be assigned to active departments."
          checked={active}
          onChange={(event) => setActive(event.target.checked)}
        />
      )}
      <div className="flex flex-wrap justify-end gap-3 pt-2">
        <Button variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          {editing ? "Save changes" : "Create department"}
        </Button>
      </div>
    </form>
  );
}

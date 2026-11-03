import { useId, type ReactNode } from "react";
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/format";

const CONTROL =
  "block w-full rounded-lg border bg-white px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-600 disabled:bg-slate-100";

function controlClass(error?: string) {
  return cn(CONTROL, error ? "border-red-500" : "border-slate-300");
}

interface WrapperProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

function FieldWrapper({ id, label, error, hint, required, children }: WrapperProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-base font-medium text-slate-800">
        {label}
        {required && (
          <span className="ml-1 text-red-700" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-slate-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

interface CommonProps {
  label: string;
  error?: string;
  hint?: string;
}

export function TextField({
  label,
  error,
  hint,
  required,
  className,
  ...rest
}: CommonProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint} required={required}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClass(error), className)}
        {...rest}
      />
    </FieldWrapper>
  );
}

export function TextArea({
  label,
  error,
  hint,
  required,
  className,
  ...rest
}: CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint} required={required}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClass(error), "min-h-32", className)}
        {...rest}
      />
    </FieldWrapper>
  );
}

export function SelectField({
  label,
  error,
  hint,
  required,
  className,
  children,
  ...rest
}: CommonProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint} required={required}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClass(error), className)}
        {...rest}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}

export function CheckboxField({
  label,
  hint,
  className,
  ...rest
}: { label: string; hint?: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>) {
  const id = useId();
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <input
        id={id}
        type="checkbox"
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="mt-1 h-5 w-5 rounded border-slate-400 accent-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        {...rest}
      />
      <div>
        <label htmlFor={id} className="text-base font-medium text-slate-800">
          {label}
        </label>
        {hint && (
          <p id={`${id}-hint`} className="text-sm text-slate-600">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}

/** A compact search / filter control that is not part of a form. */
export function FilterSelect({
  label,
  className,
  children,
  ...rest
}: { label: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select id={id} className={controlClass()} {...rest}>
        {children}
      </select>
    </div>
  );
}

export function SearchInput({
  label,
  className,
  ...rest
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input id={id} type="search" className={controlClass()} {...rest} />
    </div>
  );
}

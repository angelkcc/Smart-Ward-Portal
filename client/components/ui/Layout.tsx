import type { ReactNode } from "react";
import { cn } from "@/lib/format";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-teal-700">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-lg text-slate-600">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

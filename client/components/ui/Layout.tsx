
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
    <main
      className={cn(
        "mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </main>
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
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 sm:p-7",
        "hover:shadow-md",
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
    <div className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-800">
            {eyebrow}
          </p>
        )}

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 flex-wrap gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}

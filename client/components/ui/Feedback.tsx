import type { ReactNode } from "react";
import { Button, ButtonLink, Spinner } from "./Button";
import { Icon, type IconName } from "./Icon";
import { cn } from "@/lib/format";
import type { ApiError } from "@/lib/api";

type AlertTone = "error" | "success" | "info" | "warning";

const ALERT_STYLES: Record<AlertTone, { box: string; icon: IconName }> = {
  error: { box: "border-red-200 bg-red-50 text-red-900", icon: "alert" },
  success: {
    box: "border-green-200 bg-green-50 text-green-900",
    icon: "checkCircle",
  },
  info: { box: "border-blue-200 bg-blue-50 text-blue-900", icon: "info" },
  warning: { box: "border-amber-300 bg-amber-50 text-amber-900", icon: "alert" },
};

export function Alert({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: AlertTone;
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  const style = ALERT_STYLES[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-lg border p-4 text-base",
        style.box,
        className,
      )}
    >
      <Icon name={style.icon} className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

export function LoadingBlock({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-10 text-slate-700"
    >
      <Spinner className="h-5 w-5 text-teal-700" />
      <span>{label}</span>
    </div>
  );
}

export function EmptyState({
  icon = "document",
  title,
  description,
  action,
}: {
  icon?: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="mt-1 max-w-md text-base text-slate-600">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/**
 * Shows what went wrong in plain words and how to recover:
 * 401 -> ask the person to log in, 403 -> explain they lack permission,
 * anything else -> the server's message plus a retry button.
 */
export function ErrorState({
  error,
  onRetry,
  loginHref = "/login",
}: {
  error: ApiError;
  onRetry?: () => void;
  loginHref?: string;
}) {
  if (error.status === 401) {
    return (
      <EmptyState
        icon="lock"
        title="Please log in to continue"
        description="You need to be logged in to see this. Your session may have ended."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href={loginHref}>Log in</ButtonLink>
            <ButtonLink href="/register" variant="secondary">
              Create an account
            </ButtonLink>
          </div>
        }
      />
    );
  }

  if (error.status === 403) {
    return (
      <EmptyState
        icon="shield"
        title="You do not have access to this"
        description={error.message}
        action={
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        }
      />
    );
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <p className="text-lg font-semibold text-red-900">Something went wrong</p>
      <p className="mt-1 text-base text-red-900">{error.message}</p>
      {onRetry && (
        <Button className="mt-4" variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}


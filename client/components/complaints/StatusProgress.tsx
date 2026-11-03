import { Alert } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { complaintStatusLabel, cn } from "@/lib/format";
import type { ComplaintStatus } from "@/types";

const FLOW: ComplaintStatus[] = ["PENDING", "ASSIGNED", "IN_PROGRESS", "RESOLVED"];

/** Shows where a complaint is, using only the real status value from the server. */
export function StatusProgress({ status }: { status: ComplaintStatus }) {
  if (status === "REJECTED") {
    return (
      <Alert tone="error" title="This complaint was rejected">
        The ward office has closed this complaint without resolving it.
      </Alert>
    );
  }

  const currentIndex = FLOW.indexOf(status);
  return (
    <ol className="grid gap-3 sm:grid-cols-4" aria-label="Complaint progress">
      {FLOW.map((step, index) => {
        const done = index < currentIndex || status === "RESOLVED";
        const current = index === currentIndex && status !== "RESOLVED";
        return (
          <li
            key={step}
            aria-current={current ? "step" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-3 text-base",
              done && "border-green-200 bg-green-50 text-green-900",
              current && "border-blue-300 bg-blue-50 font-semibold text-blue-950",
              !done && !current && "border-slate-200 bg-white text-slate-500",
            )}
          >
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                done && "bg-green-700 text-white",
                current && "bg-blue-900 text-white",
                !done && !current && "bg-slate-200 text-slate-600",
              )}
            >
              {done ? <Icon name="checkCircle" className="h-4 w-4" /> : index + 1}
            </span>
            <span>
              {complaintStatusLabel(step)}
              <span className="sr-only">
                {done ? " — completed" : current ? " — current step" : " — not reached yet"}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

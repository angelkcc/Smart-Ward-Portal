import { Suspense } from "react";
import { ComplaintDetailRoute } from "@/components/complaints/ComplaintDetailRoute";
import { LoadingBlock } from "@/components/ui/Feedback";

export default function AdminComplaintDetailPage() {
  return (
    <div className="max-w-3xl">
      <Suspense fallback={<LoadingBlock label="Loading complaint…" />}>
        <ComplaintDetailRoute admin />
      </Suspense>
    </div>
  );
}

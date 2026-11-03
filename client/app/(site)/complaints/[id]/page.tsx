import type { Metadata } from "next";
import { Suspense } from "react";
import { ComplaintDetailRoute } from "@/components/complaints/ComplaintDetailRoute";
import { LoadingBlock } from "@/components/ui/Feedback";
import { Container } from "@/components/ui/Layout";

export const metadata: Metadata = { title: "Complaint" };

export default function ComplaintDetailPage() {
  return (
    <Container className="max-w-3xl py-10">
      <Suspense fallback={<LoadingBlock label="Loading complaint…" />}>
        <ComplaintDetailRoute />
      </Suspense>
    </Container>
  );
}

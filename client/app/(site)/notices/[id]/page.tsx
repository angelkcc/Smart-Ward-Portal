import type { Metadata } from "next";
import { Suspense } from "react";
import { NoticeDetail } from "@/components/notices/NoticeDetail";
import { LoadingBlock } from "@/components/ui/Feedback";
import { Container } from "@/components/ui/Layout";

export const metadata: Metadata = { title: "Notice" };

export default function NoticeDetailPage() {
  return (
    <Container className="max-w-3xl py-10">
      <Suspense fallback={<LoadingBlock label="Loading notice…" />}>
        <NoticeDetail />
      </Suspense>
    </Container>
  );
}

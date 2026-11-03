import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { AdminShell } from "@/components/layout/AdminShell";
import { LoadingBlock } from "@/components/ui/Feedback";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-xl px-4 py-16">
          <LoadingBlock label="Loading admin area…" />
        </div>
      }
    >
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}

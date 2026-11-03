"use client";

import { useParams } from "next/navigation";
import { ComplaintDetail } from "./ComplaintDetail";
import { RequireAuth } from "@/components/layout/RequireAuth";

/** Reads the :id from the URL for both the citizen and admin detail routes. */
export function ComplaintDetailRoute({ admin = false }: { admin?: boolean }) {
  const params = useParams<{ id: string }>();
  return (
    <RequireAuth>
      <ComplaintDetail id={params.id} admin={admin} />
    </RequireAuth>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState, LoadingBlock } from "@/components/ui/Feedback";
import { useAuth } from "@/context/AuthContext";

function LoginRequired() {
  const pathname = usePathname();
  return (
    <EmptyState
      icon="lock"
      title="Please log in to continue"
      description="This page is for registered users. Log in, or create a free account if you are new."
      action={
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href={`/login?next=${encodeURIComponent(pathname)}`}>
            Log in
          </ButtonLink>
          <ButtonLink href="/register" variant="secondary">
            Create an account
          </ButtonLink>
        </div>
      }
    />
  );
}

// usePathname() must sit inside <Suspense> in this version of Next.js.
function LoginPrompt() {
  return (
    <Suspense fallback={<LoadingBlock label="Loading…" />}>
      <LoginRequired />
    </Suspense>
  );
}

/**
 * Convenience guard for the UI only. The backend still checks the cookie on
 * every request, so hiding a page here is never the real protection.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingBlock label="Checking your session…" />;
  if (!user) return <LoginPrompt />;
  return <>{children}</>;
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <LoadingBlock label="Checking your session…" />;
  if (!user) return <LoginPrompt />;
  if (!isAdmin) {
    return (
      <EmptyState
        icon="shield"
        title="Administrators only"
        description="Your account does not have access to this area."
        action={
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        }
      />
    );
  }
  return <>{children}</>;
}

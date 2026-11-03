import { Suspense, type ReactNode } from "react";
import { Brand } from "@/components/layout/Brand";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";

// The header reads the current URL (to highlight the active link). Next.js
// requires that to sit inside <Suspense>; the fallback is a plain brand bar.
function HeaderFallback() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-3 sm:px-6">
        <Brand />
      </div>
    </header>
  );
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Suspense fallback={<HeaderFallback />}>
        <SiteHeader />
      </Suspense>
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

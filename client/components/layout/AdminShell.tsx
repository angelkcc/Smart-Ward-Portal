"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { RequireAdmin } from "./RequireAuth";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/format";

const ADMIN_NAV: Array<{ href: string; label: string; icon: IconName }> = [
  { href: "/admin", label: "Overview", icon: "grid" },
  { href: "/admin/complaints", label: "Complaints", icon: "chat" },
  { href: "/admin/departments", label: "Departments", icon: "building" },
  { href: "/admin/notices", label: "Notices", icon: "bell" },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      toast.success("You have been logged out.");
      router.push("/login");
    } catch {
      toast.error("We could not log you out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  // Until we know the person is an administrator, show no admin controls at all.
  if (loading || !user || !isAdmin) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-16">
        <RequireAdmin>{null}</RequireAdmin>
        <p className="mt-6 text-center">
          <Link
            href="/"
            className="text-base text-blue-900 underline underline-offset-4"
          >
            Go to the public site
          </Link>
        </p>
      </div>
    );
  }

  const nav = (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {ADMIN_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMenuOpen(false)}
          aria-current={isActive(pathname, item.href) ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-teal-400",
            isActive(pathname, item.href)
              ? "bg-white/15 text-white"
              : "text-blue-100 hover:bg-white/10",
          )}
        >
          <Icon name={item.icon} />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-blue-950 px-4 py-3 text-white md:hidden">
        <span className="text-lg font-bold">Ward administration</span>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="admin-menu"
          aria-label="Admin menu"
          className="rounded-lg p-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-teal-400"
        >
          <Icon name={menuOpen ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </div>

      <aside
        id="admin-menu"
        className={cn(
          "bg-blue-950 px-4 py-5 text-white md:sticky md:top-0 md:flex md:h-screen md:w-64 md:shrink-0 md:flex-col md:justify-between",
          menuOpen ? "block" : "hidden md:flex",
        )}
      >
        <div className="space-y-6">
          <div className="hidden md:block">
            <p className="text-lg font-bold">Ward administration</p>
            <p className="text-sm text-blue-200">Ward No. 9 · Bholdhoka</p>
          </div>
          {nav}
        </div>
        <div className="mt-6 space-y-3 border-t border-white/15 pt-4">
          <p className="truncate text-sm text-blue-100">{user.full_name}</p>
          <Link
            href="/"
            className="flex items-center gap-2 text-base text-blue-100 underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-teal-400"
          >
            <Icon name="external" className="h-4 w-4" />
            View public site
          </Link>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLogout}
            loading={loggingOut}
            className="w-full"
          >
            <Icon name="logout" className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      <main id="main" className="min-w-0 flex-1 px-4 py-8 sm:px-8">
        {children}
      </main>
    </div>
  );
}

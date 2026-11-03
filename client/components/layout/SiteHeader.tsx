"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Brand } from "./Brand";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import type { TranslationKey } from "@/i18n/dictionary";
import { cn } from "@/lib/format";

const NAV_ITEMS: Array<{ href: string; key: TranslationKey }> = [
  { href: "/", key: "nav.home" },
  { href: "/notices", key: "nav.notices" },
  { href: "/services", key: "nav.services" },
  { href: "/projects", key: "nav.projects" },
  { href: "/complaints", key: "nav.complaints" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const { t } = useI18n();
  const { user, loading, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      setMenuOpen(false);
      toast.success("You have been logged out.");
      router.push("/");
    } catch {
      toast.error("We could not log you out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  const accountActions = loading ? (
    <div className="h-11 w-40" aria-hidden="true" />
  ) : user ? (
    <>
      <span className="max-w-40 truncate text-base font-medium text-slate-800">
        {user.full_name}
      </span>
      {isAdmin && (
        <ButtonLink
          href="/admin"
          variant="secondary"
          size="sm"
          onClick={() => setMenuOpen(false)}
        >
          {t("nav.admin")}
        </ButtonLink>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        loading={loggingOut}
      >
        <Icon name="logout" className="h-4 w-4" />
        {t("nav.logout")}
      </Button>
    </>
  ) : (
    <>
      <ButtonLink
        href="/login"
        variant="secondary"
        size="sm"
        onClick={() => setMenuOpen(false)}
      >
        {t("nav.login")}
      </ButtonLink>
      <ButtonLink
        href="/register"
        size="sm"
        onClick={() => setMenuOpen(false)}
      >
        {t("nav.register")}
      </ButtonLink>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Brand onNavigate={() => setMenuOpen(false)} />

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 xl:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-teal-600",
                isActive(pathname, item.href)
                  ? "bg-blue-50 text-blue-950"
                  : "text-slate-700 hover:bg-slate-100",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSwitcher />
          {accountActions}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={t("nav.menu")}
          className="rounded-lg border border-slate-300 p-2.5 text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-teal-600 xl:hidden"
        >
          <Icon name={menuOpen ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 xl:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={
                  isActive(pathname, item.href) ? "page" : undefined
                }
                className={cn(
                  "rounded-lg px-3 py-3 text-lg font-medium focus-visible:outline-2 focus-visible:outline-teal-600",
                  isActive(pathname, item.href)
                    ? "bg-blue-50 text-blue-950"
                    : "text-slate-800 hover:bg-slate-100",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4">
            <LanguageSwitcher />
            {accountActions}
          </div>
        </div>
      )}
    </header>
  );
}

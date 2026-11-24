
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
    <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-100" />
  ) : user ? (
    <>
      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-900">
          {user.full_name?.charAt(0).toUpperCase() ?? "U"}
        </div>

        <span className="max-w-32 truncate text-sm font-semibold text-slate-800">
          {user.full_name}
        </span>
      </div>

      {isAdmin && (
        <ButtonLink
          href="/admin"
          variant="secondary"
          size="sm"
          onClick={() => setMenuOpen(false)}
        >
          <Icon name="grid" className="h-4 w-4" />
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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Brand onNavigate={() => setMenuOpen(false)} />

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 xl:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700",
                  active
                    ? "bg-blue-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-900",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Account Actions */}
        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <div className="mx-1 h-8 w-px bg-slate-200" />
          {accountActions}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={t("nav.menu")}
          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:bg-slate-50 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 xl:hidden"
        >
          <Icon
            name={menuOpen ? "close" : "menu"}
            className="h-5 w-5"
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-4 pb-5 pt-4 shadow-lg xl:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                    active
                      ? "bg-blue-900 text-white"
                      : "text-slate-700 hover:bg-blue-50 hover:text-blue-900",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
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

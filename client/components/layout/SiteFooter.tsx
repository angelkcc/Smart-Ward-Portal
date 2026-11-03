"use client";

import Link from "next/link";
import { Brand } from "./Brand";
import { useI18n } from "@/context/I18nContext";
import type { TranslationKey } from "@/i18n/dictionary";

const LINKS: Array<{ href: string; key: TranslationKey }> = [
  { href: "/notices", key: "nav.notices" },
  { href: "/services", key: "nav.services" },
  { href: "/projects", key: "nav.projects" },
  { href: "/complaints", key: "nav.complaints" },
  { href: "/login", key: "nav.login" },
  { href: "/register", key: "nav.register" },
];

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div className="space-y-4">
          <Brand />
          <p className="text-base text-slate-600">{t("footer.about")}</p>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold text-slate-900">
            {t("footer.links")}
          </h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base text-slate-700 underline-offset-4 hover:text-blue-900 hover:underline focus-visible:outline-2 focus-visible:outline-teal-600"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold text-slate-900">
            {t("footer.contact")}
          </h2>
          <p className="text-base text-slate-600">{t("footer.contactNote")}</p>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-sm text-slate-600 sm:px-6">
          {t("footer.lang")}
        </p>
      </div>
    </footer>
  );
}

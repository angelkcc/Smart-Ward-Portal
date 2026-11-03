"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useI18n } from "@/context/I18nContext";
import type { TranslationKey } from "@/i18n/dictionary";

// The four departments named in the case study of the Ward No. 9 Office.
const DEPARTMENTS: Array<{ key: TranslationKey; icon: IconName }> = [
  { key: "dept.administrative", icon: "building" },
  { key: "dept.account", icon: "wallet" },
  { key: "dept.engineering", icon: "wrench" },
  { key: "dept.registration", icon: "book" },
];

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="bg-blue-950 text-white">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-teal-200">
            <Icon name="pin" className="h-4 w-4" />
            {t("hero.badge")}
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-blue-100">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/services" variant="light" size="lg">
              {t("hero.cta.services")}
            </ButtonLink>
            <ButtonLink href="/notices" variant="outlineLight" size="lg">
              {t("hero.cta.notices")}
            </ButtonLink>
            <ButtonLink href="/complaints/new" variant="accent" size="lg">
              {t("hero.cta.complaint")}
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-xl">
          <h2 className="text-lg font-semibold text-blue-950">
            {t("hero.deptTitle")}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {DEPARTMENTS.map((dept) => (
              <li
                key={dept.key}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-800">
                  <Icon name={dept.icon} />
                </span>
                <span className="text-base font-medium">{t(dept.key)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-600">{t("hero.deptNote")}</p>
        </div>
      </div>
    </section>
  );
}

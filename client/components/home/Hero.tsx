
"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useI18n } from "@/context/I18nContext";
import type { TranslationKey } from "@/i18n/dictionary";

const DEPARTMENTS: Array<{ key: TranslationKey; icon: IconName }> = [
  { key: "dept.administrative", icon: "building" },
  { key: "dept.account", icon: "wallet" },
  { key: "dept.engineering", icon: "wrench" },
  { key: "dept.registration", icon: "book" },
];

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-teal-200">
            <Icon name="pin" className="h-4 w-4" />
            {t("hero.badge")}
          </p>

          <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
            {t("hero.subtitle")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/services" variant="light" size="lg">
              {t("hero.cta.services")}
              <Icon name="arrowRight" className="ml-2 h-4 w-4" />
            </ButtonLink>

            <ButtonLink href="/notices" variant="outlineLight" size="lg">
              <Icon name="bell" className="mr-2 h-4 w-4" />
              {t("hero.cta.notices")}
            </ButtonLink>

            <ButtonLink href="/complaints/new" variant="accent" size="lg">
              <Icon name="chat" className="mr-2 h-4 w-4" />
              {t("hero.cta.complaint")}
            </ButtonLink>
          
           {/* Appointment button */}
          <ButtonLink href="/appointments/new" variant="outlineLight" size="lg">
           <Icon name="clock" className="mr-2 h-4 w-4" />Book an Appointment
          </ButtonLink>
        </div>
       </div>
        <div className="rounded-3xl border border-white/15 bg-white p-6 text-slate-900 shadow-2xl shadow-black/20 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
              <Icon name="building" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
                Ward No. 9
              </p>
              <h2 className="text-xl font-bold text-slate-900">
                {t("hero.deptTitle")}
              </h2>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DEPARTMENTS.map((dept, index) => (
              <div
                key={dept.key}
                className="flex min-h-20 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
                  <Icon name={dept.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold leading-snug text-slate-800">
                  {t(dept.key)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-blue-50 px-4 py-3">
            <p className="text-sm leading-6 text-slate-600">
              {t("hero.deptNote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

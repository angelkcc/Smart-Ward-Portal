"use client";

import { Container } from "@/components/ui/Layout";
import { useI18n } from "@/context/I18nContext";
import type { TranslationKey } from "@/i18n/dictionary";

const STEPS: Array<{ title: TranslationKey; desc: TranslationKey }> = [
  { title: "how.1.title", desc: "how.1.desc" },
  { title: "how.2.title", desc: "how.2.desc" },
  { title: "how.3.title", desc: "how.3.desc" },
  { title: "how.4.title", desc: "how.4.desc" },
];

export function HowItWorks() {
  const { t } = useI18n();
  return (
    <section className="py-14">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {t("how.title")}
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-lg font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {t(step.title)}
              </h3>
              <p className="mt-1 text-base text-slate-600">{t(step.desc)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

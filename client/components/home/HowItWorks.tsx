
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
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
            Simple process
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("how.title")}
          </h2>
        </div>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900 text-lg font-bold text-white shadow-sm">
                  {index + 1}
                </span>
                <span className="text-3xl font-bold text-slate-200">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                {t(step.title)}
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                {t(step.desc)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

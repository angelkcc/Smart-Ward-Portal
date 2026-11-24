
"use client";

import { Container } from "@/components/ui/Layout";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useI18n } from "@/context/I18nContext";
import type { TranslationKey } from "@/i18n/dictionary";

const ITEMS: Array<{
  icon: IconName;
  title: TranslationKey;
  desc: TranslationKey;
}> = [
  { icon: "clock", title: "why.queues.title", desc: "why.queues.desc" },
  { icon: "chat", title: "why.track.title", desc: "why.track.desc" },
  { icon: "bell", title: "why.notices.title", desc: "why.notices.desc" },
  { icon: "hammer", title: "why.projects.title", desc: "why.projects.desc" },
];

export function WhyPortal() {
  const { t } = useI18n();

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
            Better public services
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("why.title")}
          </h2>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-800">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {t(item.title)}
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                {t(item.desc)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

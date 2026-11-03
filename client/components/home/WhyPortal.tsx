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
    <section className="bg-white py-14">
      <Container>
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900">
          {t("why.title")}
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <li key={item.title} className="space-y-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                {t(item.title)}
              </h3>
              <p className="text-base text-slate-600">{t(item.desc)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

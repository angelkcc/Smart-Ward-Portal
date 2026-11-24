
"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Layout";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useI18n } from "@/context/I18nContext";
import type { TranslationKey } from "@/i18n/dictionary";

const ITEMS: Array<{
  href: string;
  icon: IconName;
  title: TranslationKey;
  desc: TranslationKey;
}> = [
  {
    href: "/notices",
    icon: "bell",
    title: "quick.notices.title",
    desc: "quick.notices.desc",
  },
  {
    href: "/complaints/new",
    icon: "chat",
    title: "quick.complaint.title",
    desc: "quick.complaint.desc",
  },
  {
    href: "/complaints",
    icon: "clipboard",
    title: "quick.track.title",
    desc: "quick.track.desc",
  },
  {
    href: "/services",
    icon: "document",
    title: "quick.services.title",
    desc: "quick.services.desc",
  },
];

export function QuickServices() {
  const { t } = useI18n();

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
            Easy access
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("quick.title")}
          </h2>
        </div>

        <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-900 transition-colors group-hover:bg-blue-900 group-hover:text-white">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {t(item.title)}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
                  {t(item.desc)}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-blue-900">
                  Explore
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

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
    <section className="py-14">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {t("quick.title")}
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-800">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {t(item.title)}
                </h3>
                <p className="mt-1 flex-1 text-base text-slate-600">
                  {t(item.desc)}
                </p>
                <Icon
                  name="arrowRight"
                  className="mt-4 h-5 w-5 text-blue-900 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

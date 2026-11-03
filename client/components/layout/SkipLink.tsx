"use client";

import { useI18n } from "@/context/I18nContext";

export function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#main"
      className="sr-only rounded-lg bg-blue-900 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
    >
      {t("nav.skip")}
    </a>
  );
}

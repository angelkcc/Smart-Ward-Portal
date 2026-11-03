"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { useI18n } from "@/context/I18nContext";

export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-900 text-white">
        <Icon name="building" className="h-6 w-6" />
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-bold text-blue-950">
          {t("brand.name")}
        </span>
        <span className="block text-sm text-slate-600">{t("brand.sub")}</span>
      </span>
    </Link>
  );
}

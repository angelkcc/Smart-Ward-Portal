"use client";

import { useI18n, type Language } from "@/context/I18nContext";
import { cn } from "@/lib/format";

const OPTIONS: Array<{ value: Language; label: string; lang: string }> = [
  { value: "en", label: "English", lang: "en" },
  { value: "ne", label: "नेपाली", lang: "ne" },
];

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          lang={option.lang}
          aria-pressed={language === option.value}
          onClick={() => setLanguage(option.value)}
          className={cn(
            "min-h-9 rounded-md px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-teal-600",
            language === option.value
              ? "bg-blue-900 text-white"
              : "text-slate-700 hover:bg-slate-100",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

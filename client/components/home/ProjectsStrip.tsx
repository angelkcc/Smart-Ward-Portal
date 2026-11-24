
"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layout";
import { useI18n } from "@/context/I18nContext";

export function ProjectsStrip() {
  const { t } = useI18n();

  return (
    <section className="bg-slate-50 pb-16 sm:pb-20">
      <Container>
        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-900">
              <Icon name="hammer" className="h-7 w-7" />
            </span>

            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
                Ward development
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                {t("projects.title")}
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                {t("projects.desc")}
              </p>
            </div>
          </div>

          <ButtonLink href="/projects" variant="primary" size="lg">
            {t("projects.link")}
            <Icon name="arrowRight" className="ml-2 h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

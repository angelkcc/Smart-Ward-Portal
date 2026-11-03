"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layout";
import { useI18n } from "@/context/I18nContext";

/** No project data exists in the backend yet, so this is an honest pointer, not a fake list. */
export function ProjectsStrip() {
  const { t } = useI18n();
  return (
    <section className="pb-14">
      <Container>
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
              <Icon name="hammer" className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {t("projects.title")}
              </h2>
              <p className="text-base text-slate-600">{t("projects.desc")}</p>
            </div>
          </div>
          <ButtonLink href="/projects" variant="secondary">
            {t("projects.link")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { useI18n } from "@/context/I18nContext";

export function ComplaintCta() {
  const { t } = useI18n();
  return (
    <section className="pb-14">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-teal-800 p-8 text-white md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold">{t("cta.title")}</h2>
            <p className="mt-1 text-lg text-teal-50">{t("cta.desc")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/complaints/new" variant="light" size="lg">
              {t("cta.submit")}
            </ButtonLink>
            <ButtonLink href="/complaints" variant="outlineLight" size="lg">
              {t("cta.track")}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

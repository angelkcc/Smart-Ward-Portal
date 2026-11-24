
"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layout";
import { useI18n } from "@/context/I18nContext";

export function ComplaintCta() {
  const { t } = useI18n();

  return (
    <section className="bg-white pb-16 sm:pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-800 to-teal-700 px-6 py-10 text-white shadow-xl shadow-teal-900/10 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-teal-50">
                <Icon name="chat" className="h-4 w-4" />
                Citizen feedback
              </div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {t("cta.title")}
              </h2>

              <p className="mt-3 text-base leading-7 text-teal-50 sm:text-lg">
                {t("cta.desc")}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink
                href="/complaints/new"
                variant="light"
                size="lg"
              >
                {t("cta.submit")}
                <Icon name="arrowRight" className="ml-2 h-4 w-4" />
              </ButtonLink>

              <ButtonLink
                href="/complaints"
                variant="outlineLight"
                size="lg"
              >
                {t("cta.track")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

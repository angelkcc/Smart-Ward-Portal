
"use client";

import { NoticeCard } from "@/components/notices/NoticeCard";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState, ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { Container } from "@/components/ui/Layout";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { useFetch } from "@/hooks/useFetch";
import { listNotices } from "@/services/notice.service";

function NoticeList() {
  const { data, error, loading, reload } = useFetch(listNotices);
  const { t } = useI18n();

  if (loading) return <LoadingBlock label="Loading notices…" />;
  if (error) return <ErrorState error={error} onRetry={reload} />;

  if (!data || data.length === 0) {
    return <EmptyState icon="bell" title={t("notices.empty")} />;
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.slice(0, 3).map((notice) => (
        <li key={notice._id} className="h-full">
          <NoticeCard notice={notice} />
        </li>
      ))}
    </ul>
  );
}

export function LatestNotices() {
  const { t } = useI18n();
  const { user, loading } = useAuth();

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
              Stay informed
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t("notices.latest")}
            </h2>
            <p className="mt-2 max-w-xl text-base leading-7 text-slate-600">
              Stay updated with the latest announcements and information from your ward office.
            </p>
          </div>

          {user && (
            <ButtonLink href="/notices" variant="secondary">
              {t("notices.viewAll")}
              <span className="ml-2">
                <IconArrow />
              </span>
            </ButtonLink>
          )}
        </div>

        {loading ? (
          <LoadingBlock label="Loading…" />
        ) : user ? (
          <NoticeList />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
            <EmptyState
              icon="lock"
              title={t("notices.loginTitle")}
              description={t("notices.loginDesc")}
              action={
                <div className="flex flex-wrap justify-center gap-3">
                  <ButtonLink href="/login?next=/notices">
                    {t("nav.login")}
                  </ButtonLink>
                  <ButtonLink href="/register" variant="secondary">
                    {t("nav.register")}
                  </ButtonLink>
                </div>
              }
            />
          </div>
        )}
      </Container>
    </section>
  );
}

function IconArrow() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="inline-block h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M4 10h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

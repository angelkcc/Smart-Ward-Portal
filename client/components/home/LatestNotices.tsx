"use client";

import { NoticeCard } from "@/components/notices/NoticeCard";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState, ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { Container } from "@/components/ui/Layout";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { useFetch } from "@/hooks/useFetch";
import { listNotices } from "@/services/notice.service";

/**
 * The notices API requires a logged-in user, so we only call it once we know
 * someone is signed in. Visitors get a clear prompt instead of an error.
 */
function NoticeList() {
  const { data, error, loading, reload } = useFetch(listNotices);
  const { t } = useI18n();

  if (loading) return <LoadingBlock label="Loading notices…" />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (!data || data.length === 0) {
    return <EmptyState icon="bell" title={t("notices.empty")} />;
  }
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {data.slice(0, 3).map((notice) => (
        <li key={notice._id}>
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
    <section className="bg-white py-14">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {t("notices.latest")}
          </h2>
          {user && (
            <ButtonLink href="/notices" variant="secondary">
              {t("notices.viewAll")}
            </ButtonLink>
          )}
        </div>

        {loading ? (
          <LoadingBlock label="Loading…" />
        ) : user ? (
          <NoticeList />
        ) : (
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
        )}
      </Container>
    </section>
  );
}

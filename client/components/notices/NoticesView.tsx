"use client";

import { useMemo, useState } from "react";
import { NoticeCard } from "./NoticeCard";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Button } from "@/components/ui/Button";
import { EmptyState, ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { FilterSelect, SearchInput } from "@/components/ui/Field";
import { noticeCategoryLabel } from "@/lib/format";
import { useFetch } from "@/hooks/useFetch";
import { listNotices } from "@/services/notice.service";
import { NOTICE_CATEGORIES, type NoticeCategory } from "@/types";

function NoticesList() {
  const { data, error, loading, reload } = useFetch(listNotices);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<NoticeCategory | "ALL">("ALL");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (data ?? []).filter((notice) => {
      if (category !== "ALL" && notice.category !== category) return false;
      if (!term) return true;
      return (
        notice.title.toLowerCase().includes(term) ||
        notice.description.toLowerCase().includes(term)
      );
    });
  }, [data, search, category]);

  if (loading) return <LoadingBlock label="Loading notices…" />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon="bell"
        title="No notices yet"
        description="The ward office has not published any notices. Please check again later."
      />
    );
  }

  const filtersActive = search.trim() !== "" || category !== "ALL";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_14rem]">
        <SearchInput
          label="Search notices"
          placeholder="Type a word from the title or text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FilterSelect
          label="Category"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as NoticeCategory | "ALL")
          }
        >
          <option value="ALL">All categories</option>
          {NOTICE_CATEGORIES.map((value) => (
            <option key={value} value={value}>
              {noticeCategoryLabel(value)}
            </option>
          ))}
        </FilterSelect>
      </div>

      <p className="text-base text-slate-600" aria-live="polite">
        Showing {filtered.length} of {data.length} notices
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="No notices match your search"
          description="Try a different word or choose another category."
          action={
            filtersActive ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setSearch("");
                  setCategory("ALL");
                }}
              >
                Clear search and filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((notice) => (
            <li key={notice._id}>
              <NoticeCard notice={notice} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function NoticesView() {
  return (
    <RequireAuth>
      <NoticesList />
    </RequireAuth>
  );
}

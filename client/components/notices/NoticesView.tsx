
"use client";

import { useMemo, useState } from "react";
import { NoticeCard } from "./NoticeCard";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { Button } from "@/components/ui/Button";
import { EmptyState, ErrorState, LoadingBlock } from "@/components/ui/Feedback";
import { FilterSelect, SearchInput } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
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
      if (category !== "ALL" && notice.category !== category) {
        return false;
      }

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
      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12">
        <EmptyState
          icon="bell"
          title="No notices yet"
          description="The ward office has not published any notices. Please check again later."
        />
      </div>
    );
  }

  const filtersActive = search.trim() !== "" || category !== "ALL";

  return (
    <div className="space-y-7">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
            <Icon name="search" className="h-5 w-5" />
          </span>

          <div>
            <h2 className="font-bold text-slate-900">Find a notice</h2>
            <p className="text-sm text-slate-500">
              Search announcements or filter by category.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_14rem]">
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
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-600" aria-live="polite">
          Showing{" "}
          <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
          of <span className="font-bold text-slate-900">{data.length}</span>{" "}
          notices
        </p>

        {filtersActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch("");
              setCategory("ALL");
            }}
          >
            <Icon name="close" className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12">
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
        </div>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((notice) => (
            <li key={notice._id} className="h-full">
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

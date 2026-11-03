"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError, toApiError } from "@/lib/api";

interface FetchState<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
}

/**
 * Loads data when the component mounts (and again on `reload`).
 * `fetcher` must be a stable reference: a module-level function or a
 * `useCallback`, otherwise it would refetch on every render.
 */
export function useFetch<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, error: null, loading: false });
      })
      .catch((error: unknown) => {
        if (!cancelled)
          setState({ data: null, error: toApiError(error), loading: false });
      });
    return () => {
      cancelled = true;
    };
  }, [fetcher, attempt]);

  const reload = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: null }));
    setAttempt((n) => n + 1);
  }, []);

  return { ...state, reload };
}

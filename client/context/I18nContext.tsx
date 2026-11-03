"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { en, ne, type TranslationKey } from "@/i18n/dictionary";

export type Language = "en" | "ne";

const STORAGE_KEY = "ward-portal-language";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Language {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "ne" ? "ne" : "en";
  } catch {
    return "en";
  }
}

// The server (and the first client render) always start in English, so there
// is no hydration mismatch; the saved choice is applied right after.
function getServerSnapshot(): Language {
  return "en";
}

interface I18nValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setLanguage = useCallback((next: Language) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the switch just will not persist.
    }
    listeners.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nValue>(() => {
    const dictionary: Record<TranslationKey, string> =
      language === "ne" ? ne : en;
    return {
      language,
      setLanguage,
      t: (key) => dictionary[key],
    };
  }, [language, setLanguage]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside <I18nProvider>");
  return context;
}

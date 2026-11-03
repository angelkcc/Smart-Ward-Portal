"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/format";

type ToastTone = "success" | "error";

interface ToastItem {
  id: number;
  tone: ToastTone;
  message: string;
}

interface ToastApi {
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (tone: ToastTone, message: string) => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, tone, message }]);
      window.setTimeout(() => dismiss(id), 6000);
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({
      success: (message) => push("success", message),
      error: (message) => push("error", message),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role={toast.tone === "error" ? "alert" : "status"}
            className={cn(
              "pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-lg border px-4 py-3 text-base shadow-lg",
              toast.tone === "success"
                ? "border-green-200 bg-green-50 text-green-900"
                : "border-red-200 bg-red-50 text-red-900",
            )}
          >
            <Icon
              name={toast.tone === "success" ? "checkCircle" : "alert"}
              className="mt-0.5 h-5 w-5 shrink-0"
            />
            <p className="flex-1">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss message"
              className="rounded p-0.5 hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-teal-600"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>");
  return context;
}

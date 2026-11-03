"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "@/lib/format";

/**
 * Accessible dialog built on the native <dialog> element, which gives us
 * focus trapping, the Escape key and a backdrop for free.
 * The children are only rendered while open, so forms start fresh each time.
 */
export function Modal({
  open,
  title,
  onClose,
  children,
  wide = false,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      aria-label={title}
      className={cn(
        "m-auto w-[calc(100%-2rem)] rounded-xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-900/50",
        wide ? "max-w-2xl" : "max-w-lg",
      )}
    >
      {open && (
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-teal-600"
            >
              <Icon name="close" />
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  busy = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal open={open} title={title} onClose={busy ? () => {} : onCancel}>
      <div className="space-y-5">
        <div className="text-base text-slate-700">{message}</div>
        <div className="flex flex-wrap justify-end gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={busy}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

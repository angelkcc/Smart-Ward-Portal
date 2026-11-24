
"use client";

import { useState } from "react";
import { CheckboxField } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";

export function DocumentChecklist({
  documents,
}: {
  documents: Array<{ name: string; note?: string }>;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const done = documents.filter((doc) => checked[doc.name]).length;
  const progress =
    documents.length > 0 ? (done / documents.length) * 100 : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
          <Icon name="clipboard" className="h-5 w-5" />
        </span>

        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Document checklist
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Make sure you have everything ready before visiting the ward office.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-slate-700">
            Preparation progress
          </span>
          <span className="font-bold text-blue-900" aria-live="polite">
            {done}/{documents.length} ready
          </span>
        </div>

        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Document preparation progress"
          aria-valuemin={0}
          aria-valuemax={documents.length}
          aria-valuenow={done}
        >
          <div
            className="h-full rounded-full bg-teal-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {documents.map((doc) => (
          <li
            key={doc.name}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/50"
          >
            <CheckboxField
              label={doc.name}
              hint={doc.note}
              checked={Boolean(checked[doc.name])}
              onChange={(event) =>
                setChecked((current) => ({
                  ...current,
                  [doc.name]: event.target.checked,
                }))
              }
            />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-start gap-2 rounded-xl bg-amber-50 p-4">
        <Icon
          name="info"
          className="mt-0.5 h-4 w-4 shrink-0 text-amber-700"
        />
        <p className="text-xs leading-6 text-amber-900">
          This checklist is only for your personal preparation. Your selections
          are not saved or submitted to the ward office.
        </p>
      </div>
    </div>
  );
}

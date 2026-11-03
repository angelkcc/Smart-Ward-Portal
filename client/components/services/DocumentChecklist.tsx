"use client";

import { useState } from "react";
import { CheckboxField } from "@/components/ui/Field";

/**
 * A personal "have I got everything?" list. Ticks live only in this browser
 * tab: nothing is saved, sent or submitted to the ward office.
 */
export function DocumentChecklist({
  documents,
}: {
  documents: Array<{ name: string; note?: string }>;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const done = documents.filter((doc) => checked[doc.name]).length;

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-700" aria-live="polite">
        {done} of {documents.length} ready — for your own preparation only.
        This is not submitted anywhere.
      </p>
      <ul className="space-y-3">
        {documents.map((doc) => (
          <li key={doc.name}>
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
    </div>
  );
}

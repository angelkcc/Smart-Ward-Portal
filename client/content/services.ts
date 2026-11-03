import type { IconName } from "@/components/ui/Icon";

/**
 * Service guidance content.
 *
 * ONLY the four department names come from the Ward No. 9 case study. The
 * one-line summaries are deliberately generic. `documents` is empty on
 * purpose: nothing here may be presented as an official requirement until
 * the ward office confirms it. When you have verified checklists from the
 * case-study report, add them below and the Services page will show them.
 *
 *   documents: [
 *     { name: "Citizenship certificate (copy)", note: "Original for checking" },
 *   ],
 */
export interface ServiceDepartment {
  id: string;
  name: string;
  icon: IconName;
  summary: string;
  documents: Array<{ name: string; note?: string }>;
}

export const SERVICE_DEPARTMENTS: ServiceDepartment[] = [
  {
    id: "administrative",
    name: "Administrative",
    icon: "building",
    summary: "General ward administration and enquiries.",
    documents: [],
  },
  {
    id: "account",
    name: "Account",
    icon: "wallet",
    summary: "Ward accounts and payment-related matters.",
    documents: [],
  },
  {
    id: "engineering",
    name: "Engineering",
    icon: "wrench",
    summary: "Infrastructure and technical matters.",
    documents: [],
  },
  {
    id: "registration",
    name: "Registration",
    icon: "book",
    summary: "Registration of records.",
    documents: [],
  },
];

/** What the portal can really do today (matches the existing backend). */
export const ONLINE_SERVICES: Array<{
  href: string;
  icon: IconName;
  title: string;
  description: string;
}> = [
  {
    href: "/complaints/new",
    icon: "chat",
    title: "Submit a complaint",
    description:
      "Report a problem with a title, category, location and description. Requires a free account.",
  },
  {
    href: "/complaints",
    icon: "clipboard",
    title: "Track your complaints",
    description:
      "See the status, department and assigned staff member for complaints you submitted.",
  },
  {
    href: "/notices",
    icon: "bell",
    title: "Read ward notices",
    description: "Announcements published by the ward office.",
  },
];

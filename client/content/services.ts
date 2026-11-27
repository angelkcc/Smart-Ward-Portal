import type { IconName } from "@/components/ui/Icon";


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

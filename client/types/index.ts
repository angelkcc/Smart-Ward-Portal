/**
 * Types that mirror the real backend (Server/src/models and Server/src/types).
 * Enum values are copied exactly from the backend enums.
 */

export const ROLES = ["CITIZEN", "ADMIN"] as const;
export type Role = (typeof ROLES)[number];

export const COMPLAINT_CATEGORIES = [
  "ROADS",
  "WATER_SUPPLY",
  "SANITATION",
  "DRAINAGE",
  "STREETLIGHTS",
  "ELECTRICITY",
  "OTHER",
] as const;
export type ComplaintCategory = (typeof COMPLAINT_CATEGORIES)[number];

export const COMPLAINT_STATUSES = [
  "PENDING",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
  "REJECTED",
] as const;
export type ComplaintStatus = (typeof COMPLAINT_STATUSES)[number];

export const DEPARTMENT_CATEGORIES = [
  "ROADS",
  "WATER_SUPPLY",
  "SANITATION",
  "DRAINAGE",
  "ELECTRICITY",
  "ADMINISTRATION",
  "OTHER",
] as const;
export type DepartmentCategory = (typeof DEPARTMENT_CATEGORIES)[number];

export const NOTICE_CATEGORIES = [
  "GENERAL",
  "HEALTH",
  "EDUCATION",
  "EVENT",
  "EMERGENCY",
  "ROAD",
  "WATER",
] as const;
export type NoticeCategory = (typeof NOTICE_CATEGORIES)[number];

/** Every successful backend response is wrapped like this (SendResponse util). */
export interface ApiEnvelope<T> {
  message: string;
  data: T;
  success?: boolean;
  status?: string;
}

export interface User {
  _id: string;
  full_name: string;
  email: string;
  role: Role;
  phone_number?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/** Shape of a user after the backend runs `.populate("created_by", "full_name email")`. */
export interface UserRef {
  _id: string;
  full_name: string;
  email: string;
}

export interface Notice {
  _id: string;
  title: string;
  description: string;
  category: NoticeCategory;
  published: boolean;
  created_by: UserRef | string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  _id: string;
  name: string;
  description: string;
  category: DepartmentCategory;
  contact_email?: string | null;
  contact_phone?: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Complaint {
  _id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  image?: string | null;
  status: ComplaintStatus;
  created_by: UserRef | string | null;
  assigned_to: UserRef | string | null;
  department: Department | string | null;
  createdAt: string;
  updatedAt: string;
}

/* ---------- Request bodies (exact field names the backend reads) ---------- */

export interface RegisterInput {
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface LoginResult {
  user: User;
  access_token: string;
}

export interface CreateComplaintInput {
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  image?: string;
}

export interface NoticeInput {
  title: string;
  description: string;
  category: NoticeCategory;
  published: boolean;
}

export interface DepartmentInput {
  name: string;
  description: string;
  category: DepartmentCategory;
  contact_email?: string;
  contact_phone?: string;
  /** Only the update endpoint reads this field. */
  active?: boolean;
}

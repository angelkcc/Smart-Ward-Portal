/**
 * Client-side checks that mirror the backend rules, so people see helpful
 * messages. The backend validators remain the real authority — its
 * "Validation error" response does not say which field failed.
 */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface PasswordRule {
  id: string;
  label: string;
  test: (value: string) => boolean;
}

/** Same rules as registerValidatorSchema in Server/src/validators/auth.validator.ts */
export const PASSWORD_RULES: PasswordRule[] = [
  { id: "length", label: "At least 6 characters", test: (v) => v.length >= 6 },
  { id: "upper", label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "lower", label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { id: "number", label: "One number", test: (v) => /[0-9]/.test(v) },
  {
    id: "special",
    label: "One special character (for example ! @ # $)",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];

export function isPhoneNumber(value: string): boolean {
  return /^\d{10}$/.test(value);
}

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

export function hasErrors(errors: object): boolean {
  return Object.keys(errors).length > 0;
}

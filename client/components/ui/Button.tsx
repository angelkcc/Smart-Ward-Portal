import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/format";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "danger"
  | "ghost"
  | "light"
  | "outlineLight";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-blue-900 text-white hover:bg-blue-800 active:bg-blue-950",
  secondary:
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100",
  accent: "bg-teal-700 text-white hover:bg-teal-800 active:bg-teal-900",
  danger: "bg-red-700 text-white hover:bg-red-800 active:bg-red-900",
  ghost: "text-slate-700 hover:bg-slate-100 active:bg-slate-200",
  // For use on dark (navy) backgrounds
  light: "bg-white text-blue-950 hover:bg-blue-50 active:bg-blue-100",
  outlineLight:
    "border border-white/70 text-white hover:bg-white/10 active:bg-white/20",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-base",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export function Spinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        className="opacity-25"
      />
      <path
        d="M4 12a8 8 0 018-8"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="opacity-90"
      />
    </svg>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses(variant, size, className)}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...rest} />;
}

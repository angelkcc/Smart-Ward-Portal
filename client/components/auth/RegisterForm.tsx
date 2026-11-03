"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";
import { TextField } from "@/components/ui/Field";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Layout";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { toApiError } from "@/lib/api";
import { cn } from "@/lib/format";
import { readSafeNextPath } from "@/lib/redirect";
import * as authService from "@/services/auth.service";
import {
  EMAIL_PATTERN,
  PASSWORD_RULES,
  hasErrors,
  isPhoneNumber,
  type FieldErrors,
} from "@/lib/validation";

type RegisterField =
  | "full_name"
  | "email"
  | "phone_number"
  | "password"
  | "confirm";

function friendlyRegisterError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("e11000") || lower.includes("duplicate")) {
    return "An account with this email address already exists. Try logging in instead.";
  }
  if (lower.includes("validation")) {
    return "Some of your details were not accepted. Please check the password rules and the phone number.";
  }
  return message;
}

export function RegisterForm() {
  const router = useRouter();
  const toast = useToast();
  const { t } = useI18n();
  const { user, login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<FieldErrors<RegisterField>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: FieldErrors<RegisterField> = {};
    if (fullName.trim().length < 3)
      nextErrors.full_name = "Please enter your full name (at least 3 letters).";
    if (!EMAIL_PATTERN.test(email.trim()))
      nextErrors.email = "Please enter a valid email address.";
    if (!isPhoneNumber(phone.trim()))
      nextErrors.phone_number = "Phone number must be exactly 10 digits, numbers only.";
    if (!PASSWORD_RULES.every((rule) => rule.test(password)))
      nextErrors.password = "Your password does not meet all the rules below.";
    if (confirm !== password)
      nextErrors.confirm = "The two passwords do not match.";
    setErrors(nextErrors);
    setSubmitError(null);
    if (hasErrors(nextErrors)) return;

    setSubmitting(true);
    try {
      await authService.register({
        full_name: fullName.trim(),
        email: email.trim(),
        password,
        phone_number: phone.trim(),
      });
    } catch (error) {
      setSubmitError(friendlyRegisterError(toApiError(error).message));
      setSubmitting(false);
      return;
    }

    // The account exists now, so sign in straight away.
    try {
      const signedIn = await login(email.trim(), password);
      toast.success(`Your account is ready. Welcome, ${signedIn.full_name}.`);
      router.push(readSafeNextPath() ?? "/");
    } catch {
      toast.success("Your account was created. Please log in.");
      router.push("/login");
    } finally {
      setSubmitting(false);
    }
  }

  if (user && !submitting) {
    return (
      <Card className="space-y-4">
        <Alert tone="info" title={`You are already logged in as ${user.full_name}.`} />
        <ButtonLink href="/">Go to home</ButtonLink>
      </Card>
    );
  }

  return (
    <Card className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {t("auth.registerTitle")}
        </h1>
        <p className="mt-1 text-base text-slate-600">
          {t("auth.registerSubtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {submitError && <Alert tone="error">{submitError}</Alert>}
        <TextField
          label={t("auth.fullName")}
          autoComplete="name"
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          error={errors.full_name}
        />
        <TextField
          label={t("auth.email")}
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
        <TextField
          label={t("auth.phone")}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value.replace(/\D/g, ""))}
          error={errors.phone_number}
        />
        <div className="space-y-3">
          <TextField
            label={t("auth.password")}
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
          />
          <ul className="space-y-1 text-sm" aria-label="Password rules">
            {PASSWORD_RULES.map((rule) => {
              const met = rule.test(password);
              return (
                <li
                  key={rule.id}
                  className={cn(
                    "flex items-center gap-2",
                    met ? "text-green-800" : "text-slate-600",
                  )}
                >
                  <Icon
                    name={met ? "checkCircle" : "info"}
                    className="h-4 w-4 shrink-0"
                  />
                  {rule.label}
                  <span className="sr-only">{met ? " — done" : " — not yet"}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <TextField
          label={t("auth.confirm")}
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          error={errors.confirm}
        />
        <Button type="submit" size="lg" loading={submitting} className="w-full">
          {submitting ? t("auth.creating") : t("auth.registerBtn")}
        </Button>
      </form>

      <p className="text-center text-base text-slate-700">
        {t("auth.haveAccount")}{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-900 underline underline-offset-4"
        >
          {t("auth.loginBtn")}
        </Link>
      </p>
    </Card>
  );
}

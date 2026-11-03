"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Feedback";
import { TextField } from "@/components/ui/Field";
import { Card } from "@/components/ui/Layout";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { toApiError } from "@/lib/api";
import { readSafeNextPath } from "@/lib/redirect";
import { EMAIL_PATTERN, hasErrors, type FieldErrors } from "@/lib/validation";

type LoginField = "email" | "password";

export function LoginForm() {
  const router = useRouter();
  const toast = useToast();
  const { t } = useI18n();
  const { user, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors<LoginField>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: FieldErrors<LoginField> = {};
    if (!email.trim()) nextErrors.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(email.trim()))
      nextErrors.email = "Please enter a valid email address.";
    if (!password) nextErrors.password = "Please enter your password.";
    setErrors(nextErrors);
    setSubmitError(null);
    if (hasErrors(nextErrors)) return;

    setSubmitting(true);
    try {
      const signedIn = await login(email.trim(), password);
      toast.success(`Welcome, ${signedIn.full_name}.`);
      const next = readSafeNextPath();
      router.push(next ?? (signedIn.role === "ADMIN" ? "/admin" : "/"));
    } catch (error) {
      setSubmitError(toApiError(error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (user && !submitting) {
    return (
      <Card className="space-y-4">
        <Alert tone="success" title={`You are logged in as ${user.full_name}.`} />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/">Go to home</ButtonLink>
          <ButtonLink href="/complaints" variant="secondary">
            My complaints
          </ButtonLink>
        </div>
      </Card>
    );
  }

  return (
    <Card className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {t("auth.loginTitle")}
        </h1>
        <p className="mt-1 text-base text-slate-600">
          {t("auth.loginSubtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {submitError && <Alert tone="error">{submitError}</Alert>}
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
          label={t("auth.password")}
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        <Button type="submit" size="lg" loading={submitting} className="w-full">
          {submitting ? t("auth.loggingIn") : t("auth.loginBtn")}
        </Button>
      </form>

      <p className="text-center text-base text-slate-700">
        {t("auth.noAccount")}{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-900 underline underline-offset-4"
        >
          {t("auth.createAccount")}
        </Link>
      </p>
    </Card>
  );
}

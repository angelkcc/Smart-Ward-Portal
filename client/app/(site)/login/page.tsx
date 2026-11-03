import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { Container } from "@/components/ui/Layout";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <Container className="max-w-md py-12">
      <LoginForm />
    </Container>
  );
}

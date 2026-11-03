import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Container } from "@/components/ui/Layout";

export const metadata: Metadata = { title: "Create an account" };

export default function RegisterPage() {
  return (
    <Container className="max-w-lg py-12">
      <RegisterForm />
    </Container>
  );
}

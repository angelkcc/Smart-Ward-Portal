import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { AuthProvider } from "@/context/AuthContext";
import { I18nProvider } from "@/context/I18nContext";

export const metadata: Metadata = {
  title: {
    default: "Smart Ward Portal",
    template: "%s · Smart Ward Portal",
  },
  description:
    "Ward notices, complaints and service guidance for Ward No. 9, Bholdhoka, Lalitpur, Nepal.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <I18nProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

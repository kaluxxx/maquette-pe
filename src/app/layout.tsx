import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConditionalLayout } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cyna-IT | Solutions de Cybersécurité SaaS",
    template: "%s | Cyna-IT",
  },
  description:
    "Plateforme e-commerce de solutions de cybersécurité SaaS. SOC, EDR, XDR et plus encore pour protéger votre entreprise.",
  keywords: ["cybersécurité", "SaaS", "SOC", "EDR", "XDR", "sécurité informatique", "protection entreprise"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ConditionalLayout isLoggedIn={false} cartItemsCount={2}>
          {children}
        </ConditionalLayout>
        <Toaster />
      </body>
    </html>
  );
}

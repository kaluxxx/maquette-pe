"use client";

import { usePathname } from "next/navigation";
import { Header, Footer } from "@/components/layout";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  cartItemsCount?: number;
}

export function ConditionalLayout({
  children,
  isLoggedIn = false,
  cartItemsCount = 0
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} cartItemsCount={cartItemsCount} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

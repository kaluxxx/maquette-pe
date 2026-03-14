"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // La page de login admin n'a pas besoin de la sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (role !== "admin" && role !== "superadmin") {
        router.push("/");
      } else {
        setAuthorized(true);
      }
    }
  }, [user, role, loading, router]);

  if (loading || !authorized) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg lg:pl-64 flex flex-col pt-16 lg:pt-0 pb-10">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto fade-up">
          {children}
        </div>
      </main>
    </div>
  );
}

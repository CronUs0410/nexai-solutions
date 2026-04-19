"use client";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/Toast";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminSetup() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const makeMeSuperAdmin = async () => {
    if (!user) {
      addToast("You must be logged in first", "error");
      return;
    }
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        role: "superadmin"
      });
      addToast("Successfully upgraded to superadmin! Redirecting...", "success");
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (error) {
      addToast(error.message, "error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card p-10 rounded-2xl border border-border relative z-10 shadow-2xl text-center">
        <h2 className="text-2xl font-bold text-text mb-4">Admin Setup Helper</h2>
        <p className="text-muted mb-8">
          This page only works if you are logged in and your current role is &quot;user&quot;.
          It will upgrade you to superadmin.
        </p>
        <button
          onClick={makeMeSuperAdmin}
          disabled={loading || !user}
          className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-bold rounded-md text-bg bg-primary hover:bg-primary-lt transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Upgrading..." : "Make Me SuperAdmin"}
        </button>
        <p className="text-red-500 text-sm mt-4 font-bold">
          IMPORTANT: After using this page once, DELETE this file completely for security.
          This is only for initial setup.
        </p>
      </div>
    </div>
  );
}

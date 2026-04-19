"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Dashboard", href: "/admin", icon: "🏠" },
    { name: "Services", href: "/admin/services", icon: "⚙️" },
    { name: "Admins", href: "/admin/admins", icon: "👥" },
    { name: "Settings", href: "/admin/settings", icon: "🔧" }
  ];

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  const navContent = (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-6 border-b border-border">
        <Link href="/" className="text-2xl font-heading font-extrabold tracking-tight">
          Nex<span className="text-primary">AI</span> Admin
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {links.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${
                isActive 
                  ? "bg-primary text-bg shadow-lg scale-[1.02]" 
                  : "text-muted hover:bg-surface hover:text-primary hover:scale-[1.02]"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-text truncate">{user?.displayName || "Admin User"}</p>
            <p className="text-xs text-muted truncate">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded border border-red-500 text-red-500 hover:bg-red-500/10 font-bold transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-4 z-40">
        <Link href="/" className="text-xl font-heading font-extrabold tracking-tight">
          Nex<span className="text-primary">AI</span>
        </Link>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-text hover:text-primary p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 z-30">
        {navContent}
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-bg/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-card h-full">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}

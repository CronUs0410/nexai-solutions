"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, role } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-surface/80 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-extrabold tracking-tight">
          Nex<span className="text-primary">AI</span> Solutions
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-body hover:text-primary transition-colors hover:scale-105">Home</Link>
          <a href="#services" className="text-sm font-body hover:text-primary transition-colors hover:scale-105">Services</a>
          <a href="#how-it-works" className="text-sm font-body hover:text-primary transition-colors hover:scale-105">How It Works</a>
          <a href="#about" className="text-sm font-body hover:text-primary transition-colors hover:scale-105">About</a>
          <a href="#contact" className="text-sm font-body hover:text-primary transition-colors hover:scale-105">Contact</a>
          
          {user ? (
            <div className="relative group">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {(role === 'admin' || role === 'superadmin') && (
                    <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-surface hover:text-primary">
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-surface"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login" className="text-sm font-body bg-transparent border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors">
              Login
            </Link>
          )}

          <a href="#contact" className="text-sm font-body bg-primary text-bg px-5 py-2 font-bold rounded hover:bg-primary-lt hover:scale-105 transition-all">
            Book Free Demo
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-text hover:text-primary focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface hover:text-primary">Home</Link>
            <a href="#services" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface hover:text-primary">Services</a>
            <a href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface hover:text-primary">How It Works</a>
            <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface hover:text-primary">About</a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface hover:text-primary">Contact</a>
            {user ? (
              <>
                {(role === 'admin' || role === 'superadmin') && (
                  <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface hover:text-primary">Dashboard</Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-surface">Logout</button>
              </>
            ) : (
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-surface hover:text-primary">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // max 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c0e14] transition-opacity duration-500 ease-in-out">
      <div className="text-4xl font-heading font-extrabold tracking-tight mb-8">
        Nex<span className="text-primary">AI</span> Solutions
      </div>
      <div className="w-12 h-12 border-4 border-[#252a3d] border-t-amber-500 rounded-full animate-spin"></div>
    </div>
  );
}

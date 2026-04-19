"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 3-4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, type === "error" ? 4000 : 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-4 p-4 rounded-md shadow-lg min-w-[300px] transform transition-all duration-300 translate-x-0 bg-[#1a1e2e] border-l-4 ${
              toast.type === "success"
                ? "border-green-500 text-green-500"
                : toast.type === "error"
                ? "border-red-500 text-red-500"
                : "border-amber-500 text-amber-500"
            }`}
            style={{ animation: "slideInRight 0.3s ease-out forwards" }}
          >
            <div className="flex items-center gap-2">
              {toast.type === "success" && <span>✅</span>}
              {toast.type === "error" && <span>❌</span>}
              <span className="text-white text-sm font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

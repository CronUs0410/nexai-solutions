import { Syne, JetBrains_Mono, Lato } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/Toast";
import LoadingScreen from "@/components/LoadingScreen";
import { Suspense } from "react";
const syne = Syne({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
});

export const metadata = {
  title: "NexAI Solutions | AI Services & Workflow Automation",
  description: "AI-powered workflow solutions for businesses in Mundra, Gandhidham & Mumbai. We automate, you grow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} ${lato.variable} antialiased font-body min-h-screen`}
      >
        <ToastProvider>
          <AuthProvider>
            <LoadingScreen />
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

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
  title: 'NexAI Solutions | AI Automation Services in Mundra, Gujarat',
  description:
    'Best AI automation and workflow services in Mundra, Gandhidham and Mumbai. WhatsApp to Excel, data entry AI, document processing. Book free demo today.',
  keywords: [
    'AI automation Mundra',
    'AI services Gandhidham',
    'workflow automation Gujarat',
    'AI data entry Mundra',
    'NexAI Solutions',
    'AI services Kutch',
    'AI services in Mundra',
    'AI services of Mundra',
    'AI Mundra',
    'Mundra AI',
    'online services of Mundra',
    'AI services in Gandhidham',
    'AI services of Gandhidham',
    'AI Gandhidham',
    'Gandhidham AI',
    'online services of Gandhidham',
    'AI services in Mumbai',
    'AI services of Mumbai',
    'AI Mumbai',
    'Mumbai AI',
    'online services of Mumbai',
    'AI services in India',
    'AI services of India',
    'AI India',
    'India AI',
    'online services of India',
  ],
  openGraph: {
    title: 'NexAI Solutions | AI Automation',
    description:
      'Custom AI workflow solutions for businesses in Mundra & Gandhidham',
    url: 'https://nexai-solutions10.vercel.app',
    siteName: 'NexAI Solutions',
    locale: 'en_IN',
    type: 'website',
  },
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

"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    number: "01",
    icon: "💬",
    title: "You Share Your Workflow",
    desc: "Tell us your daily tasks — WhatsApp messages, Excel files, documents, data entry. Anything manual and repetitive.",
    highlight: false,
  },
  {
    number: "02",
    icon: "🧠",
    title: "We Analyze & Design",
    desc: "Our team understands your exact process and designs a custom AI automation solution for your specific business needs.",
    highlight: false,
  },
  {
    number: "03",
    icon: "⚙️",
    title: "We Build & Set Up",
    desc: "We build the system, connect your tools — WhatsApp, Excel, Drive, Email — and test everything thoroughly.",
    highlight: true,
  },
  {
    number: "04",
    icon: "🚀",
    title: "You Send Work. AI Does It.",
    desc: "Daily you share your data. AI processes it automatically. You get results in minutes — not hours.",
    highlight: false,
  },
];

export default function HowItWorks() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hiw-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-24 bg-bg relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-primary text-sm mb-3">{"// our process"}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text mb-4">How It Works</h2>
          <p className="text-muted font-body text-lg max-w-xl mx-auto">
            Simple 4-step process — from your problem to working solution.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-0 items-start relative">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex items-start lg:items-stretch lg:flex-col">
              {/* Card */}
              <div
                ref={(el) => (cardsRef.current[i] = el)}
                className="hiw-card flex-1 lg:w-full"
                style={{
                  background: "#1a1e2e",
                  border: step.highlight ? "1px solid #f59e0b" : "1px solid #252a3d",
                  borderRadius: "16px",
                  padding: "28px",
                  margin: "8px",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                  transitionDelay: `${i * 150}ms`,
                  opacity: 0,
                  transform: "translateY(24px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#f59e0b";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = step.highlight ? "#f59e0b" : "#252a3d";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono, monospace)",
                    fontSize: "11px",
                    color: "#f59e0b",
                    letterSpacing: "3px",
                    display: "block",
                    marginBottom: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  {step.number}
                </span>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{step.icon}</div>
                <h3
                  className="font-heading font-bold text-text mb-3"
                  style={{ fontSize: "18px" }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  {step.desc}
                </p>
              </div>

              {/* Arrow connector (desktop only, not after last card) */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden lg:flex items-center justify-center self-center mt-[-16px]"
                  style={{ color: "#252a3d", fontSize: "24px", minWidth: "20px", flexShrink: 0 }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hiw-card.hiw-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}

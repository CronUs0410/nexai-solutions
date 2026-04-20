"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { number: "60%", label: "Reduction in manual work time" },
  { number: "10x", label: "Faster than manual data entry" },
  { number: "₹0", label: "Extra staff needed for automation" },
];

export default function ValueBanner() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vb-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    cardsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: "#13161f",
        borderTop: "1px solid #252a3d",
        borderBottom: "1px solid #252a3d",
        padding: "56px 24px",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-mono text-primary text-sm mb-3">{"// why nexai"}</span>
          <h2
            className="font-heading font-extrabold text-text text-center"
            style={{ fontSize: "clamp(24px, 5vw, 32px)" }}
          >
            Save Time. Cut Costs. Grow Faster.
          </h2>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
          {STATS.map((stat, i) => (
            <div
              key={stat.number}
              ref={(el) => (cardsRef.current[i] = el)}
              className="vb-card text-center"
              style={{
                background: "#1a1e2e",
                border: "1px solid #252a3d",
                borderRadius: "14px",
                padding: "28px",
                transition: "transform 0.35s ease, opacity 0.5s ease",
                transitionDelay: `${i * 120}ms`,
                opacity: 0,
                transform: "translateY(20px)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              <div
                className="font-heading"
                style={{
                  fontSize: "clamp(40px, 8vw, 56px)",
                  fontWeight: 900,
                  color: "#f59e0b",
                  lineHeight: 1.1,
                  marginBottom: "8px",
                }}
              >
                {stat.number}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-center italic" style={{ color: "#64748b", fontSize: "14px" }}>
          Used by businesses in Mundra, Gandhidham &amp; beyond.
        </p>
      </div>

      <style>{`
        .vb-card.vb-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}

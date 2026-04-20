"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const DEFAULT_SERVICES = [
  { icon: "🌐", name: "Website Development", description: "Modern, responsive websites built for performance and growth", order: 1 },
  { icon: "🤖", name: "AI Automation", description: "Automate repetitive tasks with intelligent AI workflows", order: 2 },
  { icon: "⚙️", name: "Workflow Design", description: "Custom workflow systems that save hours of manual work daily", order: 3 },
  { icon: "📄", name: "Document Processing", description: "AI-powered document extraction, filling and processing at scale", order: 4 },
  { icon: "🎬", name: "Product Advertisement Video", description: "Eye-catching video ads that convert viewers into customers", order: 5 },
  { icon: "📊", name: "Data Entry AI", description: "Eliminate manual data entry with intelligent automation", order: 6 },
  { icon: "🎨", name: "Poster Design", description: "Professional posters and graphics for your brand", order: 7 },
];

const EXAMPLE_PILLS = [
  { icon: "💬", text: "WhatsApp → Excel Automation" },
  { icon: "🤖", text: "AI-Based Data Entry" },
  { icon: "📄", text: "Document Processing" },
  { icon: "🌐", text: "Website Development" },
];

async function seedServices() {
  console.log("[Services] Collection empty – seeding default services…");
  try {
    const col = collection(db, "services");
    const writes = DEFAULT_SERVICES.map((svc) =>
      addDoc(col, { ...svc, createdAt: serverTimestamp() })
    );
    await Promise.all(writes);
    console.log(`[Services] ✅ Seeded ${DEFAULT_SERVICES.length} services successfully.`);
  } catch (err) {
    console.error("[Services] ❌ Seed failed:", err);
  }
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const seededRef = useRef(false);

  useEffect(() => {
    console.log("[Services] Setting up Firestore listener…");
    const q = query(collection(db, "services"));

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        console.log(`[Services] Snapshot received – docs: ${snapshot.docs.length}`);

        if (snapshot.empty && !seededRef.current) {
          seededRef.current = true;
          console.log("[Services] Empty – auto-seeding now…");
          await seedServices();
          return;
        }

        const servicesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        servicesData.sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
          return (a.name || "").localeCompare(b.name || "");
        });

        console.log("[Services] Loaded:", servicesData.map((s) => s.name));
        setServices(servicesData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("[Services] ❌ Firestore error:", err.code, err.message);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => {
      console.log("[Services] Cleaning up listener.");
      unsubscribe();
    };
  }, []);

  // Stagger-animate cards into view after they render
  useEffect(() => {
    if (services.length === 0) return;
    const timeout = setTimeout(() => {
      document.querySelectorAll(".service-card").forEach((card) => {
        card.classList.add("opacity-100", "translate-y-0");
        card.classList.remove("opacity-0", "translate-y-8");
      });
    }, 80);
    return () => clearTimeout(timeout);
  }, [services]);

  return (
    <section id="services" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-6">
          <span className="inline-block font-mono text-primary text-sm mb-3">{"// what we do"}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text mb-4">What We Do</h2>
          <p className="text-muted font-body text-lg max-w-xl mx-auto">
            We convert your daily manual business tasks into intelligent automated workflows.
          </p>
        </div>

        {/* Example pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {EXAMPLE_PILLS.map((pill) => (
            <span
              key={pill.text}
              className="flex items-center gap-2 text-xs font-mono"
              style={{
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.3)",
                color: "#f59e0b",
                borderRadius: "999px",
                padding: "6px 16px",
              }}
            >
              {pill.icon} {pill.text}
            </span>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-8 animate-pulse">
                <div className="w-16 h-16 bg-border rounded-lg mb-6" />
                <div className="h-5 bg-border rounded w-3/4 mb-3" />
                <div className="h-4 bg-border rounded w-full mb-2" />
                <div className="h-4 bg-border rounded w-5/6 mb-2" />
                <div className="h-4 bg-border rounded w-4/6" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 font-mono text-sm mb-2">⚠ Firestore error</p>
            <p className="text-muted text-sm">{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center text-muted col-span-3 py-12">
            <p>No services found.</p>
            <p className="text-sm mt-2 font-mono text-primary/70">Check console for seed logs.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-card opacity-0 translate-y-8 transition-all duration-700 ease-out bg-card border border-border p-8 rounded-xl hover:-translate-y-2 hover:border-primary group shadow-lg"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-6 bg-surface w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-heading font-bold mb-3 text-text group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted font-body leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

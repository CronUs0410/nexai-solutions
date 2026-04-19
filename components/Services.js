"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Real-time listener for services
    const q = query(collection(db, "services"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const servicesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by order if exists, otherwise by name
      servicesData.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
        return (a.name || "").localeCompare(b.name || "");
      });
      setServices(servicesData);
      setLoading(false);
    }, (error) => {
      console.error("Services fetch error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Intersection Observer for fade in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".service-card");
    cards.forEach((card) => observer.observe(card));

    return () => cards.forEach((card) => observer.unobserve(card));
  }, [services]); // Re-run when services change

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-primary text-sm mb-2">{"// what we do"}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text">Our Services</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center text-muted col-span-3 py-12">
            No services found. (Admin: Create services in dashboard or run seeded endpoint)
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

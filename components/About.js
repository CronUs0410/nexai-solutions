"use client";

import { useEffect, useState, useRef } from "react";

export default function About() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );
    const current = sectionRef.current;
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 shrink-0 z-10 fade-up">
            <span className="inline-block font-mono text-primary text-sm">{"// who we are"}</span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text">NexAI Solutions</h2>
            <p className="text-lg text-muted font-body leading-relaxed">
              AI services company based in Mundra, Gujarat. Serving businesses across Mundra, Gandhidham and Mumbai with cutting-edge automation and workflow solutions.
            </p>
            <p className="text-lg text-muted font-body leading-relaxed">
              We focus on delivering high-quality, intelligent applications that eliminate redundant tasks and empower your team to focus on what matters most.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 scale-up z-10">
            <StatCard target={10} prefix="+" suffix="" label="Clients Served" inView={inView} />
            <StatCard target={7} prefix="+" suffix="" label="Services" inView={inView} delay={200} />
            <StatCard target={100} prefix="" suffix="%" label="Satisfaction" inView={inView} delay={400} className="col-span-2" />
          </div>
        </div>
      </div>
      
      {/* Decorative Blob */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 pointer-events-none"></div>
    </section>
  );
}

function StatCard({ target, prefix, suffix, label, inView, delay = 0, className = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16); // 60fps
    
    setTimeout(() => {
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          clearInterval(timer);
          setCount(target);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, delay);
  }, [inView, target, delay]);

  return (
    <div className={`bg-card border border-border p-8 rounded-xl text-center transform transition-all duration-700 hover:border-primary/50 group ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform">
        {prefix}{count}{suffix}
      </div>
      <div className="text-muted font-mono text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
}

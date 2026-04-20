export default function CtaSection() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, rgba(245,158,11,0.06), rgba(245,158,11,0.02))",
        borderTop: "1px solid rgba(245,158,11,0.15)",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Tag */}
        <span className="inline-block font-mono text-primary text-sm mb-4">
          {"// get started today"}
        </span>

        {/* Heading */}
        <h2
          className="font-heading font-extrabold text-text mb-6"
          style={{ fontSize: "clamp(28px, 6vw, 40px)", lineHeight: 1.15 }}
        >
          Ready to Automate<br />Your Business?
        </h2>

        {/* Sub */}
        <p className="text-muted font-body mb-10 mx-auto" style={{ fontSize: "16px", maxWidth: "540px" }}>
          Book a free demo — we&apos;ll understand your workflow and show you exactly how AI can save you
          hours daily. No commitment required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a
            href="https://wa.me/917385689102"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-bg font-bold px-10 py-4 rounded hover:bg-primary-lt hover:scale-105 transition-all text-base"
          >
            🚀 Book Free Demo
          </a>
          <a
            href="tel:+917385689102"
            className="bg-transparent border border-primary text-primary font-bold px-10 py-4 rounded hover:bg-primary/10 hover:scale-105 transition-all text-base"
          >
            📞 Call Anuj
          </a>
        </div>

        {/* Reassurance */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1" style={{ fontSize: "12px", color: "#64748b" }}>
          <span>✓ Free consultation</span>
          <span>✓ No advance payment</span>
          <span>✓ Demo before commitment</span>
        </div>
      </div>
    </section>
  );
}

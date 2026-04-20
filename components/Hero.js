export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M10 10h80v80h-80zM30 30h40v40h-40zM50 10v20M50 70v20M10 50h20M70 50h20" fill="none" stroke="var(--primary)" strokeWidth="1" className="circuit-line"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pulse-glow"></div>
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-up">
          <span className="inline-block py-1 px-3 rounded bg-surface border border-border text-primary font-mono text-sm mb-6">
            {"// AI Services & Workflow Solutions"}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold font-heading tracking-tight mb-4">
          <span className="block text-text fade-up delay-100">Stop Wasting Hours</span>
          <span className="block text-primary fade-up delay-200 mt-2">on Manual Work.</span>
        </h1>

        <p className="mt-6 text-xl text-muted max-w-2xl mx-auto font-body fade-up delay-300 leading-relaxed">
          We understand your daily business tasks and build custom AI systems that handle them
          automatically — WhatsApp to Excel, data entry, documents, reports and more.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 fade-up delay-400">
          <a
            href="#contact"
            className="bg-primary text-bg font-bold px-8 py-4 rounded hover:bg-primary-lt hover:scale-105 transition-all"
          >
            🚀 Book Free Demo
          </a>
          <a
            href="#how-it-works"
            className="bg-transparent border border-primary text-primary font-bold px-8 py-4 rounded hover:bg-primary/10 hover:scale-105 transition-all"
          >
            See How It Works ↓
          </a>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-20 right-20 w-16 h-16 border border-primary/30 rounded-lg float opacity-50 hidden md:block backdrop-blur-sm"></div>
      <div className="absolute top-40 left-20 w-12 h-12 border border-primary/30 rounded-full float opacity-50 hidden md:block backdrop-blur-sm" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}

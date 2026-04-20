import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/SectionSkeleton";

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <SectionSkeleton />,
});
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), {
  loading: () => <SectionSkeleton />,
});
const About = dynamic(() => import("@/components/About"), {
  loading: () => <SectionSkeleton />,
});
const ValueBanner = dynamic(() => import("@/components/ValueBanner"), {
  loading: () => <div className="py-16 bg-surface animate-pulse" />,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <SectionSkeleton />,
});
const CtaSection = dynamic(() => import("@/components/CtaSection"), {
  loading: () => <div className="py-20 bg-bg animate-pulse" />,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <ValueBanner />
        <About />
        <Contact />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

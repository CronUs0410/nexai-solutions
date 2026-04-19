import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/SectionSkeleton";

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <SectionSkeleton />,
});
const About = dynamic(() => import("@/components/About"), {
  loading: () => <SectionSkeleton />,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

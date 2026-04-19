import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="text-2xl font-heading font-extrabold tracking-tight block mb-2">
              Nex<span className="text-primary">AI</span> Solutions
            </Link>
            <p className="text-muted font-body text-sm">We Automate. You Grow.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm font-body text-muted">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted/70 font-body">
          &copy; {new Date().getFullYear()} NexAI Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

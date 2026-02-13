import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Install from "./components/Install";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content" role="main" aria-label="Main content">
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Install />
        <Footer />
      </main>
    </div>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingPetals from "@/components/ui/FloatingPetals";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative w-full min-h-screen bg-bg-obsidian">

        {/* Custom cursor */}
        <CustomCursor />

        {/* Global ambient floating traces */}
        <FloatingPetals />

        {/* Navbar */}
        <Navbar />

        {/* Scroll progress sidebar */}
        <ScrollProgress />

        {/* Sections */}
        <main className="flex-1 w-full relative z-20">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
        </main>

        {/* Footer */}
        <footer className="relative py-14 px-6 md:px-12 lg:px-24 border-t border-purple-glow/10 z-20 bg-bg-obsidian">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[12px] font-mono text-foreground/30 text-center flex flex-col gap-1 items-center">
              <span>© {new Date().getFullYear()} Shabana Mirza J. Handcrafted with ECE precision &amp; visual elegance.</span>
              <span className="text-foreground/45">Made with ❤️ by him</span>
            </p>
            <div className="flex items-center gap-6 font-mono text-[9px]">
              <a href="mailto:mirzaece2006@gmail.com"
                className="text-foreground/40 hover:text-cyan-glow transition-colors duration-300 tracking-wider">
                Email
              </a>
              <a href="tel:+918098269869"
                className="text-foreground/40 hover:text-cyan-glow transition-colors duration-300 tracking-wider">
                Call
              </a>
            </div>
          </div>
        </footer>

      </div>
    </SmoothScroll>
  );
}

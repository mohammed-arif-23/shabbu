"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

const NAV_ITEMS = [
  { label: "Home",        id: "hero",         short: "00" },
  { label: "About",       id: "about",        short: "01" },
  { label: "Skills",      id: "skills",       short: "02" },
  { label: "Projects",    id: "projects",     short: "03" },
  { label: "Experience",  id: "experience",   short: "04" },
  { label: "Testimonials",id: "testimonials", short: "05" },
  { label: "Contact",     id: "contact",      short: "06" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  // Map global scroll to a width percentage for the progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastScrollY.current && y > 120);
      lastScrollY.current = y;

      // Active section detection
      const offset = y + window.innerHeight * 0.25;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && offset >= el.offsetTop && offset < el.offsetTop + el.offsetHeight) {
          setActiveSection(item.id);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMobileOpen(false);
  };

  const activeItem = NAV_ITEMS.find((n) => n.id === activeSection);

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <AnimatePresence>
        {!hidden && (
          <motion.header
            key="navbar"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
          >
            {/* Scroll Progress line at very top of page */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-purple-glow/10 z-10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-glow via-purple-glow to-pcb-green"
                style={{ width: progressWidth }}
              />
            </div>

            {/* Main bar */}
            <div
              className={`mx-auto max-w-7xl px-6 md:px-12 lg:px-24 pt-4 pointer-events-auto transition-all duration-500`}
            >
              <div
                className={`flex items-center justify-between gap-6 rounded-[16px] px-6 py-3 transition-all duration-500 ${
                  scrolled
                    ? "bg-bg-obsidian/90 border border-purple-glow/20 shadow-[0_4px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    : "bg-transparent border border-transparent"
                }`}
              >
                {/* ── Logo ── */}
                <a
                  href="#hero"
                  onClick={(e) => scrollTo(e, "hero")}
                  className="flex items-center gap-3 shrink-0 group"
                >
                  {/* Monogram mark */}
                  <div className="relative w-8 h-8 rounded-[8px] border border-cyan-glow/30 bg-cyan-glow/5 flex items-center justify-center group-hover:border-cyan-glow/60 group-hover:bg-cyan-glow/10 transition-all duration-300">
                    <span className="font-mono text-[11px] font-bold text-cyan-glow leading-none">SM</span>
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-pcb-green shadow-[0_0_6px_rgba(0,255,102,0.8)] animate-pulse" />
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="font-mono text-[11px] font-bold text-white leading-none tracking-wider">
                      Shabana Mirza
                    </span>
                    <span className="font-mono text-[7px] text-foreground/35 tracking-widest uppercase leading-none mt-0.5">
                      ECE Engineer
                    </span>
                  </div>
                </a>

                {/* ── Nav Links (desktop) ── */}
                <nav className="hidden lg:flex items-center gap-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <Magnetic key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => scrollTo(e, item.id)}
                          className={`relative px-3.5 py-1.5 font-mono text-[9px] tracking-widest font-medium rounded-[8px] transition-all duration-300 group flex items-center gap-1.5 ${
                            isActive
                              ? "text-white"
                              : "text-foreground/40 hover:text-foreground/80"
                          }`}
                        >
                          {/* Active pill */}
                          {isActive && (
                            <motion.span
                              layoutId="navPill"
                              className="absolute inset-0 rounded-[8px] bg-cyan-glow/10 border border-cyan-glow/25"
                              transition={{ type: "spring", stiffness: 400, damping: 35 }}
                            />
                          )}
                          {/* Index number */}
                          <span className={`font-mono text-[7px] leading-none transition-colors duration-300 ${isActive ? "text-cyan-glow" : "text-foreground/20 group-hover:text-foreground/40"}`}>
                            {item.short}
                          </span>
                          <span className="relative z-10">{item.label.toUpperCase()}</span>
                        </a>
                      </Magnetic>
                    );
                  })}
                </nav>

                {/* ── Right cluster ── */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Active section readout (desktop) */}
                  <div className="hidden md:flex items-center gap-2 border border-purple-glow/15 rounded-[8px] px-3 py-1.5 bg-bg-obsidian/40">
                    <span className="font-mono text-[7px] text-foreground/25 uppercase tracking-widest">Viewing</span>
                    <span className="font-mono text-[9px] text-cyan-glow font-bold tracking-wider">
                      {activeItem?.label ?? "Home"}
                    </span>
                  </div>

                  {/* Contact CTA */}
                  <Magnetic>
                    <a
                      href="#contact"
                      onClick={(e) => scrollTo(e, "contact")}
                      className="hidden sm:inline-flex h-8 items-center justify-center rounded-[8px] bg-cyan-glow px-4 font-mono text-[8px] tracking-widest text-bg-obsidian font-bold shadow-[0_0_12px_rgba(0,242,254,0.2)] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all duration-300"
                    >
                      Uplink
                    </a>
                  </Magnetic>

                  {/* Mobile hamburger */}
                  <button
                    onClick={() => setMobileOpen((v) => !v)}
                    className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-[8px] border border-purple-glow/20 bg-bg-obsidian/60 hover:border-cyan-glow/30 transition-all duration-300"
                    aria-label="Toggle menu"
                  >
                    <motion.span
                      animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="block w-4 h-[1.5px] bg-foreground/70 origin-center"
                    />
                    <motion.span
                      animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                      className="block w-4 h-[1.5px] bg-foreground/70"
                    />
                    <motion.span
                      animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="block w-4 h-[1.5px] bg-foreground/70 origin-center"
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-bg-obsidian/70 backdrop-blur-lg lg:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-bg-obsidian border-l border-purple-glow/20 flex flex-col lg:hidden shadow-2xl"
            >
              {/* Accent bar */}
              <div className="h-[1.5px] bg-gradient-to-r from-cyan-glow via-purple-glow to-pcb-green" />

              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-purple-glow/15">
                <div>
                  <span className="font-mono text-sm font-bold text-white block">Shabana Mirza</span>
                  <span className="font-mono text-[8px] text-foreground/30 tracking-widest uppercase">ECE Engineer</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-full border border-purple-glow/20 flex items-center justify-center text-foreground/40 hover:border-cyan-glow/40 hover:text-cyan-glow transition-all duration-300"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex flex-col px-4 py-6 gap-1 flex-1 overflow-y-auto">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={(e) => scrollTo(e, item.id)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-[10px] transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-glow/8 border border-cyan-glow/20 text-white"
                          : "border border-transparent text-foreground/50 hover:text-foreground/80 hover:bg-bg-widget/40"
                      }`}
                    >
                      <span className={`font-mono text-[9px] font-bold w-6 ${isActive ? "text-cyan-glow" : "text-foreground/20"}`}>
                        {item.short}
                      </span>
                      <span className="font-mono text-[11px] tracking-widest font-medium">
                        {item.label.toUpperCase()}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="mobileActiveDot"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-glow shadow-[0_0_6px_rgba(0,242,254,0.8)]"
                        />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-5 border-t border-purple-glow/15 space-y-3">
                <a
                  href="mailto:mirzaece2006@gmail.com"
                  className="flex items-center gap-3 font-mono text-[10px] text-foreground/40 hover:text-cyan-glow transition-colors duration-300"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <rect x="1" y="2.5" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
                    <path d="M1 4.5L6.5 8L12 4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                  mirzaece2006@gmail.com
                </a>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pcb-green animate-pulse" />
                  <span className="font-mono text-[8px] text-foreground/25 tracking-widest uppercase">Available for internships</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

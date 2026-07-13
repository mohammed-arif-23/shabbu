"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const SECTIONS = [
  { id: "hero",         label: "00" },
  { id: "about",        label: "01" },
  { id: "skills",       label: "02" },
  { id: "projects",     label: "03" },
  { id: "experience",   label: "04" },
  { id: "testimonials", label: "05" },
  { id: "contact",      label: "06" },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState("hero");
  const [pcts, setPcts] = useState<number[]>(Array(SECTIONS.length).fill(0));

  // Smooth spring version of scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Build per-section progress values
  useEffect(() => {
    const calculate = () => {
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const currentY = window.scrollY;

      const offsets = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.offsetTop : 0;
      });

      const newPcts = SECTIONS.map((_, i) => {
        const start = offsets[i] - window.innerHeight * 0.2;
        const end = (offsets[i + 1] ?? totalH + window.innerHeight) - window.innerHeight * 0.2;
        const raw = (currentY - start) / (end - start);
        return Math.max(0, Math.min(1, raw));
      });
      setPcts(newPcts);

      // Active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        if (currentY >= offsets[i] - window.innerHeight * 0.35) {
          setActive(SECTIONS[i].id);
          break;
        }
      }
    };

    calculate();
    window.addEventListener("scroll", calculate, { passive: true });
    return () => window.removeEventListener("scroll", calculate);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-0 pointer-events-none">
      {/* Track line */}
      <div className="absolute inset-x-[calc(50%-0.5px)] top-0 bottom-0 w-[1px] bg-purple-glow/10" />

      {SECTIONS.map((s, i) => {
        const isActive = active === s.id;
        return (
          <div
            key={s.id}
            className="relative flex items-center gap-3 pointer-events-auto"
            style={{ paddingTop: i === 0 ? 0 : 0 }}
          >
            {/* Segment track + fill */}
            {i > 0 && (
              <div className="absolute right-[calc(50%-0.5px)] bottom-full w-[1px] overflow-hidden"
                style={{ height: 32 }}
              >
                <motion.div
                  className="w-full bg-gradient-to-b from-cyan-glow to-purple-glow origin-top"
                  style={{ height: "100%", scaleY: pcts[i - 1] }}
                />
              </div>
            )}

            {/* Node */}
            <button
              onClick={() => scrollTo(s.id)}
              className="relative flex items-center justify-center group"
            >
              {/* Outer pulse ring when active */}
              {isActive && (
                <motion.div
                  className="absolute w-5 h-5 rounded-full border border-cyan-glow/40"
                  animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
              )}

              {/* Dot */}
              <motion.div
                className="w-2 h-2 rounded-full border transition-all duration-300"
                animate={{
                  backgroundColor: isActive ? "#00F2FE" : "transparent",
                  borderColor: isActive ? "#00F2FE" : "rgba(155,81,224,0.3)",
                  scale: isActive ? 1.25 : 1,
                  boxShadow: isActive ? "0 0 10px rgba(0,242,254,0.6)" : "none",
                }}
              />

              {/* Label — appears on active */}
              <motion.span
                className="absolute right-5 font-mono text-[7px] tracking-widest whitespace-nowrap"
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : 4,
                  color: "#00F2FE",
                }}
                transition={{ duration: 0.3 }}
              >
                {s.label}
              </motion.span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

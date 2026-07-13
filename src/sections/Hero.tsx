"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import RotatingText from "@/components/ui/RotatingText";

// Topology mini-nodes shown as chips below portrait
const SKILL_CHIPS = ["Arduino", "IoT", "Core Java", "Python", "Oracle SQL", "React.js", "Embedded C", "REST APIs"];

const STATS = [
  { label: "CGPA", value: "8.2 / 10" },
  { label: "Batch", value: "ECE 2027" },
  { label: "Location", value: "Salem, TN" },
  { label: "Status", value: "Open to Work", pulse: true },
];

// Floating ambient particles
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  dur: Math.random() * 4 + 3,
  delay: Math.random() * 3,
}));



export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden py-32 px-6 md:px-12 lg:px-24"
    >
      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-glow/10 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* ── LEFT: Typography & CTAs ── */}
        <div className="flex flex-col space-y-9 order-2 lg:order-1">

          {/* Status label */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0 }}
            className="flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-pcb-green animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-pcb-green uppercase">
              00 / Portfolio · Initializing
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-1"
          >
            <h1 className="font-sans font-black leading-[0.9] tracking-[-0.03em] text-white uppercase"
              style={{ fontSize: "clamp(3.2rem, 8vw, 6.5rem)" }}
            >
              Shabana<br />
              <span
                className="text-transparent bg-clip-text animate-gradient-x"
                style={{ backgroundImage: "linear-gradient(120deg, #00F2FE, #9B51E0, #00FF66, #00F2FE)" }}
              >
                Mirza J
              </span>
            </h1>
          </motion.div>

          {/* Rotating specialization */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm text-foreground/60 border-l-2 border-cyan-glow/40 pl-4"
          >
            <span>Specializing in</span>
            <RotatingText
              texts={["Embedded Systems", "IoT Automation", "Core Java Dev", "Circuit Design", "REST APIs"]}
              mainClassName="text-cyan-glow font-bold inline-flex"
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              rotationInterval={2200}
              auto={true}
            />
            <span className="text-foreground/40">for ECE projects.</span>
          </motion.div>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col border border-purple-glow/20 bg-bg-widget/40 hover:border-purple-glow/35 rounded-xl px-4 py-2.5 min-w-[90px] transition-colors duration-300"
              >
                <span className="font-mono text-[7px] text-foreground/30 tracking-widest uppercase mb-0.5">{s.label}</span>
                <div className="flex items-center gap-1.5">
                  {s.pulse && <span className="w-1.5 h-1.5 rounded-full bg-pcb-green animate-pulse shrink-0" />}
                  <span className="font-mono text-[11px] font-bold text-white">{s.value}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42 }}
            className="flex flex-wrap gap-4 pt-1"
          >
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-cyan-glow px-8 font-mono text-[10px] tracking-widest text-bg-obsidian font-black shadow-[0_0_28px_rgba(0,242,254,0.35)] hover:shadow-[0_0_44px_rgba(0,242,254,0.55)] transition-all duration-300"
              >
                <span>View Projects</span>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-purple-glow/35 bg-bg-widget/30 px-8 font-mono text-[10px] tracking-widest text-foreground/75 font-medium hover:border-cyan-glow/45 hover:text-cyan-glow transition-all duration-300"
              >
                Get in Touch
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* ── RIGHT: Portrait Card ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[400px]">

            {/* Glow aura behind portrait */}
            <div className="absolute -inset-6 rounded-[44px] bg-gradient-to-br from-purple-glow/15 via-cyan-glow/8 to-transparent blur-2xl pointer-events-none" />

            {/* Corner bracket marks */}
            <div className="absolute -inset-4 pointer-events-none z-10">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-glow/50 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-glow/50 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-glow/50 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-glow/50 rounded-br-lg" />
              {/* Center tick marks */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-cyan-glow/25" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-cyan-glow/25" />
            </div>

            {/* Portrait image */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[28px] border border-purple-glow/25 shadow-[0_32px_80px_rgba(0,0,0,0.6)] bg-bg-widget">
              <Image
                src="/images/hero_portrait_cyber.jpg"
                alt="Shabana Mirza J"
                fill
                priority
                className="object-cover object-top brightness-[0.88] hover:brightness-95 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 40vw"
              />

              {/* Inner gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-obsidian/80 via-bg-obsidian/10 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-obsidian/20 via-transparent to-transparent pointer-events-none z-10" />

              {/* Camera metadata top-right */}
              <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5">
                <span className="font-mono text-[7px] text-pcb-green/80 bg-bg-obsidian/80 border border-pcb-green/20 px-2 py-1 rounded-md backdrop-blur-sm">
                  ISO 100 · f/1.4
                </span>
                <span className="font-mono text-[7px] text-cyan-glow/70 bg-bg-obsidian/80 border border-cyan-glow/20 px-2 py-1 rounded-md backdrop-blur-sm">
                  85mm Focal
                </span>
              </div>

              {/* Bottom name strip */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-5 space-y-1">
                <span className="font-mono text-[7px] text-foreground/35 tracking-[0.3em] uppercase block">ECE Engineer · Salem TN</span>
                <div className="flex items-center justify-between">
                  <span className="font-sans font-black text-lg text-white tracking-tight">Shabana Mirza J</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-pcb-green animate-pulse" />
                    <span className="font-mono text-[8px] text-pcb-green">Available</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Skill chips strip below portrait */}
            <div className="pt-4 flex flex-wrap gap-2 justify-center">
              {SKILL_CHIPS.map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                  className="font-mono text-[8px] tracking-widest px-2.5 py-1 rounded-md border border-purple-glow/15 bg-bg-widget/30 text-foreground/40 hover:text-cyan-glow hover:border-cyan-glow/25 transition-colors duration-300 cursor-default"
                >
                  {chip}
                </motion.span>
              ))}
            </div>

          </div>
        </motion.div>

      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="font-mono text-[7px] tracking-[0.35em] text-foreground/25 uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-glow/30 to-transparent" />
      </motion.div>
    </section>
  );
}

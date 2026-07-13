"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, slideLeft, slideRight, scaleReveal, clipLeft } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";

const DIALS = [
  { label: "Verified CGPA", value: "8.2", pct: 82, color: "var(--color-cyan-glow)", circumference: 100.5 },
  { label: "Graduation", value: "2027", pct: 50, color: "var(--color-purple-glow)", circumference: 100.5 },
  { label: "Adaptability", value: "100%", pct: 100, color: "var(--color-pcb-green)", circumference: 100.5 },
];

const CARDS = [
  {
    title: "Hardware Integration",
    status: "Module Online",
    body: "ECE student at AVS Engineering College, Salem (Anna University), specializing in embedded logic, microcontroller programming, and power systems. Hands-on experience building multi-sensor home automation using Arduino and voice control modules.",
  },
  {
    title: "Software Architecture",
    status: "Module Online",
    body: "Solid fundamentals in Core Java, Python, and Oracle SQL. Trained in database connectivity with JDBC, ORM with Hibernate, and REST API design. Goal is to bridge embedded hardware precision with modern full-stack software.",
  },
];


export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-bg-obsidian"
    >
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-glow/4 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">

        {/* ── Header ── */}
        <SectionHeader
          index="01 / About"
          heading={["System", "Specifications"]}
          sub="Hardware & Software Core"
        />

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT */}
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 space-y-8"
          >

            {/* IDE comment quote */}
            <motion.div variants={slideLeft} className="relative rounded-xl border-l-2 border-cyan-glow bg-bg-widget/25 p-6 overflow-hidden">
              <div className="absolute top-3 right-4 font-mono text-[7px] text-foreground/20 tracking-widest">/* Executive Summary */</div>
              <p className="font-mono text-sm leading-relaxed text-cyan-glow/80 font-light pt-3">
                "Engineering is the art of organizing complexity. I believe hardware precision and
                software architecture can coexist with clean, beautiful interfaces — and I'm here to prove it."
              </p>
            </motion.div>

            {/* Info cards */}
            <motion.div
              variants={staggerContainer(0.12)}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={i % 2 === 0 ? slideLeft : slideRight}
                  className="group relative rounded-[16px] border border-purple-glow/15 bg-bg-widget/25 p-6 space-y-3 hover:border-cyan-glow/25 hover:-translate-y-1 transition-all duration-400"
                >
                  {/* Status dot */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-pcb-green animate-pulse" />
                    <span className="font-mono text-[7px] text-pcb-green tracking-widest">{card.status}</span>
                  </div>
                  <div className="font-mono text-[9px] font-bold text-purple-glow tracking-widest border-b border-purple-glow/10 pb-2">
                    {card.title.toUpperCase()}
                  </div>
                  <p className="text-foreground/65 text-[13px] leading-relaxed font-sans">{card.body}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Metric dials */}
            <motion.div
              variants={staggerContainer(0.15, 0.1)}
              className="grid grid-cols-3 gap-4 border-t border-purple-glow/10 pt-8"
            >
              {DIALS.map((d) => {
                const r = 16;
                const c = 2 * Math.PI * r;
                const offset = c - (d.pct / 100) * c;
                return (
                  <motion.div
                    key={d.label}
                    variants={scaleReveal}
                    className="flex flex-col items-center gap-3 rounded-[14px] border border-purple-glow/10 bg-bg-widget/20 p-5"
                  >
                    <div className="relative w-20 h-20">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r={r} fill="none" stroke="rgba(155,81,224,0.1)" strokeWidth="2" />
                        <motion.circle
                          cx="18" cy="18" r={r}
                          fill="none"
                          stroke={d.color}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray={`${c} ${c}`}
                          initial={{ strokeDashoffset: c }}
                          whileInView={{ strokeDashoffset: offset }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-black text-white">
                        {d.value}
                      </span>
                    </div>
                    <span className="font-mono text-[8px] text-foreground/40 tracking-widest uppercase text-center">{d.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT: Portrait */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-sm mx-auto"
            >
              {/* Glow behind */}
              <div className="absolute -inset-4 rounded-[32px] bg-purple-glow/8 blur-2xl pointer-events-none" />

              {/* Corner brackets */}
              <div className="absolute -inset-3 pointer-events-none">
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-cyan-glow/40" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-cyan-glow/40" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-cyan-glow/40" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-cyan-glow/40" />
              </div>

              {/* Photo */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[20px] border border-purple-glow/20 shadow-2xl bg-bg-widget">
                <Image
                  src="/images/looking_outside_cyber.jpg"
                  alt="Shabana Mirza J"
                  fill
                  className="object-cover object-center brightness-90"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-obsidian/70 via-transparent to-transparent" />

                {/* CGPA badge top-right */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-bg-obsidian/90 border border-cyan-glow/25 rounded-lg px-3 py-1.5 shadow-md">
                  <span className="font-mono text-[8px] text-foreground/40 tracking-widest">CGPA</span>
                  <span className="font-mono text-[11px] font-black text-cyan-glow">8.2</span>
                </div>
              </div>

              {/* Floating badge bottom-left */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -left-4 flex items-center gap-2 bg-bg-obsidian/95 border border-purple-glow/25 rounded-xl px-4 py-2.5 shadow-xl"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-pcb-green animate-ping" />
                <span className="font-mono text-[8px] text-cyan-glow tracking-widest">ECE Lab · Salem</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

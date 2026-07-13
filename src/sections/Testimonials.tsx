"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/constants";
import Magnetic from "@/components/ui/Magnetic";
import { staggerContainer, fadeUp, scaleReveal } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";

const EQ = [10, 20, 14, 24, 18, 22];
const EQ_DUR = [0.7, 1.0, 0.8, 1.2, 0.9, 1.1];

function EqBars() {
  return (
    <div className="flex items-end gap-[3px] h-8 shrink-0">
      {EQ.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-sm bg-cyan-glow/50"
          animate={{ height: [h * 0.4, h, h * 0.5, h * 0.85, h * 0.4] }}
          transition={{ duration: EQ_DUR[i], repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-purple-glow/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">

        {/* ── Header ── */}
        <SectionHeader
          index="05 / Endorsements"
          heading={["Endorsements"]}
          sub="Mentor & Peer Reviews"
        />

        {/* ── Testimonial cards ── */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl mx-auto w-full space-y-6"
        >
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              variants={scaleReveal}
              className="group relative rounded-[20px] border border-purple-glow/15 bg-gradient-to-br from-bg-widget/60 to-bg-obsidian/40 overflow-hidden hover:border-purple-glow/30 transition-all duration-400"
            >
              {/* Accent top */}
              <div className="h-[1.5px] bg-gradient-to-r from-cyan-glow via-purple-glow to-pcb-green" />

              <div className="p-7 md:p-10 flex flex-col md:flex-row items-start gap-6 md:gap-10">

                {/* Large quotation mark */}
                <div className="shrink-0 select-none">
                  <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
                    <path d="M0 40V24C0 10.7 8 3 24 0l3 6C16.7 8.3 13 13 12 20h8v20H0zm28 0V24C28 10.7 36 3 52 0l-1 6C40.7 8.3 37 13 36 20h8v20H28z" fill="url(#qg)" fillOpacity="0.6" />
                    <defs>
                      <linearGradient id="qg" x1="0" y1="0" x2="52" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00F2FE" />
                        <stop offset="1" stopColor="#9B51E0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6">
                  <p className="text-foreground/85 text-base md:text-lg leading-relaxed font-sans font-light">
                    {t.quote}
                  </p>

                  {/* Author row */}
                  <div className="flex items-center justify-between gap-4 border-t border-purple-glow/10 pt-5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-purple-glow/25 shrink-0 bg-bg-widget">
                        <Image src={t.avatar} alt={t.name} fill className="object-cover brightness-80" sizes="44px" />
                      </div>
                      <div>
                        <span className="font-mono text-sm font-bold text-white block">{t.name}</span>
                        <span className="font-mono text-[9px] text-cyan-glow/70 tracking-wider block">{t.role} · {t.company}</span>
                      </div>
                    </div>

                    {/* EQ bars */}
                    <EqBars />
                  </div>
                </div>

              </div>
            </motion.div>
          ))}

          {/* Divider diamond */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-[1px] bg-purple-glow/10" />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="6" width="7" height="7" rx="1" transform="rotate(-45 1 6)" fill="rgba(155,81,224,0.4)" />
            </svg>
            <div className="flex-1 h-[1px] bg-purple-glow/10" />
          </div>
        </motion.div>

        {/* ── CTA Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto w-full rounded-[20px] border border-purple-glow/15 bg-gradient-to-r from-bg-widget/30 to-bg-obsidian/30 p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div className="space-y-2">
            <h3 className="font-sans font-black text-2xl md:text-3xl text-white tracking-tight">
              Ready to collaborate?
            </h3>
            <p className="font-mono text-[11px] text-foreground/40 tracking-wider">
              Let's build something remarkable together.
            </p>
          </div>
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-cyan-glow px-8 font-mono text-[10px] tracking-widest text-bg-obsidian font-black shadow-[0_0_24px_rgba(0,242,254,0.35)] hover:shadow-[0_0_40px_rgba(0,242,254,0.55)] transition-all duration-300 shrink-0"
            >
              Get in Touch
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnetic>
        </motion.div>

      </div>
    </section>
  );
}

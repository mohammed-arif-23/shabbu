"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCE } from "@/constants";
import { staggerContainer, slideRight, fadeUp } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 50%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const TYPE_COLOR: Record<string, string> = {
    "exp-1": "#00F2FE",
    "exp-2": "#9B51E0",
    "exp-3": "#00FF66",
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Ambient */}

      <div className="max-w-7xl mx-auto space-y-20">

        {/* ── Header ── */}
        <SectionHeader
          index="04 / System Milestones"
          heading={["System", "Milestones"]}
          sub="Professional & Academic"
        />

        {/* ── Timeline ── */}
        <div className="relative max-w-4xl mx-auto">

          {/* Vertical track */}
          <div className="absolute left-5 top-0 bottom-0 w-[1px] bg-purple-glow/10" />

          {/* Animated fill line */}
          <motion.div
            className="absolute left-5 top-0 w-[1px] bg-transparent origin-top"
            style={{ scaleY: lineScaleY, height: "100%" }}
          />

          {/* Items */}
          <motion.div
            variants={staggerContainer(0.14, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-14"
          >
            {EXPERIENCE.map((item, idx) => {
              const accent = TYPE_COLOR[item.id] ?? "#00F2FE";
              return (
                <div key={item.id} className="relative flex gap-8 md:gap-12 items-start pl-16">

                  {/* Node */}
                  <div className="absolute left-0 top-2 flex items-center justify-center">
                    {/* Outer pulse ring */}
                    <motion.div
                      className="absolute w-10 h-10 rounded-full border opacity-30"
                      style={{ borderColor: accent }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4 }}
                    />
                    {/* Inner circle */}
                    <div
                      className="relative w-10 h-10 rounded-full border-2 flex items-center justify-center bg-bg-obsidian shadow-lg"
                      style={{ borderColor: accent, boxShadow: `0 0 16px ${accent}40` }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
                    </div>

                    {/* Connector line to card */}
                    <div
                      className="absolute left-10 top-[19px] h-[1px] w-6"
                      style={{ background: `linear-gradient(90deg, ${accent}60, transparent)` }}
                    />
                  </div>

                  {/* Card */}
                  <motion.div
                    variants={slideRight}
                    className="flex-1 group rounded-[18px] border border-purple-glow/15 bg-bg-widget/35 p-6 md:p-8 space-y-5 hover:border-cyan-glow/25 hover:-translate-y-1 hover:shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-400 overflow-hidden relative"
                  >
                    {/* Top accent on hover */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                    />

                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <span
                          className="font-mono text-[8px] tracking-widest uppercase font-bold block mb-1"
                          style={{ color: accent }}
                        >
                          {item.period}
                        </span>
                        <h3 className="font-sans font-black text-xl md:text-2xl text-white tracking-tight">{item.role}</h3>
                      </div>
                      <div className="shrink-0 font-mono text-[9px] text-foreground/40 border border-purple-glow/15 rounded-lg px-3 py-1.5 bg-bg-obsidian/30 self-start">
                        {item.organization}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-mono text-[11px] text-foreground/60 leading-relaxed border-l border-purple-glow/20 pl-4">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {item.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-3 font-mono text-[11px] text-foreground/55">
                          <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

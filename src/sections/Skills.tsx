"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_NODES, SkillNode } from "@/constants";
import { staggerContainer, scaleReveal, slideRight, fadeUp, fadeIn } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";

const COMPETENCIES: Record<string, string[]> = {
  "Embedded & IoT": ["Arduino Uno", "ATmega328P", "ESP32", "PIR Sensors", "Relays", "PWM"],
  "Programming":    ["OOP Design", "Algorithms", "Multi-threading", "Data Structures"],
  "Databases & Backend": ["JDBC", "Hibernate ORM", "REST APIs", "Oracle DB"],
  "Frontend & Design":   ["React Hooks", "Components", "Responsive CSS", "State Mgmt"],
};

const CATEGORY_COLORS: Record<string, string> = {
  "Embedded & IoT":      "#00F2FE",
  "Programming":         "#9B51E0",
  "Databases & Backend": "#D4A853",
  "Frontend & Design":   "#00FF66",
};

const EQ_HEIGHTS = [14, 22, 18, 28, 16, 24];
const EQ_DURATIONS = [0.6, 0.9, 0.7, 1.1, 0.8, 1.0];

export default function Skills() {
  const [selected, setSelected] = useState<SkillNode>(SKILL_NODES[0]);

  const color = CATEGORY_COLORS[selected.category] ?? "#00F2FE";
  const comps = COMPETENCIES[selected.category] ?? [];

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full bg-cyan-glow/3 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">

        {/* ── Header ── */}
        <SectionHeader
          index="02 / Core Architecture"
          heading={["Technical", "Stack"]}
          sub="Select a module"
        />

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* LEFT: Skill cards */}
          <motion.div
            variants={staggerContainer(0.07, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {SKILL_NODES.map((skill, i) => {
              const isActive = selected.name === skill.name;
              const c = CATEGORY_COLORS[skill.category] ?? "#00F2FE";
              return (
                <motion.div
                  key={skill.name}
                  variants={scaleReveal}
                  onClick={() => setSelected(skill)}
                  className={`group relative cursor-pointer rounded-[16px] border p-5 space-y-4 transition-all duration-400 ${
                    isActive
                      ? "border-cyan-glow/40 bg-bg-widget/60 shadow-[0_0_30px_rgba(0,242,254,0.07)] -translate-y-1"
                      : "border-purple-glow/15 bg-bg-widget/20 hover:border-purple-glow/30 hover:-translate-y-1 hover:bg-bg-widget/35"
                  }`}
                >
                  {/* Active top accent */}
                  {isActive && (
                    <motion.div
                      layoutId="skillAccent"
                      className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full"
                      style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }}
                    />
                  )}

                  {/* Category + status */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[7px] tracking-widest uppercase font-bold" style={{ color: c }}>
                      {skill.category}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isActive ? "bg-pcb-green animate-pulse" : "bg-purple-glow/25"}`} />
                  </div>

                  {/* Skill name */}
                  <h3 className={`font-sans font-bold text-base leading-tight transition-colors duration-300 ${isActive ? "text-white" : "text-white/70"}`}>
                    {skill.name}
                  </h3>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[7px] text-foreground/30 tracking-widest">Proficiency</span>
                      <span className="font-mono text-[8px] font-bold" style={{ color: isActive ? c : "rgba(255,255,255,0.3)" }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-[3px] rounded-full bg-purple-glow/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.06 }}
                        className="h-full rounded-full"
                        style={{ background: isActive ? `linear-gradient(90deg, ${c}88, ${c})` : "rgba(155,81,224,0.4)" }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* RIGHT: Detail panel */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.name}
                variants={slideRight}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, x: 20 }}
                className="sticky top-24 rounded-[20px] border border-purple-glow/20 bg-bg-widget/50 overflow-hidden shadow-2xl"
              >
                {/* Top gradient bar */}
                <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

                <div className="p-7 md:p-9 space-y-7">
                  {/* Header */}
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] tracking-widest uppercase font-bold" style={{ color }}>
                      {selected.category}
                    </span>
                    <h3 className="font-sans font-black text-2xl text-white">{selected.name}</h3>
                  </div>

                  {/* Level gauge */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center font-mono text-[9px]">
                      <span className="text-foreground/40">Integration Level</span>
                      <span style={{ color }}>{selected.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-bg-obsidian border border-purple-glow/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selected.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}66, ${color})` }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-mono text-[11px] text-foreground/65 leading-relaxed border border-purple-glow/10 rounded-xl p-4 bg-bg-obsidian/30">
                    {selected.description}
                  </p>

                  {/* Equalizer */}
                  <div className="space-y-2">
                    <span className="font-mono text-[7px] text-foreground/25 uppercase tracking-widest">Signal Output</span>
                    <div className="flex items-end gap-1 h-8">
                      {EQ_HEIGHTS.map((h, i) => (
                        <motion.div
                          key={i}
                          className="w-2 rounded-sm"
                          style={{ background: color, opacity: 0.5 }}
                          animate={{ height: [h * 0.4, h, h * 0.6, h * 0.9, h * 0.4] }}
                          transition={{ duration: EQ_DURATIONS[i], repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Competency chips */}
                  {comps.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-mono text-[7px] text-foreground/25 uppercase tracking-widest">Competencies</span>
                      <div className="flex flex-wrap gap-1.5">
                        {comps.map((c) => (
                          <span
                            key={c}
                            className="font-mono text-[8px] px-2.5 py-1 rounded-md border tracking-wider"
                            style={{ borderColor: `${color}30`, color: `${color}aa`, background: `${color}08` }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

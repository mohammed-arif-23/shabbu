"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "@/constants";
import Magnetic from "@/components/ui/Magnetic";
import { staggerContainer, fadeUp, slideLeft } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";

const projectSpecs: Record<string, { label: string; value: string }[]> = {
  "proj-1": [
    { label: "MCU", value: "ATmega328P" },
    { label: "Protocol", value: "Wi-Fi + BT" },
    { label: "Baud Rate", value: "9600 bps" },
    { label: "Sensors", value: "PIR / Motion" },
  ],
  "proj-2": [
    { label: "Scope", value: "National Level" },
    { label: "Field", value: "Embedded IoT" },
    { label: "Mode", value: "Real-Time" },
    { label: "Domain", value: "Research" },
  ],
  "proj-3": [
    { label: "Language", value: "Java + Python" },
    { label: "ORM", value: "Hibernate" },
    { label: "Database", value: "Oracle SQL" },
    { label: "API", value: "REST" },
  ],
};

// Inline SVG oscilloscope wave that animates on hover
function SignalWave({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 48" className="w-full h-full" preserveAspectRatio="none">
      {/* Grid lines */}
      {[12, 24, 36].map((y) => (
        <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#9B51E0" strokeWidth="0.3" strokeOpacity="0.3" />
      ))}
      <line x1="120" y1="0" x2="120" y2="48" stroke="#9B51E0" strokeWidth="0.3" strokeOpacity="0.3" />

      {/* Main wave */}
      <motion.path
        d={
          active
            ? "M0,24 Q30,4 60,24 T120,24 T180,24 T240,24"
            : "M0,24 Q30,16 60,24 T120,24 T180,24 T240,24"
        }
        fill="none"
        stroke={active ? "#00F2FE" : "#9B51E0"}
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{
          d: active
            ? "M0,24 Q30,4 60,24 T120,24 T180,24 T240,24"
            : "M0,24 Q30,16 60,24 T120,24 T180,24 T240,24",
          stroke: active ? "#00F2FE" : "#9B51E0",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
      {/* Secondary trace */}
      <motion.path
        d={
          active
            ? "M0,24 Q30,44 60,24 T120,24 T180,24 T240,24"
            : "M0,24 Q30,32 60,24 T120,24 T180,24 T240,24"
        }
        fill="none"
        stroke={active ? "#00F2FE" : "#9B51E0"}
        strokeWidth="0.6"
        strokeOpacity="0.35"
        strokeDasharray="3 3"
        strokeLinecap="round"
        animate={{
          d: active
            ? "M0,24 Q30,44 60,24 T120,24 T180,24 T240,24"
            : "M0,24 Q30,32 60,24 T120,24 T180,24 T240,24",
          stroke: active ? "#00F2FE" : "#9B51E0",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Moving dot on main wave */}
      {active && (
        <motion.circle
          r="2.5"
          fill="#00F2FE"
          initial={{ cx: 0, cy: 24, opacity: 0 }}
          animate={{ cx: [0, 60, 120, 180, 240], cy: [24, 4, 24, 24, 24], opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
          style={{ filter: "drop-shadow(0 0 3px #00F2FE)" }}
        />
      )}
    </svg>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ── Section Header ── */}
        <SectionHeader
          index="03 / System Deployments"
          heading={["System", "Deployments"]}
          sub="Selected Build Logs"
        />

        {/* ── Project Rows ── */}
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-4"
        >
          {PROJECTS.map((project, idx) => {
            const isHovered = hoveredId === project.id;
            const specs = projectSpecs[project.id] || [];
            const indexLabel = String(idx + 1).padStart(2, "0");

            return (
              <motion.div
                key={project.id}
                variants={slideLeft}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer"
              >
                <div
                  className={`relative flex flex-col lg:flex-row items-stretch rounded-[18px] border overflow-hidden transition-all duration-400 bg-bg-widget/40 ${
                    isHovered
                      ? "border-cyan-glow/35 shadow-[0_0_36px_rgba(0,242,254,0.06)]"
                      : "border-purple-glow/12"
                  }`}
                >
                  {/* Animated top accent stripe */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[1.5px]"
                    style={{
                      background: "linear-gradient(90deg, #00F2FE, #9B51E0, #00FF66)",
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* ── Index + Category Sidebar ── */}
                  <div className={`flex lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-3 lg:gap-6 px-6 py-5 lg:py-8 lg:w-52 shrink-0 border-b lg:border-b-0 lg:border-r transition-colors duration-400 ${isHovered ? "border-cyan-glow/15 bg-bg-obsidian/30" : "border-purple-glow/10"}`}>
                    <span className="font-mono text-4xl font-bold text-foreground/8 leading-none select-none group-hover:text-foreground/12 transition-colors">
                      {indexLabel}
                    </span>
                    <div className="space-y-1">
                      <span className="font-mono text-[8px] text-foreground/30 uppercase tracking-widest block">Category</span>
                      <span className="font-mono text-[10px] text-foreground/60 font-medium leading-tight">{project.category}</span>
                    </div>
                    {/* Live status dot */}
                    <div className="flex items-center gap-1.5 ml-auto lg:ml-0 mt-auto">
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isHovered ? "bg-pcb-green shadow-[0_0_6px_rgba(0,255,102,0.8)] animate-pulse" : "bg-purple-glow/20"}`} />
                      <span className="font-mono text-[7px] text-foreground/25 uppercase tracking-widest">
                        {isHovered ? "Active" : "Idle"}
                      </span>
                    </div>
                  </div>

                  {/* ── Main Content ── */}
                  <div className="flex-1 flex flex-col justify-between px-7 py-7 space-y-5 min-w-0">
                    <div className="space-y-2">
                      <h3 className={`font-sans font-extrabold text-2xl lg:text-3xl tracking-tight transition-colors duration-300 ${isHovered ? "text-white" : "text-white/80"}`}>
                        {project.title}
                      </h3>
                      <p className="font-mono text-[11px] text-foreground/50 leading-relaxed max-w-lg">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`font-mono text-[8px] px-2.5 py-1 rounded-md border tracking-wider transition-all duration-300 ${
                            isHovered
                              ? "text-cyan-glow border-cyan-glow/20 bg-cyan-glow/5"
                              : "text-foreground/40 border-purple-glow/15 bg-transparent"
                          }`}
                        >
                          {t.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ── Right: Signal + Specs ── */}
                  <div className={`flex flex-col justify-between lg:w-72 shrink-0 p-6 space-y-5 border-t lg:border-t-0 lg:border-l transition-colors duration-400 ${isHovered ? "border-cyan-glow/15 bg-bg-obsidian/20" : "border-purple-glow/10"}`}>

                    {/* Oscilloscope panel */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[7px] text-foreground/25 uppercase tracking-widest">Signal Output</span>
                        <span className={`font-mono text-[7px] uppercase tracking-widest transition-colors duration-300 ${isHovered ? "text-cyan-glow" : "text-foreground/20"}`}>
                          {isHovered ? "Transmitting" : "Standby"}
                        </span>
                      </div>
                      <div className="h-12 border border-purple-glow/10 rounded-lg overflow-hidden bg-bg-obsidian/30 p-1">
                        <SignalWave active={isHovered} />
                      </div>
                    </div>

                    {/* Spec grid */}
                    <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                      {specs.map((s) => (
                        <div key={s.label} className="flex flex-col gap-0.5">
                          <span className="font-mono text-[7px] text-foreground/30 uppercase tracking-widest">
                            {s.label}
                          </span>
                          <span className={`font-mono text-[10px] font-bold transition-colors duration-300 ${isHovered ? "text-cyan-glow" : "text-white/50"}`}>
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className={`flex items-center gap-2 font-mono text-[9px] tracking-widest transition-all duration-300 group-hover:gap-3 ${isHovered ? "text-cyan-glow" : "text-foreground/20"}`}>
                      <span>View Logs</span>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                        <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Detail Modal ── */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-bg-obsidian/85 backdrop-blur-xl"
              />

              <motion.div
                initial={{ y: 28, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 28, opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 340, damping: 30 }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[22px] border border-purple-glow/30 bg-bg-widget shadow-2xl z-10"
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-glow via-purple-glow to-pcb-green" />

                <div className="p-8 md:p-10 space-y-8">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[8px] text-pcb-green tracking-widest uppercase">{selectedProject.category}</span>
                      <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-white tracking-tight">{selectedProject.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-9 h-9 rounded-full border border-purple-glow/30 flex items-center justify-center text-foreground/40 hover:border-cyan-glow hover:text-cyan-glow transition-all duration-300 shrink-0"
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M1 1L10 10M10 1L1 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Description */}
                  <p className="font-mono text-[12px] text-foreground/75 leading-relaxed border-l-2 border-cyan-glow/30 pl-4">
                    {selectedProject.description}
                  </p>

                  {/* Signal full-width */}
                  <div className="space-y-2">
                    <span className="font-mono text-[7px] text-foreground/25 uppercase tracking-widest block">Signal Trace</span>
                    <div className="h-14 border border-purple-glow/15 rounded-xl overflow-hidden bg-bg-obsidian/40 p-2">
                      <SignalWave active={true} />
                    </div>
                  </div>

                  {/* Spec grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 border border-purple-glow/12 rounded-xl p-5 bg-bg-obsidian/25">
                    {(projectSpecs[selectedProject.id] || []).map((s) => (
                      <div key={s.label} className="flex flex-col gap-1">
                        <span className="font-mono text-[7px] text-foreground/30 uppercase tracking-widest">{s.label}</span>
                        <span className="font-mono text-sm font-bold text-cyan-glow">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div className="space-y-3">
                    <span className="font-mono text-[8px] text-foreground/30 uppercase tracking-widest block">Integrated Technologies</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span key={t} className="font-mono text-[9px] text-cyan-glow px-3 py-1.5 rounded border border-cyan-glow/20 bg-cyan-glow/5 tracking-wider">
                          {t.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-5 border-t border-purple-glow/12">
                    <Magnetic>
                      <a
                        href={selectedProject.link || "#"}
                        className="inline-flex h-11 items-center justify-center rounded-[8px] bg-cyan-glow px-8 font-mono text-[10px] text-bg-obsidian font-bold tracking-widest shadow-[0_0_16px_rgba(0,242,254,0.3)] hover:shadow-[0_0_28px_rgba(0,242,254,0.5)] transition-all duration-300"
                      >
                        Open Project
                      </a>
                    </Magnetic>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="font-mono text-[9px] text-foreground/35 hover:text-cyan-glow transition-colors tracking-wider"
                    >
                      Return to Deck
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

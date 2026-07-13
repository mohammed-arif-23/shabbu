"use client";

import { motion } from "framer-motion";
import { headingContainer, headingWord, fadeUpSm } from "@/lib/animations";

interface SectionHeaderProps {
  index: string;      // e.g. "01 / About"
  heading: string[];  // e.g. ["System", "Specifications"] — each word is its own line
  sub?: string;       // right-side subtitle
}

export default function SectionHeader({ index, heading, sub }: SectionHeaderProps) {
  return (
    <motion.div
      variants={headingContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="flex flex-col md:flex-row md:items-end justify-between border-b border-purple-glow/12 pb-6 gap-4"
    >
      <div className="space-y-4">
        {/* Index label — fades up */}
        <motion.span
          variants={fadeUpSm}
          className="font-mono text-[9px] text-pcb-green tracking-[0.28em] uppercase block"
        >
          {index}
        </motion.span>

        {/* Heading lines — each word clips up from below */}
        <div className="overflow-hidden" style={{ perspective: "800px" }}>
          <div className="font-sans font-black uppercase leading-[0.88] tracking-tight text-white"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            {heading.map((line, i) => (
              <div key={i} className="overflow-hidden pb-1">
                <motion.div variants={headingWord} style={{ display: "block" }}>
                  {line}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {sub && (
        <motion.p
          variants={fadeUpSm}
          className="font-mono text-[9px] text-foreground/22 tracking-widest uppercase shrink-0"
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}

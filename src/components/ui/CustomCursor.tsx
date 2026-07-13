"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [targetName, setTargetName] = useState("");
  const coordsRef = useRef<HTMLDivElement>(null);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the robotic outer target reticle
  const springConfig = { damping: 25, stiffness: 220, mass: 0.4 };
  const reticleX = useSpring(mouseX, springConfig);
  const reticleY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Ultra-efficient real-time telemetry coordinate printing (No React re-renders)
      if (coordsRef.current) {
        coordsRef.current.textContent = `SYS_X: ${e.clientX} | SYS_Y: ${e.clientY}`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const interactiveEl =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='hover']");

      if (interactiveEl) {
        setHovered(true);
        // Find text content or action name to display in diagnostics
        const label =
          (interactiveEl as HTMLElement).innerText ||
          (interactiveEl as HTMLElement).getAttribute("aria-label") ||
          "ACTION";
        setTargetName(label.toUpperCase().replace(/\s+/g, "_").slice(0, 12));
      } else {
        setHovered(false);
        setTargetName("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Outer robotic scanning scope sight */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-9999 hidden md:block"
        style={{
          x: reticleX,
          y: reticleY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: hovered ? 1.4 : 1.0,
            borderColor: hovered ? "var(--color-pcb-green)" : "rgba(0, 242, 254, 0.4)",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="w-12 h-12 rounded-full border border-dashed flex items-center justify-center relative"
        >
          {/* Target Reticle Crosshair ticks */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] h-2 bg-cyan-glow/40 -translate-x-1/2 origin-top" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] h-2 bg-cyan-glow/40 -translate-x-1/2 origin-bottom self-end" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] w-2 bg-cyan-glow/40 -translate-y-1/2 origin-left" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] w-2 bg-cyan-glow/40 -translate-y-1/2 origin-right justify-self-end self-center justify-end flex" />

          {/* Glowing bracket locks for targets */}
          {hovered && (
            <>
              <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-pcb-green" />
              <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-pcb-green" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-pcb-green" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-pcb-green" />
            </>
          )}
        </motion.div>

        {/* Diagnostic coordinates label */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 pointer-events-none select-none font-mono text-[8px] tracking-wider bg-bg-obsidian/80 border border-purple-glow/20 px-2 py-1 rounded text-cyan-glow/85 whitespace-nowrap shadow-md">
          <div ref={coordsRef}>SYS_X: 0 | SYS_Y: 0</div>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-pcb-green font-bold"
            >
              [LOCK: {targetName}]
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Target core central laser pointer */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-9999 hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            backgroundColor: hovered ? "var(--color-pcb-green)" : "var(--color-cyan-glow)",
            scale: hovered ? 1.5 : 1.0,
          }}
          className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,242,254,0.8)]"
        />
      </motion.div>
    </>
  );
}

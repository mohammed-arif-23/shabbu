"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_ITEMS, GalleryItem } from "@/constants";

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Navigation inside Lightbox
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      const prevIdx = activeIndex === 0 ? GALLERY_ITEMS.length - 1 : activeIndex - 1;
      setActiveIndex(prevIdx);
      setSelectedItem(GALLERY_ITEMS[prevIdx]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      const nextIdx = activeIndex === GALLERY_ITEMS.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIdx);
      setSelectedItem(GALLERY_ITEMS[nextIdx]);
    }
  };

  // High-end camera metadata details to make it look like a technical studio archive
  const cameraMeta: Record<string, { shutter: string; aperture: string; iso: string; dimensions: string }> = {
    "gal-1": { shutter: "1/200s", aperture: "f/1.4", iso: "ISO 100", dimensions: "4200 x 5600" },
    "gal-2": { shutter: "1/125s", aperture: "f/2.0", iso: "ISO 400", dimensions: "3800 x 5070" },
    "gal-3": { shutter: "1/160s", aperture: "f/1.8", iso: "ISO 200", dimensions: "4000 x 5330" },
    "gal-4": { shutter: "1/250s", aperture: "f/1.4", iso: "ISO 100", dimensions: "4400 x 5860" },
    "gal-5": { shutter: "1/320s", aperture: "f/2.8", iso: "ISO 80 bg", dimensions: "4100 x 5460" },
    "gal-6": { shutter: "1/100s", aperture: "f/2.2", iso: "ISO 640", dimensions: "3900 x 5200" },
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-bg-widget/20"
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-purple-glow/20 pb-6 gap-4">
          <div className="space-y-3">
            <span className="font-mono text-xs text-pcb-green">04 / CORE ARCHIVE</span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase glitch-text">
              Visual Core Scans
            </h2>
          </div>
          <p className="text-foreground/40 text-xs font-mono tracking-wider">
            Image Database Archive
          </p>
        </div>

        {/* Cyber Viewport Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {GALLERY_ITEMS.map((item, idx) => {
            const meta = cameraMeta[item.id] || { shutter: "1/160s", aperture: "f/1.8", iso: "ISO 100", dimensions: "4000 x 5330" };
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`${item.cols} relative group cursor-zoom-in`}
                onClick={() => {
                  setSelectedItem(item);
                  setActiveIndex(idx);
                }}
              >
                {/* Viewport Frame Brackets */}
                <div className="absolute -inset-2.5 border border-purple-glow/10 rounded-[16px] pointer-events-none group-hover:border-cyan-glow/30 transition-colors duration-500">
                  {/* Glowing crosshair corner marks */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-glow/0 group-hover:border-cyan-glow transition-colors duration-300" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-glow/0 group-hover:border-cyan-glow transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-glow/0 group-hover:border-cyan-glow transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-glow/0 group-hover:border-cyan-glow transition-colors duration-300" />
                </div>

                {/* Main Card Viewport */}
                <div className="relative overflow-hidden rounded-[12px] border border-purple-glow/20 bg-bg-widget shadow-lg scanlines hologram-scanlines">
                  
                  {/* Floating Camera Metadata tags */}
                  <div className="absolute top-3 left-3 z-20 font-mono text-[7px] text-cyan-glow/70 bg-bg-obsidian/75 border border-cyan-glow/15 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {meta.dimensions}
                  </div>
                  <div className="absolute top-3 right-3 z-20 font-mono text-[7px] text-pcb-green/70 bg-bg-obsidian/75 border border-pcb-green/15 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {meta.shutter} | {meta.aperture}
                  </div>

                  <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-auto md:h-[350px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-103 brightness-[0.8]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Dark gradient blur */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-obsidian via-bg-obsidian/20 to-transparent opacity-80" />
                  </div>

                  {/* Caption Reveal inside Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    <span className="font-mono text-[8px] text-cyan-glow tracking-widest block mb-1">
                      Camera Viewport Details
                    </span>
                    <h3 className="font-mono font-bold text-lg leading-snug">
                      {item.title.toUpperCase()}
                    </h3>
                  </div>
                </div>

                {/* Subtitle description labels */}
                <div className="pt-3 px-1 space-y-0.5">
                  <h4 className="font-mono text-xs font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-foreground/50 font-mono leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Fullscreen Lightbox */}
        <AnimatePresence>
          {selectedItem && activeIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Backing Darken */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="absolute inset-0 bg-bg-obsidian/75 backdrop-blur-lg"
              />

              {/* Lightbox Scope Panel */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-transparent max-w-4xl w-full flex flex-col items-center justify-center z-10 space-y-4"
              >
                {/* Photo Viewport Container */}
                <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-[20px] border border-purple-glow/30 shadow-2xl bg-bg-widget scanlines hologram-scanlines">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-cover object-center brightness-[0.8]"
                    sizes="80vw"
                  />
                  
                  {/* Left scroll trigger */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel border-purple-glow/20 flex items-center justify-center text-cyan-glow hover:border-cyan-glow hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto font-mono text-xs"
                  >
                    Prev
                  </button>

                  {/* Right scroll trigger */}
                  <button
                    onClick={handleNext}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel border-purple-glow/20 flex items-center justify-center text-cyan-glow hover:border-cyan-glow hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto font-mono text-xs"
                  >
                    Next
                  </button>

                  {/* Close trigger */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute right-6 top-6 w-10 h-10 rounded-full glass-panel border-purple-glow/20 flex items-center justify-center text-cyan-glow hover:border-cyan-glow hover:scale-105 transition-all duration-300 pointer-events-auto font-mono text-xs"
                  >
                    Close
                  </button>
                </div>

                {/* Subtitle Caption */}
                <div className="glass-panel w-full max-w-2xl rounded-xl p-5 border border-purple-glow/20 shadow-xl text-center bg-bg-widget/80">
                  <span className="font-mono text-[9px] text-pcb-green font-bold block mb-1">
                    Image {activeIndex + 1} of {GALLERY_ITEMS.length} | {cameraMeta[selectedItem.id]?.dimensions}
                  </span>
                  <h3 className="font-mono font-bold text-lg text-white mb-1">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-foreground/75 font-mono leading-relaxed font-light">
                    {selectedItem.description}
                  </p>
                </div>
              </motion.div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

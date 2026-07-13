"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

interface TerminalLog {
  id: number;
  text: string;
  type: "success" | "info" | "system" | "error";
}

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "mirzaece2006@gmail.com",
    href: "mailto:mirzaece2006@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1 5.5L8 9.5L15 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91 8098269869",
    href: "tel:+918098269869",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 3a1 1 0 011-1h2.5a1 1 0 011 1v1.5c0 .4-.2.8-.5 1L5 6.5c.8 1.6 2 2.8 3.5 3.5l1-1c.2-.3.6-.5 1-.5H12a1 1 0 011 1V12a1 1 0 01-1 1A11 11 0 012 3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Salem, Tamil Nadu",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1C5.2 1 3 3.2 3 6c0 3.9 5 9 5 9s5-5.1 5-9c0-2.8-2.2-5-5-5z" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

const isFieldValid = (val: string, type: "text" | "email") => {
  if (!val) return "empty";
  if (type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "valid" : "invalid";
  return val.length >= 2 ? "valid" : "invalid";
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const logIdRef = useRef(3);

  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    { id: 1, text: "Uplink ready. Awaiting transmission...", type: "system" },
    { id: 2, text: "Encryption protocols: ACTIVE", type: "info" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));

    if (value.length > 0 && value.length % 12 === 0) {
      const messages = [
        `Stream buffer: ${value.length} chars`,
        "Network latency: 2ms",
        "Packet integrity: OK",
        "Encryption: AES-256",
      ];
      const newLog: TerminalLog = {
        id: logIdRef.current++,
        text: messages[Math.floor(Math.random() * messages.length)],
        type: "info",
      };
      setTerminalLogs((prev) => [...prev.slice(-5), newLog]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const id1 = logIdRef.current++;
    const id2 = logIdRef.current++;
    setTerminalLogs((prev) => [
      ...prev,
      { id: id1, text: `Packet dispatched: FROM ${formData.name}`, type: "info" },
      { id: id2, text: "Transmission complete. ACK received.", type: "success" },
    ]);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
      setTerminalLogs([
        { id: 1, text: "Uplink ready. Awaiting transmission...", type: "system" },
        { id: 2, text: "Encryption protocols: ACTIVE", type: "info" },
      ]);
    }, 4500);
  };

  const ledColor = (state: string) => {
    if (state === "valid") return "bg-pcb-green shadow-[0_0_8px_rgba(0,255,102,0.7)]";
    if (state === "invalid") return "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]";
    return "bg-purple-glow/20";
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-purple-glow/20 pb-6 gap-4">
          <div className="space-y-3">
            <span className="font-mono text-xs text-pcb-green tracking-widest">06 / CONTACT UPLINK</span>
            <h2 className="font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase">
              Terminal<br />Uplink
            </h2>
          </div>
          <p className="text-foreground/30 text-[10px] font-mono tracking-widest uppercase">
            Open Connection Channel
          </p>
        </div>

        {/* ── Main Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── LEFT: Identity + Contact Details ── */}
          <div className="lg:col-span-4 space-y-8">

            {/* Identity Block */}
            <div className="space-y-3 border-b border-purple-glow/15 pb-8">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-pcb-green animate-pulse" />
                <span className="font-mono text-[9px] text-pcb-green tracking-widest uppercase">Available for Roles</span>
              </div>
              <h3 className="font-sans font-extrabold text-3xl text-white tracking-tight">
                Shabana<br />Mirza J
              </h3>
              <p className="font-mono text-[11px] text-foreground/50 leading-relaxed">
                ECE Engineer seeking internship and trainee roles in Embedded Systems, IoT, and Software Development.
              </p>
            </div>

            {/* Contact Links */}
            <div className="space-y-1">
              <span className="font-mono text-[8px] text-foreground/30 uppercase tracking-widest block mb-4">Direct Channels</span>
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-purple-glow/10 hover:border-cyan-glow/30 bg-bg-widget/30 hover:bg-bg-widget/60 transition-all duration-300"
                >
                  <span className="text-foreground/30 group-hover:text-cyan-glow transition-colors duration-300">
                    {link.icon}
                  </span>
                  <div>
                    <span className="font-mono text-[8px] text-foreground/30 uppercase tracking-widest block">
                      {link.label}
                    </span>
                    <span className="font-mono text-[11px] text-foreground/80 group-hover:text-white transition-colors duration-300">
                      {link.value}
                    </span>
                  </div>
                  <svg className="ml-auto text-foreground/20 group-hover:text-cyan-glow/60 transition-colors" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Terminal status readout */}
            <div className="rounded-xl border border-purple-glow/15 bg-bg-obsidian/60 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-purple-glow/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/50" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <span className="w-2 h-2 rounded-full bg-pcb-green/50" />
                </div>
                <span className="font-mono text-[7px] text-foreground/30 tracking-widest">UPLINK CONSOLE</span>
              </div>
              <div className="p-4 space-y-1.5 font-mono text-[9px] min-h-[100px]">
                {terminalLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={
                      log.type === "success"
                        ? "text-pcb-green font-bold"
                        : log.type === "system"
                        ? "text-cyan-glow"
                        : "text-foreground/50"
                    }
                  >
                    <span className="text-foreground/20 mr-1.5">›</span>
                    {log.text}
                  </motion.div>
                ))}
                <span className="text-cyan-glow/60 animate-pulse">█</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form Panel ── */}
          <div className="lg:col-span-8">
            <div className="relative rounded-[24px] border border-purple-glow/20 bg-bg-widget/60 overflow-hidden shadow-2xl">

              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-glow via-purple-glow to-pcb-green" />

              {/* Form header */}
              <div className="px-8 md:px-10 pt-10 pb-6 border-b border-purple-glow/10">
                <h4 className="font-sans font-extrabold text-xl text-white tracking-tight">
                  Send a Message
                </h4>
                <p className="font-mono text-[10px] text-foreground/40 mt-1">
                  All transmissions are encrypted end-to-end.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="px-8 md:px-10 py-20 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    {/* Animated success ring */}
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-2 border-pcb-green animate-ping opacity-30" />
                      <div className="w-16 h-16 rounded-full border-2 border-pcb-green flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="#00FF66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <p className="font-mono text-sm text-pcb-green font-bold">Transmission Dispatched</p>
                    <p className="font-mono text-[10px] text-foreground/40">
                      Your message has been sent successfully. Expect a response within 48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-8 md:px-10 py-8 md:py-10 space-y-7"
                  >
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="font-mono text-[9px] text-foreground/40 tracking-widest uppercase">
                            Your Name
                          </label>
                          <span className={`w-1.5 h-1.5 rounded-full transition-all duration-400 ${ledColor(isFieldValid(formData.name, "text"))}`} />
                        </div>
                        <div className={`relative rounded-lg border transition-all duration-300 ${focused === "name" ? "border-cyan-glow/50 shadow-[0_0_12px_rgba(0,242,254,0.08)]" : "border-purple-glow/15"} bg-bg-obsidian/30`}>
                          <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused(null)}
                            className="w-full bg-transparent px-4 py-3.5 font-mono text-[12px] text-foreground placeholder:text-foreground/20 focus:outline-none"
                            placeholder="Evelyn Vane"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="font-mono text-[9px] text-foreground/40 tracking-widest uppercase">
                            Email Address
                          </label>
                          <span className={`w-1.5 h-1.5 rounded-full transition-all duration-400 ${ledColor(isFieldValid(formData.email, "email"))}`} />
                        </div>
                        <div className={`relative rounded-lg border transition-all duration-300 ${focused === "email" ? "border-cyan-glow/50 shadow-[0_0_12px_rgba(0,242,254,0.08)]" : "border-purple-glow/15"} bg-bg-obsidian/30`}>
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                            className="w-full bg-transparent px-4 py-3.5 font-mono text-[12px] text-foreground placeholder:text-foreground/20 focus:outline-none"
                            placeholder="evelyn@studio.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-mono text-[9px] text-foreground/40 tracking-widest uppercase">
                          Message
                        </label>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[8px] text-foreground/25">
                            {formData.message.length}/500
                          </span>
                          <span className={`w-1.5 h-1.5 rounded-full transition-all duration-400 ${ledColor(isFieldValid(formData.message, "text"))}`} />
                        </div>
                      </div>
                      <div className={`relative rounded-lg border transition-all duration-300 ${focused === "message" ? "border-cyan-glow/50 shadow-[0_0_12px_rgba(0,242,254,0.08)]" : "border-purple-glow/15"} bg-bg-obsidian/30`}>
                        <textarea
                          required
                          rows={5}
                          name="message"
                          maxLength={500}
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocused("message")}
                          onBlur={() => setFocused(null)}
                          className="w-full bg-transparent px-4 py-3.5 font-mono text-[12px] text-foreground placeholder:text-foreground/20 focus:outline-none resize-none"
                          placeholder="Describe your project, opportunity, or inquiry..."
                        />
                      </div>
                    </div>

                    {/* Submit Row */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pcb-green animate-pulse" />
                        <span className="font-mono text-[8px] text-foreground/30 tracking-widest">
                          Secure Channel Active
                        </span>
                      </div>
                      <Magnetic>
                        <button
                          type="submit"
                          className="group inline-flex h-12 items-center justify-center gap-3 rounded-[10px] bg-cyan-glow px-8 font-mono text-[10px] tracking-widest text-bg-obsidian font-bold shadow-[0_0_18px_rgba(0,242,254,0.25)] hover:shadow-[0_0_32px_rgba(0,242,254,0.45)] transition-all duration-400"
                        >
                          <span>Transmit Message</span>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </Magnetic>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface CircuitNode {
  x: number;
  y: number;
  connections: number[]; // Indices of connected nodes
}

interface Signal {
  currentNode: number;
  nextNode: number;
  progress: number; // 0 to 1
  speed: number;
  color: string;
  size: number;
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", mediaQuery.matches ? () => {} : handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color definitions
    const colors = [
      "#00F2FE", // Cyan glow
      "#9B51E0", // Purple glow
      "#E5B5B8", // Copper gold
      "#00FF66", // Telemetry green
    ];

    // Generate a static network of PCB nodes
    const nodes: CircuitNode[] = [];
    const numNodes = 30;

    // Helper to generate a random node aligned with grid increments
    const gridStep = 48;
    const generateGridVal = (max: number) => {
      const steps = Math.floor(max / gridStep);
      return Math.floor(Math.random() * steps) * gridStep + gridStep / 2;
    };

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: generateGridVal(width),
        y: generateGridVal(height),
        connections: [],
      });
    }

    // Connect close nodes together with orthagonal bends
    nodes.forEach((node, idx) => {
      // Find 2 closest nodes
      const distances = nodes
        .map((otherNode, otherIdx) => ({
          idx: otherIdx,
          dist: Math.hypot(node.x - otherNode.x, node.y - otherNode.y),
        }))
        .filter((item) => item.idx !== idx)
        .sort((a, b) => a.dist - b.dist);

      // Connect to the top 2 closest
      const numConnections = Math.min(2, distances.length);
      for (let c = 0; c < numConnections; c++) {
        const targetIdx = distances[c].idx;
        if (!node.connections.includes(targetIdx)) {
          node.connections.push(targetIdx);
        }
      }
    });

    // Active electrical signal charges running on traces
    let signals: Signal[] = [];
    const maxSignals = 15;

    const spawnSignal = (): Signal => {
      const startNode = Math.floor(Math.random() * nodes.length);
      const node = nodes[startNode];
      const targetIdx = node.connections[Math.floor(Math.random() * node.connections.length)] ?? 0;
      return {
        currentNode: startNode,
        nextNode: targetIdx,
        progress: 0,
        speed: Math.random() * 0.015 + 0.008,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1.5,
      };
    };

    // Initialize signals
    for (let i = 0; i < maxSignals; i++) {
      signals.push(spawnSignal());
    }

    const drawPCBTrace = (c: CanvasRenderingContext2D, n1: CircuitNode, n2: CircuitNode) => {
      c.beginPath();
      c.moveTo(n1.x, n1.y);

      // Draw standard orthagonal PCB trace (45 degree bend)
      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        // Bend horizontally, then vertically
        const midX = n1.x + Math.sign(dx) * Math.abs(dy);
        c.lineTo(midX, n2.y);
      } else {
        // Bend vertically, then horizontally
        const midY = n1.y + Math.sign(dy) * Math.abs(dx);
        c.lineTo(n2.x, midY);
      }

      c.lineTo(n2.x, n2.y);
      c.strokeStyle = "rgba(155, 81, 224, 0.06)";
      c.lineWidth = 1;
      c.stroke();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw static PCB traces
      nodes.forEach((node) => {
        node.connections.forEach((connIdx) => {
          drawPCBTrace(ctx, node, nodes[connIdx]);
        });
      });

      // 2. Draw static nodes (glowing gold micro-junctions)
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(229, 181, 184, 0.3)"; // gold trace highlight
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 0.75, 0, Math.PI * 2);
        ctx.fillStyle = "var(--color-gold-trace)";
        ctx.fill();
      });

      // 3. Update and draw electric sparks (signals)
      signals.forEach((sig, idx) => {
        sig.progress += sig.speed;

        // Reset if reached target node
        if (sig.progress >= 1) {
          const nextNode = nodes[sig.nextNode];
          if (nextNode.connections.length > 0) {
            sig.currentNode = sig.nextNode;
            sig.nextNode = nextNode.connections[Math.floor(Math.random() * nextNode.connections.length)] ?? 0;
            sig.progress = 0;
            sig.speed = Math.random() * 0.015 + 0.008;
          } else {
            signals[idx] = spawnSignal();
          }
        }

        // Calculate current position along the orthagonal trace path
        const n1 = nodes[sig.currentNode];
        const n2 = nodes[sig.nextNode];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;

        let posX = n1.x;
        let posY = n1.y;

        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal mid-bend path
          const midX = n1.x + Math.sign(dx) * Math.abs(dy);
          // Split progress in half
          if (sig.progress < 0.5) {
            const p = sig.progress * 2;
            posX = n1.x + (midX - n1.x) * p;
            posY = n1.y + (n2.y - n1.y) * p;
          } else {
            const p = (sig.progress - 0.5) * 2;
            posX = midX + (n2.x - midX) * p;
            posY = n2.y;
          }
        } else {
          // Vertical mid-bend path
          const midY = n1.y + Math.sign(dy) * Math.abs(dx);
          if (sig.progress < 0.5) {
            const p = sig.progress * 2;
            posX = n1.x + (n2.x - n1.x) * p;
            posY = n1.y + (midY - n1.y) * p;
          } else {
            const p = (sig.progress - 0.5) * 2;
            posX = n2.x;
            posY = midY + (n2.y - midY) * p;
          }
        }

        // Draw glowing signal spark
        ctx.beginPath();
        ctx.arc(posX, posY, sig.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = sig.color + "22"; // 10% opacity glow radial
        ctx.fill();

        ctx.beginPath();
        ctx.arc(posX, posY, sig.size, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      // Spawn new electrical impulse on rapid scroll activity
      if (Math.random() < 0.3 && signals.length < maxSignals + 10) {
        signals.push(spawnSignal());
        // Limit total active signals
        if (signals.length > 30) signals.shift();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateAndDraw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 w-full h-full block"
    />
  );
}

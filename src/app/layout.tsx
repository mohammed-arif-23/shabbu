import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Lightfall from "@/components/ui/Lightfall";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Shabana Mirza J | ECE Portfolio",
  description: "Electronics & Communication Engineering student specializing in Embedded Systems, IoT, and Full-Stack Software Development. Salem, Tamil Nadu.",
  openGraph: {
    title: "Shabana Mirza J | ECE Portfolio",
    description: "Electronics & Communication Engineering student specializing in Embedded Systems, IoT, and Full-Stack Software Development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-bg-obsidian text-foreground overflow-x-hidden">

        {/* ── Global Background System ── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

          {/* Layer 1: WebGL Lightfall streaks */}
          <div className="absolute inset-0 z-0">
            <Lightfall
              colors={['#00F2FE', '#9B51E0', '#00FF66', '#D4A853']}
              backgroundColor="#08070A"
              speed={0.3}
              streakCount={5}
              streakWidth={0.6}
              streakLength={1.6}
              glow={0.7}
              density={0.3}
              twinkle={0.8}
              zoom={2.8}
              backgroundGlow={0.15}
              opacity={0.18}
              mouseInteraction={true}
              mouseStrength={0.6}
              mouseRadius={0.5}
            />
          </div>

          {/* Layer 2: Premium radial vignette — darkens edges */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(155,81,224,0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,242,254,0.04) 0%, transparent 60%), radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(8,7,10,0.7) 100%)"
            }}
          />

          {/* Layer 3: Subtle dot grid — very low opacity */}
          <div className="absolute inset-0 z-10 pcb-dot-grid opacity-[0.35]" />

          {/* Layer 4: Fine grid lines */}
          <div className="absolute inset-0 z-10 pcb-grid-lines opacity-[0.15]" />

          {/* Layer 5: Large deep ambient glows */}
          <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-purple-glow/4 blur-[180px] z-10" />
          <div className="absolute top-[40%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-cyan-glow/3 blur-[160px] z-10" />
          <div className="absolute -bottom-[10%] left-[20%] w-[50vw] h-[40vw] rounded-full bg-purple-glow/3 blur-[140px] z-10" />

          {/* Layer 6: Horizontal noise grain overlay for film texture */}
          <div
            className="absolute inset-0 z-20 opacity-[0.025]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
              backgroundSize: "256px 256px",
            }}
          />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}

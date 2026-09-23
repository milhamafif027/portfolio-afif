"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "../../data/project";

// Konfigurasi gradasi dari sudut kanan (tebal) menipis ke sudut kiri bawah (transparan)
const cardThemes = [
  {
    // Vibrant Crimson Red (Kartu 1 di referensi)
    gradient: "from-red-600/85 via-rose-700/40 to-transparent",
    hoverBorder:
      "hover:border-red-500/60 hover:shadow-[0_10px_35px_rgba(239,68,68,0.2)]",
    badge: "bg-red-500/25 text-red-100 border-red-400/30",
    accent: "text-red-300",
  },
  {
    // Steel Slate / Blue-Gray (Kartu 2 di referensi)
    gradient: "from-slate-500/90 via-slate-700/45 to-transparent",
    hoverBorder:
      "hover:border-slate-400/60 hover:shadow-[0_10px_35px_rgba(148,163,184,0.2)]",
    badge: "bg-slate-500/25 text-slate-100 border-slate-400/30",
    accent: "text-slate-300",
  },
  {
    // Deep Wine / Maroon (Kartu 3 di referensi)
    gradient: "from-rose-700/85 via-red-900/45 to-transparent",
    hoverBorder:
      "hover:border-rose-500/60 hover:shadow-[0_10px_35px_rgba(244,63,94,0.2)]",
    badge: "bg-rose-500/25 text-rose-100 border-rose-400/30",
    accent: "text-rose-300",
  },
  {
    // Deep Emerald / Teal
    gradient: "from-teal-600/85 via-emerald-800/40 to-transparent",
    hoverBorder:
      "hover:border-teal-400/60 hover:shadow-[0_10px_35px_rgba(20,184,166,0.2)]",
    badge: "bg-teal-500/25 text-teal-100 border-teal-400/30",
    accent: "text-teal-300",
  },
  {
    // Warm Amber Gold
    gradient: "from-amber-600/85 via-orange-800/40 to-transparent",
    hoverBorder:
      "hover:border-amber-400/60 hover:shadow-[0_10px_35px_rgba(245,158,11,0.2)]",
    badge: "bg-amber-500/25 text-amber-100 border-amber-400/30",
    accent: "text-amber-300",
  },
  {
    // Indigo / Violet
    gradient: "from-indigo-600/85 via-purple-800/40 to-transparent",
    hoverBorder:
      "hover:border-indigo-400/60 hover:shadow-[0_10px_35px_rgba(99,102,241,0.2)]",
    badge: "bg-indigo-500/25 text-indigo-100 border-indigo-400/30",
    accent: "text-indigo-300",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0, 1], [0.92, 1]);
  const y = useTransform(smoothProgress, [0, 1], [90, 0]);
  const rotateX = useTransform(smoothProgress, [0, 1], [10, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 1], [0.4, 0.85, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#050507] py-32 px-6 [perspective:1200px] overflow-hidden border-t border-white/[0.08]"
    >
      <motion.div
        style={{
          scale,
          y,
          rotateX,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="max-w-6xl mx-auto origin-top will-change-transform"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-widest mb-3.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              Selected Portfolio
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-neutral-100">
              Featured{" "}
              <span className="font-serif italic font-normal text-neutral-400 text-[1.08em] px-1">
                Works
              </span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed">
            Case studies covering backend architecture, high-performance web
            systems, and machine learning implementations.
          </p>
        </div>

        {/* 3-Column Cinema Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const theme = cardThemes[i % cardThemes.length];

            return (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950 border border-white/[0.12] flex items-center justify-center p-6 text-center transition-all duration-500 ${theme.hoverBorder}`}
              >
                {/* 1. Foto Asli Proyek (Grayscale bersih agar menyerap gradasi) */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center grayscale contrast-110 opacity-80 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-900" />
                )}

                {/* 2. Gradasi Sudut Kanan Atas (Tebal) -> Sudut Kiri Bawah (Menipis) */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-bl ${theme.gradient} mix-blend-color opacity-90 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none`}
                />

                {/* 3. Penguat Warna Gradasi (Multiply lembut dari kanan atas) */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-bl ${theme.gradient} mix-blend-multiply opacity-55 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none`}
                />

                {/* 4. Backdrop Lembut Saat Hover (Membuat tulisan tetap terbaca saat foto asli muncul) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />

                {/* Tech Badge (Pojok Kiri Atas) */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md border text-[10.5px] font-mono tracking-tight backdrop-blur-md transition-colors ${theme.badge}`}
                  >
                    {project.tech.split(",")[0]}
                  </span>
                </div>

                {/* Nomor Urut (Pojok Kanan Atas) */}
                <span className="absolute top-4 right-4 z-10 px-2 py-0.5 rounded text-[11px] font-mono text-white/90 bg-black/30 border border-white/20 backdrop-blur-md">
                  {(i + 1).toString().padStart(2, "0")}
                </span>

                {/* 5. Center Typography (Monogram & Title ala Cinema Poster) */}
                <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-[85%]">
                  {/* Headline Monogram */}
                  <span className="text-2xl sm:text-3xl font-black tracking-[-0.03em] text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:-translate-y-1">
                    {project.shortTitle || project.title.split(" ")[0]}
                  </span>

                  {/* Title Lengkap */}
                  <span className="text-xs font-medium tracking-tight text-neutral-100/90 group-hover:text-white transition-colors duration-300 line-clamp-1 mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {project.title}
                  </span>

                  {/* Tombol View Case */}
                  <div
                    className={`mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider uppercase ${theme.accent} opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300`}
                  >
                    <span>View Case</span>
                    <span className="text-xs">→</span>
                  </div>
                </div>

                {/* Hairline Highlight Atas */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:via-white/60 transition-all duration-500 pointer-events-none"
                />
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

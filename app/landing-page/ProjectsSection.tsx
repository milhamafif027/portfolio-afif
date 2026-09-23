"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import { projects } from "../../data/project";

const cardThemes = [
  {
    // Vibrant Crimson Red
    gradient: "from-red-600/80 via-rose-700/35 to-transparent",
    hoverBorder: "group-hover:border-red-500/40",
    badge: "bg-red-500/20 text-red-200 border-red-400/30",
    accent: "text-red-300",
  },
  {
    // Steel Slate / Blue-Gray
    gradient: "from-slate-500/85 via-slate-700/40 to-transparent",
    hoverBorder: "group-hover:border-slate-400/40",
    badge: "bg-slate-500/20 text-slate-200 border-slate-400/30",
    accent: "text-slate-300",
  },
  {
    // Deep Wine / Maroon
    gradient: "from-rose-700/80 via-red-900/40 to-transparent",
    hoverBorder: "group-hover:border-rose-500/40",
    badge: "bg-rose-500/20 text-rose-200 border-rose-400/30",
    accent: "text-rose-300",
  },
  {
    // Deep Emerald / Teal
    gradient: "from-teal-600/80 via-emerald-800/35 to-transparent",
    hoverBorder: "group-hover:border-teal-400/40",
    badge: "bg-teal-500/20 text-teal-200 border-teal-400/30",
    accent: "text-teal-300",
  },
  {
    // Warm Amber Gold
    gradient: "from-amber-600/80 via-orange-800/35 to-transparent",
    hoverBorder: "group-hover:border-amber-400/40",
    badge: "bg-amber-500/20 text-amber-200 border-amber-400/30",
    accent: "text-amber-300",
  },
  {
    // Indigo / Violet
    gradient: "from-indigo-600/80 via-purple-800/35 to-transparent",
    hoverBorder: "group-hover:border-indigo-400/40",
    badge: "bg-indigo-500/20 text-indigo-200 border-indigo-400/30",
    accent: "text-indigo-300",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Apple-style smooth ease-out
    },
  },
};

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Spring physics yang lembut dan stabil
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Transformasi mikro yang elegan (tanpa rotasi 3D miring yang berlebihan)
  const y = useTransform(smoothProgress, [0, 1], [35, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.4, 1], [0.5, 0.88, 1]);
  const scale = useTransform(smoothProgress, [0, 1], [0.985, 1]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-[#050507] py-28 px-6 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background Soft Ambient Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-neutral-800/10 rounded-full blur-[140px] -z-10"
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="max-w-6xl mx-auto will-change-transform"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-widest mb-3.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
        </motion.div>

        {/* 3-Column Cinema Showcase Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => {
            const theme = cardThemes[i % cardThemes.length];

            return (
              <motion.a
                key={i}
                variants={cardVariants}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -4,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className={`group relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#0c0d12] border border-white/[0.08] flex items-center justify-center p-6 text-center transition-colors duration-300 ${theme.hoverBorder} hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)]`}
              >
                {/* 1. Foto Asli Proyek (Grayscale jernih) */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center grayscale contrast-110 opacity-80 group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-900" />
                )}

                {/* 2. Gradasi Sudut Kanan Atas (Tebal) -> Sudut Kiri Bawah (Menipis) */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-bl ${theme.gradient} mix-blend-color opacity-90 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none`}
                />

                {/* 3. Penguat Warna Gradasi */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-bl ${theme.gradient} mix-blend-multiply opacity-55 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none`}
                />

                {/* 4. Backdrop Lembut Saat Hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
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
                <span className="absolute top-4 right-4 z-10 px-2 py-0.5 rounded text-[11px] font-mono text-white/80 bg-black/30 border border-white/10 backdrop-blur-md">
                  {(i + 1).toString().padStart(2, "0")}
                </span>

                {/* 5. Center Typography Monogram */}
                <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-[85%]">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:-translate-y-0.5">
                    {project.shortTitle || project.title.split(" ")[0]}
                  </span>

                  <span className="text-xs font-medium tracking-tight text-neutral-100/90 group-hover:text-white transition-colors duration-300 line-clamp-1 mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {project.title}
                  </span>

                  {/* Tombol View Case */}
                  <div
                    className={`mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono font-medium tracking-wider uppercase ${theme.accent} opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300`}
                  >
                    <span>View Case</span>
                    <span className="text-xs">→</span>
                  </div>
                </div>

                {/* Top Hairline Highlight */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all duration-500 pointer-events-none"
                />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

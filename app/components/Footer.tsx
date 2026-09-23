"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full pt-20 pb-12 px-4 sm:px-6 bg-[#070708] text-white overflow-hidden border-t border-white/[0.08]">
      {/* Background Soft Ambient Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-neutral-800/15 rounded-full blur-[140px] -z-1"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Glassmorphic Card */}
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#0c0e14]/95 to-[#07090d]/95 border border-white/[0.08] backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Top Hairline Highlight */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          />

          {/* CTA Banner Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Initiate Dialogue
              </div>
              <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight text-neutral-100">
                Let&apos;s build scalable{" "}
                <span className="font-serif italic font-normal text-neutral-400 text-[1.08em] px-1">
                  architectures
                </span>{" "}
                together.
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:milhamafif027@gmail.com"
                className="group relative inline-flex items-center justify-center h-11 px-7 rounded-xl text-xs font-medium uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact Directly
                  <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* Links & Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-white/[0.06]">
            {/* Column Left: Brand & Credentials */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-white/10 text-white flex items-center justify-center font-mono text-xs font-bold">
                  //
                </div>
                <span className="font-bold text-lg tracking-tight text-white">
                  AFIF<span className="text-neutral-500 font-mono">.DEV</span>
                </span>
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                Muhammad Ilham Afif, S.Kom. — Informatics Engineering graduate
                from UNNES. Architecting high-reliability backends with Java
                Spring Boot, intelligent systems, and Next.js applications.
              </p>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2 text-neutral-400">
                <a
                  href="https://github.com/milhamafif027"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:text-white hover:border-white/20 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                <a
                  href="https://linkedin.com/in/muhammadilhamafif/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:text-white hover:border-white/20 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75c-.97 0-1.76.78-1.76 1.75s.79 1.76 1.76 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column Right: Directory */}
            <div className="md:col-span-6 grid grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4">
                  Navigation
                </h5>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400 font-normal">
                  <li>
                    <a
                      href="#top"
                      className="hover:text-white transition-colors"
                    >
                      Index / Top
                    </a>
                  </li>
                  <li>
                    <a
                      href="#projects"
                      className="hover:text-white transition-colors"
                    >
                      Featured Work
                    </a>
                  </li>
                  <li>
                    <a
                      href="#experience"
                      className="hover:text-white transition-colors"
                    >
                      Experience
                    </a>
                  </li>
                  <li>
                    <a
                      href="#organizations"
                      className="hover:text-white transition-colors"
                    >
                      Leadership
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4">
                  Ecosystem
                </h5>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400 font-normal">
                  <li>Java Spring Boot</li>
                  <li>Next.js & React</li>
                  <li>PostgreSQL</li>
                  <li>Computer Vision</li>
                </ul>
              </div>

              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-4">
                  Status
                </h5>
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-800/50 text-[11px] font-mono text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open to Roles
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-mono">
                    Available for full-time software engineering opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Meta */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <p>© 2026 Muhammad Ilham Afif. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <span>Next.js App Router</span>
              <span>•</span>
              <span>Three.js Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Editorial Architectural Watermark */}
      <div
        aria-hidden="true"
        className="select-none pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 text-[14vw] font-black text-white/[0.03] tracking-tighter whitespace-nowrap z-0 [mask-image:linear-gradient(to_bottom,white_20%,transparent_80%)]"
      >
        AFIF.DEV
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 30);
    });
  }, [scrollY]);

  const navLinks = [
    { name: "Work", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Leadership", href: "#organizations" },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Elastic Floating Capsule */}
      <motion.nav
        initial={{ y: -70, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 14,
          mass: 0.8,
          delay: 0.1,
        }}
        className={`pointer-events-auto inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full border transition-all duration-300 shadow-xl ${
          scrolled
            ? "bg-white/90 border-slate-200/80 backdrop-blur-xl shadow-slate-200/50"
            : "bg-white/75 border-slate-200/60 backdrop-blur-lg shadow-slate-200/30"
        }`}
      >
        {/* Left Circular Monogram / Brand Icon dengan Efek Rotasi & Spring */}
        <Link href="#top" aria-label="Home" className="relative group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="6" />
              <path d="M3.6 15c2.8 2.8 8.6 3.6 13.8.8s7-6.2 4.2-9-8.6-3.6-13.8-.8-7 6.2-4.2 9z" />
            </svg>
          </motion.div>
        </Link>

        {/* Center Links dengan Transisi Hover Pill */}
        <div
          className="relative flex items-center px-1 sm:px-3 space-x-1 sm:space-x-2 text-xs sm:text-[13.5px] font-medium text-slate-600"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {navLinks.map((link) => {
            const isHovered = hoveredTab === link.name;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredTab(link.name)}
                className={`relative px-3 py-1.5 rounded-full transition-colors duration-200 ${
                  isHovered
                    ? "text-slate-950 font-semibold"
                    : "hover:text-slate-950"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {/* Latar belakang animasi halus saat di-hover */}
                {isHovered && (
                  <motion.span
                    layoutId="hoverPill"
                    aria-hidden="true"
                    className="absolute inset-0 bg-slate-100 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.name}
              </motion.a>
            );
          })}

          <motion.a
            href="https://github.com/milhamafif027"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="hidden sm:inline px-3 py-1.5 hover:text-slate-950 transition-colors duration-200"
          >
            GitHub
          </motion.a>
        </div>

        {/* Right CTA Button dengan Efek Shimmer & Spring */}
        <motion.a
          href="mailto:milhamafif027@gmail.com"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 15 }}
          className="group relative overflow-hidden bg-slate-900 text-white font-medium text-xs sm:text-[13px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 whitespace-nowrap"
        >
          {/* Shimmer sweep effect */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          />
          <span className="relative z-10 flex items-center gap-1.5">
            <span>milhamafif027@gmail.com</span>
            <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">
              ↗
            </span>
          </span>
        </motion.a>
      </motion.nav>
    </header>
  );
}

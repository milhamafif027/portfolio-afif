"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 30);
    });
  }, [scrollY]);

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
        className={`pointer-events-auto inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full border transition-all duration-300 shadow-2xl ${
          scrolled
            ? "bg-[#0c0d12]/90 border-white/15 backdrop-blur-xl shadow-black/80"
            : "bg-[#14161f]/75 border-white/10 backdrop-blur-lg shadow-black/50"
        }`}
      >
        {/* Left Circular Monogram / Brand Icon */}
        <Link href="#top" aria-label="Home" className="relative group">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 10 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-950"
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

        {/* Center Links */}
        <div className="flex items-center px-2 sm:px-4 space-x-4 sm:space-x-7 text-xs sm:text-[13.5px] font-medium text-neutral-300">
          {[
            { name: "Work", href: "#projects" },
            { name: "Experience", href: "#experience" },
            { name: "Leadership", href: "#organizations" },
          ].map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              className="relative py-1 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </motion.a>
          ))}

          <motion.a
            href="https://github.com/milhamafif027"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -1 }}
            className="hidden sm:inline hover:text-white transition-colors duration-200"
          >
            GitHub
          </motion.a>
        </div>

        {/* Right CTA Button */}
        <motion.a
          href="mailto:milhamafif027@gmail.com"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 350, damping: 15 }}
          className="group relative overflow-hidden bg-white text-neutral-950 font-medium text-xs sm:text-[13px] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-shadow duration-300 whitespace-nowrap"
        >
          {/* Shimmer sweep */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none"
          />
          <span className="relative z-10 flex items-center gap-1.5">
            <span>milhamafif027@gmail.com</span>
            <span className="text-[10px] text-neutral-500 group-hover:text-black transition-colors">
              ↗
            </span>
          </span>
        </motion.a>
      </motion.nav>
    </header>
  );
}

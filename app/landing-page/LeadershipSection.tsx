"use client";

import { motion, type Variants } from "framer-motion";

const leadershipItems = [
  {
    organization: "HIMA ILKOM UNNES",
    role: "Strategic Planning",
    period: "Academic Governance",
    description:
      "Formulated onboarding architectures and character-building orientation curricula for incoming CS cohorts, aligning objectives with departmental KPIs.",
  },
  {
    organization: "Computer Science Sport",
    role: "Project Leadership",
    period: "Campus Program",
    description:
      "Acted as PIC for department-wide athletic tournaments, directing multi-division logistics, stakeholder alignments, and smooth on-ground execution.",
  },
  {
    organization: "Data Analyst Workshop",
    role: "Operations Coordinator",
    period: "Technical Initiative",
    description:
      "Supervised technical execution, hands-on environment setup, and participant coordination for specialized data analysis workshops.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function LeadershipSection() {
  return (
    <section
      id="organizations"
      className="relative w-full py-28 px-6 bg-[#070708] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background Soft Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] bg-neutral-800/10 rounded-full blur-[140px] -z-10"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-400 text-xs font-mono uppercase tracking-widest mb-3.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              Impact & Community
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-neutral-100">
              Leadership &{" "}
              <span className="font-serif italic font-normal text-neutral-400 text-[1.08em] px-1">
                Initiatives
              </span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-[15px] max-w-md leading-relaxed">
            Demonstrated track record in student governance, technical
            mentorship, and institutional program execution.
          </p>
        </motion.div>

        {/* 3-Column Glassmorphic Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {leadershipItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl p-7 sm:p-8 bg-neutral-900/60 border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Top Highlight Hairline */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all duration-500 pointer-events-none"
              />

              <div>
                {/* Meta Row: Role Badge & Index */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-xs font-mono font-medium tracking-tight text-neutral-300">
                    {item.role}
                  </span>
                  <span className="font-mono text-xs text-neutral-500 tracking-wider">
                    //0{idx + 1}
                  </span>
                </div>

                {/* Organization Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-100 tracking-tight mb-3 group-hover:text-white transition-colors duration-200">
                  {item.organization}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom Track Meta */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>{item.period}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-neutral-300 transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";

const experiences = [
  {
    period: "2024",
    type: "Industry Internship",
    company: "PT Tanjung Enim Lestari Pulp and Paper",
    role: "Software Engineering Intern",
    location: "On-site • Engineering Dept.",
    summary:
      "Engineered an end-to-end Computerized Maintenance Management System (CMMS) to automate industrial preventive maintenance schedules and operational workflows.",
    highlights: [
      "Developed fullstack micro-applications utilizing Next.js on the client and Java Spring Boot on the backend service layers.",
      "Architected robust RESTful API endpoints connected to relational SQL databases for automated report synthesis and audit logging.",
      "Conducted User Acceptance Testing (UAT) directly with cross-functional plant operators to iterate on feature usability.",
      "Collaborated on code review standards and supported debugging across deployment environments.",
    ],
    tech: ["Java Spring Boot", "Next.js", "PostgreSQL", "REST APIs"],
  },
  {
    period: "2024",
    type: "MSIB Batch 7",
    company: "Metrodata Academy",
    role: "Full Stack Java Developer",
    location: "Hybrid • Intensive Cohort",
    summary:
      "Completed a rigorous five-month professional engineering track focusing on enterprise software patterns, automated testing, and scalable Java architecture.",
    highlights: [
      "Implemented enterprise business logic following clean architecture, design patterns, and SOLID principles.",
      "Designed and deployed secure REST APIs backed by Spring Security, JWT authentication, and JPA/Hibernate.",
      "Built responsive client interfaces and integrated backend contracts with real-time feedback loops.",
    ],
    tech: ["Java", "Spring Framework", "Hibernate", "Docker", "Git"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
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

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative w-full py-28 px-6 bg-[#070708] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background Soft Ambient Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 translate-x-1/2 w-[550px] h-[300px] bg-slate-700/10 rounded-full blur-[140px] -z-10"
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
              Career Journey
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-neutral-100">
              Professional{" "}
              <span className="font-serif italic font-normal text-neutral-400 text-[1.08em] px-1">
                Experience
              </span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-[15px] max-w-md leading-relaxed">
            Hands-on engineering tracks across industrial enterprise automation
            and fullstack software architecture.
          </p>
        </motion.div>

        {/* Experience Timeline Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="space-y-7"
        >
          {experiences.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl p-8 sm:p-11 bg-neutral-900/60 border border-white/[0.08] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Top Highlight Hairline */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all duration-500 pointer-events-none"
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column: Organization & Metadata */}
                <div className="md:col-span-4 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] font-mono tracking-tight text-neutral-300 mb-3">
                      <span>{item.period}</span>
                      <span className="text-neutral-600">•</span>
                      <span className="text-neutral-400">{item.type}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 tracking-tight leading-snug group-hover:text-white transition-colors">
                      {item.company}
                    </h3>
                    <p className="text-sm font-medium text-neutral-300 mt-1">
                      {item.role}
                    </p>
                    <p className="text-xs font-mono text-neutral-500 mt-0.5">
                      {item.location}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 md:pt-0">
                    {item.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] border border-white/[0.06] text-neutral-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Narrative & Bullets */}
                <div className="md:col-span-8 space-y-6">
                  <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed">
                    {item.summary}
                  </p>

                  <ul className="space-y-3.5 text-xs sm:text-[13.5px] text-neutral-400 leading-relaxed">
                    {item.highlights.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-neutral-300 transition-colors shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

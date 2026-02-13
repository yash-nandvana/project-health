"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "📦",
    name: "Dependencies",
    desc: "Detects outdated packages, classifies them by severity (major/minor/patch), and gives you the exact update command.",
    weight: "25%",
  },
  {
    icon: "🔀",
    name: "Git Health",
    desc: "Checks untracked files, days since last commit, unpushed changes, and current branch status in one glance.",
    weight: "20%",
  },
  {
    icon: "🔍",
    name: "Code Quality",
    desc: "Scans every source file for TODO, FIXME, HACK, and BUG comments. Groups by file so you know where the debt lives.",
    weight: "15%",
  },
  {
    icon: "🔐",
    name: "Environment",
    desc: "Compares your .env against .env.example. Flags missing keys or undocumented secrets before they break production.",
    weight: "20%",
  },
  {
    icon: "🧪",
    name: "Tests",
    desc: "Verifies test setup, finds test files, and checks for a test framework config. Optionally runs tests and reports results.",
    weight: "10%",
  },
  {
    icon: "🛡️",
    name: "Security",
    desc: "Runs npm audit, parses vulnerabilities by severity, and surfaces actionable fix commands from the audit output.",
    weight: "10%",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Features() {
  return (
    <section id="features" className="max-w-[1100px] mx-auto py-[100px] px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--green)] mb-4">Features</p>
        <h2
          className="text-[clamp(28px,4vw,44px)] font-extrabold leading-tight tracking-[-0.02em] text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Six health indicators.
          <br />
          One score.
        </h2>
        <p className="text-[14px] text-[var(--text-dim)] max-w-[500px] leading-[1.8]">
          Each checker runs in parallel. Results are weighted, aggregated, and graded A–F so you know exactly where to focus.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[60px]"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {features.map((f) => (
          <motion.div
            key={f.name}
            variants={item}
            className="group bg-[var(--surface)] border border-[var(--border)] rounded-xl p-7 relative overflow-hidden cursor-default transition-all duration-300 hover:border-[var(--border2)] hover:-translate-y-0.5"
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(0,255,135,0.04) 0%, transparent 60%)" }}
              aria-hidden
            />
            <span className="text-[28px] block mb-4 relative z-10">{f.icon}</span>
            <div className="font-bold text-[15px] text-white mb-2 relative z-10" style={{ fontFamily: "var(--font-display)" }}>
              {f.name}
            </div>
            <div className="text-[12px] text-[var(--text-dim)] leading-[1.7] relative z-10">{f.desc}</div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-[var(--green)] opacity-70 relative z-10">
              ⬥ Weight: {f.weight}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

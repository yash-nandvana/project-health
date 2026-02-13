"use client";

import { motion } from "framer-motion";

const tools = [
  { icon: "📦", label: "npm outdated — for dependencies" },
  { icon: "🔀", label: "git status / git log — for repo state" },
  { icon: "🔍", label: 'grep -r "TODO" — for code smell' },
  { icon: "🛡️", label: "npm audit — for vulnerabilities" },
  { icon: "🧪", label: "npm test — for test coverage" },
];

export default function Problem() {
  return (
    <div className="border-t border-b border-[var(--border)]">
      <section className="max-w-[1100px] mx-auto py-[100px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--green)] mb-4">The Problem</p>
          <h2
            className="text-[clamp(28px,4vw,44px)] font-extrabold leading-tight tracking-[-0.02em] text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stop juggling 5 tools
            <br />
            for one answer.
          </h2>
          <p className="text-[14px] text-[var(--text-dim)] max-w-[500px] leading-[1.8]">
            Every developer checks the same things daily — spread across different CLIs, dashboards, and tabs. check-project-health bundles it all.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-[1fr_60px_1fr] gap-10 items-center mt-[60px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col gap-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.label}
                className="flex items-center gap-3 py-3 px-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[12px] text-[var(--text-dim)] relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <span className="text-lg">{tool.icon}</span>
                <span>{tool.label}</span>
                <span className="absolute right-3.5 text-[#ff4a4a66] text-sm">✕</span>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:block text-center text-2xl text-[var(--text-muted)]">→</div>

          <motion.div
            className="bg-[rgba(0,255,135,0.04)] border border-[rgba(0,255,135,0.2)] rounded-xl py-8 px-8 text-center"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="text-5xl block mb-4">🏥</span>
            <h3 className="text-xl text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
              check-project-health
            </h3>
            <p className="text-[12px] text-[var(--text-dim)]">
              One command.
              <br />
              One score.
              <br />
              All the context you need.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

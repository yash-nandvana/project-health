"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "1",
    title: "Run the command",
    desc: 'Type check-project-health in any project directory. No config file needed. It auto-detects your stack.',
  },
  {
    num: "2",
    title: "Parallel analysis",
    desc: "All 6 checkers run simultaneously using Promise.allSettled — results in seconds, not minutes. No checker can crash the rest.",
  },
  {
    num: "3",
    title: "Scored report",
    desc: "Get a weighted score, letter grade, per-checker breakdown, and the most impactful fixes ranked by score improvement.",
  },
];

export default function HowItWorks() {
  return (
    <div className="border-t border-b border-[var(--border)]">
      <section id="how" className="max-w-[1100px] mx-auto py-[100px] px-6 md:px-10">
        <motion.div
          className="text-center max-w-[600px] mx-auto mb-[60px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--green)] mb-4">How it works</p>
          <h2
            className="text-[clamp(28px,4vw,44px)] font-extrabold leading-tight tracking-[-0.02em] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Three steps.
            <br />
            Total clarity.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 mt-[60px] relative">
          {/* Connector line - desktop only */}
          <div
            className="hidden md:block absolute top-8 left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-px bg-gradient-to-r from-[var(--green)] to-[var(--cyan)] opacity-30"
            aria-hidden
          />
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="text-center py-0 px-8 md:px-8 mb-10 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full border border-[var(--border2)] bg-[var(--surface)] flex items-center justify-center text-xl font-extrabold text-[var(--green)] mx-auto mb-6 relative z-10"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.num}
              </motion.div>
              <div className="font-bold text-base text-white mb-2.5" style={{ fontFamily: "var(--font-display)" }}>
                {step.title}
              </div>
              <p className="text-[12px] text-[var(--text-dim)] leading-[1.7]">
                {step.num === "1" ? (
                  <>
                    Type <code className="text-[var(--green)]">check-project-health</code> in any project directory. No config file needed. It auto-detects your stack.
                  </>
                ) : (
                  step.desc
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

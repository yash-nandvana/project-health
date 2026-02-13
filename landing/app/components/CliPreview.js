"use client";

import { motion } from "framer-motion";

const lines = [
  "╭─────────────────────────────────────╮",
  "│   🏥 PROJECT HEALTH REPORT          │",
  "│   Score: 78/100   Grade: B          │",
  "│   Status: Good                      │",
  "╰─────────────────────────────────────╯",
  "",
  "┌──────────────────┬────────┬──────────┬────────────────────────────┐",
  "│ Checker           │ Score  │ Status   │ Summary                    │",
  "├──────────────────┼────────┼──────────┼────────────────────────────┤",
  "│ Dependencies     │ 85     │ ✅ ok    │ 2 packages outdated         │",
  "│ Git              │ 90     │ ✅ ok    │ Repository in good shape    │",
  "│ Code Quality     │ 72     │ ⚠️ warn  │ 5 TODOs across 2 files      │",
  "└──────────────────┴────────┴──────────┴────────────────────────────┘",
];

export default function CliPreview() {
  return (
    <section className="py-24 px-6" id="preview">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-zinc-100 text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          See it in action
        </motion.h2>
        <motion.p
          className="text-zinc-400 text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Run <code className="text-cyan-400 font-mono text-sm px-1.5 py-0.5 rounded bg-zinc-800">check-project-health</code> in any project directory.
        </motion.p>
        <motion.div
          className="rounded-2xl bg-zinc-900 border border-zinc-700 p-6 overflow-x-auto"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="font-mono text-sm text-zinc-300 space-y-1">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {line || "\u00A0"}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

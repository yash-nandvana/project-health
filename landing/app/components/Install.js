"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const commands = [
  { num: "1", text: "npm install -g check-project-health" },
  { num: "2", text: "cd your-project && check-project-health" },
];

function copyToClipboard(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  return Promise.reject(new Error("Clipboard not available"));
}

export default function Install() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    copyToClipboard(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <section id="install" className="max-w-[1100px] mx-auto py-[100px] px-6 md:px-10 text-center">
      <motion.div
        className="bg-[var(--surface)] border border-[var(--border2)] rounded-2xl py-14 px-6 md:px-10 max-w-[600px] mx-auto relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[rgba(0,255,135,0.15)] via-[rgba(0,212,255,0.1)] to-transparent -z-10"
          aria-hidden
        />
        <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--green)] mb-3">Get started</p>
        <div className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Ready in 10 seconds.
        </div>
        <p className="text-[12px] text-[var(--text-dim)] mb-8">Install globally, run anywhere.</p>

        {commands.map((cmd, index) => (
          <motion.div
            key={cmd.text}
            className="flex items-center gap-3 bg-[#080808] border border-[var(--border)] rounded-lg py-3.5 px-4 mb-3 text-left"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-[11px] text-[var(--text-muted)] min-w-[18px]">{cmd.num}</span>
            <code className="flex-1 text-[13px] text-[var(--green)]" style={{ fontFamily: "var(--font-mono)" }}>
              {cmd.text}
            </code>
            <button
              type="button"
              onClick={() => handleCopy(cmd.text, index)}
              className={`border rounded py-1.5 px-2.5 text-[10px] cursor-pointer transition-colors whitespace-nowrap ${
                copiedIndex === index
                  ? "border-[var(--green)] text-[var(--green)]"
                  : "border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--green)] hover:text-[var(--green)]"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {copiedIndex === index ? "✓ copied" : "copy"}
            </button>
          </motion.div>
        ))}

        <p className="text-[12px] text-[var(--text-dim)] mt-6">
          Requires Node.js 18+. Works on macOS, Linux, and Windows.
        </p>
      </motion.div>
    </section>
  );
}

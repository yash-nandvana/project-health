"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import GitHubStarButton from "./GitHubStarButton";

const INSTALL_CMD = "npm install -g check-project-health";

const terminalLines = [
  { type: "prompt", text: "check-project-health" },
  { type: "space" },
  { type: "bold", text: "  🏥  PROJECT HEALTH REPORT" },
  { type: "dim", text: "  ────────────────────────────────────" },
  { type: "dim", text: "  Analyzing 6 health indicators..." },
  { type: "space" },
  { type: "row", ok: true, name: "Dependencies  ", score: "92/100", dim: "1 package outdated (patch)" },
  { type: "row", ok: true, name: "Git           ", score: "88/100", dim: "Branch: main, 2 days since commit" },
  { type: "row", ok: false, warn: true, name: "Code Quality  ", score: "64/100", dim: "14 TODOs, 3 FIXMEs found" },
  { type: "row", ok: true, name: "Environment   ", score: "100/100", dim: ".env matches .env.example" },
  { type: "row", fail: true, name: "Tests         ", score: "30/100", dim: "No test configuration found" },
  { type: "row", ok: true, name: "Security      ", score: "95/100", dim: "1 low vulnerability" },
  { type: "space" },
  { type: "dim", text: "  ────────────────────────────────────" },
  { type: "summary", score: "78", grade: "B", dim: "(Good)" },
  { type: "space" },
  { type: "dim", text: "  💡 Top fix: Add jest.config.js to boost Tests score by +50" },
  { type: "cursor" },
];

function copyToClipboard(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  return Promise.reject(new Error("Clipboard not available"));
}

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-[120px] pb-20 px-6 md:px-10 text-center relative" aria-labelledby="hero-heading">
      <motion.div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,255,135,0.06)_0%,transparent_70%)] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="inline-flex items-center gap-2 bg-[rgba(0,255,135,0.06)] border border-[rgba(0,255,135,0.2)] rounded-full py-1.5 px-3.5 text-[11px] text-[var(--green)] tracking-[0.1em] uppercase mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-[pulse-dot_2s_infinite]" />
        v1.0.0 — open source
      </motion.div>

      <motion.h1
        id="hero-heading"
        className="text-[clamp(42px,7vw,80px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white mb-5"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        Your codebase
        <br />
        has a <em className="not-italic text-[var(--green)]">heartbeat.</em>
      </motion.h1>

      <motion.p
        className="text-[15px] text-[var(--text-dim)] max-w-[480px] mx-auto mb-12 leading-[1.8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        One command reveals everything wrong with your project. Dependencies, git health, security, tests — scored, graded, and fixed.
      </motion.p>

      <motion.div
        className="flex gap-3 justify-center flex-wrap mb-16"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <motion.button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2.5 bg-[var(--green)] text-black py-3.5 px-6 rounded-md text-[13px] font-bold tracking-wide border-0 cursor-pointer hover:bg-[var(--green-dim)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,255,135,0.3)] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>npm i -g check-project-health</span>
          <span className="opacity-60 text-[11px]">{copied ? "✓ copied" : "copy"}</span>
        </motion.button>
        <GitHubStarButton variant="hero" />
      </motion.div>

      {/* Terminal */}
      <motion.div
        className="w-full max-w-[720px] mx-auto text-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="bg-[#0c0c0c] border border-[var(--border2)] rounded-[10px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.03),0_0_60px_rgba(0,255,135,0.04)]">
          <div className="bg-[#161616] py-3 px-4 flex items-center gap-2 border-b border-[var(--border)]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c940]" />
            <span className="flex-1 text-center text-[11px] text-[var(--text-dim)] tracking-wider">bash — ~/my-project</span>
          </div>
          <div className="p-6 text-[12px] leading-[1.9] min-h-[320px]">
            {terminalLines.map((line, i) => (
              <TerminalLine key={i} line={line} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TerminalLine({ line, index }) {
  const delay = 0.2 + index * 0.12;

  if (line.type === "space") {
    return (
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        {"\u00A0"}
      </motion.span>
    );
  }

  if (line.type === "cursor") {
    return (
      <motion.span
        className="block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 0.2 }}
      >
        <span className="text-[var(--green)]">❯</span>{" "}
        <span className="inline-block w-2 h-[14px] bg-[var(--green)] align-middle ml-0.5 animate-[blink_1s_step-end_infinite]" />
      </motion.span>
    );
  }

  if (line.type === "prompt") {
    return (
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        <span className="text-[var(--green)]">❯</span> <span className="text-[var(--text)]">{line.text}</span>
      </motion.span>
    );
  }

  if (line.type === "bold") {
    return (
      <motion.span
        className="block font-bold text-white"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        {line.text}
      </motion.span>
    );
  }

  if (line.type === "dim") {
    return (
      <motion.span
        className="block text-[var(--text-dim)]"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        {line.text}
      </motion.span>
    );
  }

  if (line.type === "row") {
    const icon = line.fail ? "❌" : line.warn ? "⚠️ " : "✅";
    const scoreCls = line.fail ? "text-[var(--red)]" : line.warn ? "text-[var(--yellow)]" : "text-[var(--green)]";
    return (
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        {"  "}
        <span className={scoreCls}>{icon}</span> <span className="font-bold text-white">{line.name}</span>{" "}
        <span className={scoreCls}>{line.score}</span> <span className="text-[var(--text-dim)]">{line.dim}</span>
      </motion.span>
    );
  }

  if (line.type === "summary") {
    return (
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        {"  "}
        <span className="font-bold text-white">Overall Score:</span> <span className="text-[var(--yellow)]">{line.score}</span>
        <span className="text-[var(--text-dim)]">/100</span> Grade: <span className="text-[var(--cyan)]">{line.grade}</span>{" "}
        <span className="text-[var(--text-dim)]">{line.dim}</span>
      </motion.span>
    );
  }

  return null;
}

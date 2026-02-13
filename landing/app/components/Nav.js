"use client";

import { motion } from "framer-motion";
import GitHubStarButton from "./GitHubStarButton";

export default function Nav() {
  return (
    <motion.header
      role="banner"
      className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center py-4 px-6 md:px-10 bg-[rgba(8,8,8,0.85)] backdrop-blur-xl border-b border-[var(--border)]"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="text-[13px] font-bold tracking-wider text-[var(--green)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        $ <span className="text-[var(--text-dim)]">~/</span>check-project-health
      </div>
      <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
        <a
          href="#features"
          className="text-[12px] tracking-[0.08em] text-[var(--text-dim)] hover:text-[var(--green)] transition-colors no-underline"
        >
          Features
        </a>
        <a
          href="#how"
          className="text-[12px] tracking-[0.08em] text-[var(--text-dim)] hover:text-[var(--green)] transition-colors no-underline"
        >
          How it works
        </a>
        <a
          href="#install"
          className="text-[12px] tracking-[0.08em] text-[var(--text-dim)] hover:text-[var(--green)] transition-colors no-underline"
        >
          Install
        </a>
        <GitHubStarButton variant="nav" />
      </nav>
    </motion.header>
  );
}

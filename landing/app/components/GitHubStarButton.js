"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const GITHUB_REPO = "yash-nandvana/project-health";
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}`;
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;
const REFETCH_MS = 60 * 1000; // refetch every 1 min for real-time feel

function formatCount(n) {
  if (n == null || typeof n !== "number" || isNaN(n)) return "0";
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return (m % 1 === 0 ? m : m.toFixed(1).replace(/\.0$/, "")) + "M";
  }
  if (n >= 1000) {
    const k = n / 1000;
    return (k % 1 === 0 ? k : k.toFixed(1).replace(/\.0$/, "")) + "k";
  }
  return n.toString();
}

export default function GitHubStarButton({ variant = "default" }) {
  const [stars, setStars] = useState(null);
  const [loading, setLoading] = useState(true);

  function fetchStars() {
  return fetch(GITHUB_API)
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => setStars(data.stargazers_count ?? 0))
    .catch(() => setStars((prev) => (prev != null ? prev : 0)))
    .finally(() => setLoading(false));
}

  useEffect(() => {
    fetchStars();
    const interval = setInterval(fetchStars, REFETCH_MS);
    return () => clearInterval(interval);
  }, []);

  const content = (
    <>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
        <path d="M12 .25a.75.75 0 0 1 .673.418l3.058 6.197 6.839.994a.75.75 0 0 1 .415 1.279l-4.948 4.823 1.167 6.811a.75.75 0 0 1-1.088.791L12 18.347l-6.117 3.216a.75.75 0 0 1-1.088-.79l1.167-6.812-4.948-4.823a.75.75 0 0 1 .416-1.28l6.838-.993L11.327.668A.75.75 0 0 1 12 .25Z" />
      </svg>
      <span>Star</span>
      {variant !== "icon-only" && (
        <span className="border-l border-current/30 pl-2 ml-1 font-semibold tabular-nums">
          {loading ? "—" : formatCount(stars)}
        </span>
      )}
    </>
  );

  const isNav = variant === "nav";
  const isHero = variant === "hero";

  const className = isNav
    ? "inline-flex items-center gap-2 bg-[var(--green)] text-black py-[7px] px-4 rounded text-[11px] font-bold tracking-[0.1em] uppercase no-underline hover:opacity-90 transition-opacity"
    : isHero
      ? "inline-flex items-center gap-2 bg-[var(--surface2)] border border-[var(--border2)] text-[var(--text)] py-3.5 px-6 rounded-md text-[13px] font-medium no-underline transition-colors hover:border-[var(--text-dim)] hover:text-white"
      : "inline-flex items-center gap-2 bg-[var(--surface2)] border border-[var(--border)] text-[var(--text)] py-2.5 px-4 rounded-md text-[12px] no-underline transition-colors hover:border-[var(--green)] hover:text-[var(--green)]";

  return (
    <motion.a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.a>
  );
}

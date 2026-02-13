"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      role="contentinfo"
      className="border-t border-[var(--border)] py-10 px-6 md:px-10 max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-left"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-[12px] text-[var(--text-dim)]">
        Built with ❤️ for developers. <strong className="text-[var(--green)]">check-project-health</strong> is MIT licensed.
      </div>
      <div className="flex gap-6">
        <a
          href="https://github.com/yash-nandvana/project-health"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[var(--text-dim)] no-underline transition-colors hover:text-[var(--green)]"
        >
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/check-project-health"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[var(--text-dim)] no-underline transition-colors hover:text-[var(--green)]"
        >
          npm
        </a>
        <a
          href="https://github.com/yash-nandvana/project-health#readme"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[var(--text-dim)] no-underline transition-colors hover:text-[var(--green)]"
        >
          Docs
        </a>
        <a
          href="https://opensource.org/licenses/MIT"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[var(--text-dim)] no-underline transition-colors hover:text-[var(--green)]"
        >
          MIT License
        </a>
      </div>
    </motion.footer>
  );
}

"use client";

import { motion } from "framer-motion";

export default function Cta() {
  return (
    <section className="py-24 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center rounded-3xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 p-12 sm:p-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-4">
          Ready to check your project health?
        </h2>
        <p className="text-zinc-400 mb-8">
          Install globally and run from any project directory.
        </p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.code
            className="px-5 py-3 rounded-xl bg-zinc-800 border border-zinc-600 font-mono text-cyan-400 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            npm install -g check-project-health
          </motion.code>
          <motion.code
            className="px-5 py-3 rounded-xl bg-zinc-800 border border-zinc-600 font-mono text-cyan-400 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            check-project-health
          </motion.code>
        </motion.div>
      </motion.div>
    </section>
  );
}

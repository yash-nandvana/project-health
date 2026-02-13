import boxen from "boxen";
import Table from "cli-table3";
import { colors, gradeColors } from "./colors.js";

const STATUS_ICONS = {
  ok: "✅",
  warn: "⚠️ ",
  fail: "❌",
  skip: "⏭️ ",
  error: "❌",
};

/**
 * @param {{ results: import('../checkers/index.js').CheckerResult[], score: number, grade: string, label: string }} data
 * @param {{ color?: boolean }} [opts]
 */
export function renderDashboard(data, opts = {}) {
  const useColor = opts.color !== false;

  function id(x) {
    return x;
  }

  const c = useColor
    ? colors
    : { ok: id, warn: id, fail: id, info: id, dim: id, bold: id, title: id };
  const gc = useColor ? gradeColors : { A: id, B: id, C: id, D: id, F: id };

  const { results, score, grade, label } = data;

  // ── HEADER BOX ────────────────────────────────────────────────
  const gradeColor = gc[grade] || id;

  const header = [
    "",
    c.title("  🏥  PROJECT HEALTH REPORT  "),
    c.bold(`  Score: ${score}/100   Grade: ${gradeColor(grade)}  `),
    `  Status: ${gradeColor(label)}  `,
    "",
  ].join("\n");

  console.log(
    boxen(header, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: useColor ? "gray" : undefined,
    }),
  );

  // ── RESULTS TABLE ──────────────────────────────────────────────
  const table = new Table({
    head: [
      c.bold("Checker"),
      c.bold("Score"),
      c.bold("Status"),
      c.bold("Summary"),
    ],
    colWidths: [18, 8, 12, 50],
    wordWrap: true,
    style: { head: [], border: [] },
  });

  for (const r of results) {
    const icon = STATUS_ICONS[r.status] || "  ";
    const statusStr = `${icon} ${r.status}`;

    // ✅ FIX 1 — no trailing space in 'skip' comparison
    const scoreStr = r.status === "skip" ? "—" : `${r.score}`;

    // ✅ FIX 2 — no trailing space in 'warn' comparison + skip gets dim color
    const rowColor =
      r.status === "ok"
        ? c.ok
        : r.status === "warn"
          ? c.warn
          : r.status === "skip"
            ? c.dim
            : r.status === "error"
              ? c.fail
              : c.fail;

    // ✅ FIX 3 — summary is plain text, no manual | pipe character
    const summaryText = r.summary
      ? r.summary.length > 48
        ? r.summary.slice(0, 45) + "..."
        : r.summary
      : "";

    table.push([
      rowColor(r.name),
      rowColor(scoreStr),
      rowColor(statusStr),
      rowColor(summaryText),
    ]);
  }

  console.log(table.toString());

  // ── DETAILS ────────────────────────────────────────────────────
  const nonOk = results.filter(
    (r) => r.status !== "ok" && r.status !== "skip" && r.details?.length,
  );

  if (nonOk.length > 0) {
    console.log(c.bold("\n  Details\n"));
    for (const r of nonOk) {
      console.log(c.info(`  ${r.name}:`));
      for (const d of r.details) {
        console.log(c.dim("    • " + d));
      }
      console.log("");
    }
  }

  // ── SUGGESTED FIXES ────────────────────────────────────────────
  const withFixes = results.filter((r) => r.fixes?.length);

  if (withFixes.length > 0) {
    console.log(c.bold("  Suggested fixes\n"));
    for (const r of withFixes) {
      console.log(c.info(`  ${r.name}:`));
      for (const f of r.fixes) {
        console.log(c.dim("    " + f));
      }
      console.log("");
    }
  }

  console.log(c.dim("  Run with --json to export results.\n"));
}

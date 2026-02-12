import boxen from 'boxen';
import Table from 'cli-table3';
import { colors, gradeColors } from './colors.js';

const STATUS_ICONS = { ok: '✅', warn: '⚠️', fail: '❌', skip: '⏭️', error: '❌' };

/**
 * @param {{ results: import('../checkers/index.js').CheckerResult[], score: number, grade: string, label: string }} data
 * @param {{ color?: boolean }} [opts]
 */
export function renderDashboard(data, opts = {}) {
  const useColor = opts.color !== false;
  const c = useColor ? colors : { ok: id, warn: id, fail: id, info: id, dim: id, bold: id, title: id };
  const gc = useColor ? gradeColors : { A: id, B: id, C: id, D: id, F: id };
  function id(x) {
    return x;
  }

  const { results, score, grade, label } = data;

  const header = [
    '',
    c.title('  🏥 PROJECT HEALTH REPORT  '),
    c.bold(`  Score: ${score}/100   Grade: ${grade}  `),
    `  Status: ${(gc[grade] || id)(label)}  `,
    '',
  ].join('\n');

  console.log(
    boxen(header, {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: useColor ? 'gray' : undefined,
    })
  );

  const table = new Table({
    head: [c.bold('Checker'), c.bold('Score'), c.bold('Status'), c.bold('Summary')],
    colWidths: [18, 8, 10, 44],
    wordWrap: true,
    style: { head: [], border: useColor ? [] : [] },
  });

  for (const r of results) {
    const icon = STATUS_ICONS[r.status] || '  ';
    const statusStr = `${icon} ${r.status}`;
    const scoreStr = r.status === 'skip' ? '—' : `${r.score}`;
    const rowColor = r.status === 'ok' ? c.ok : r.status === 'warn' ? c.warn : c.fail;
    table.push([
      rowColor(r.name),
      scoreStr,
      rowColor(statusStr),
      rowColor(r.summary.length > 42 ? r.summary.slice(0, 39) + '...' : r.summary),
    ]);
  }
  console.log(table.toString());

  const nonOk = results.filter((r) => r.status !== 'ok' && r.status !== 'skip' && r.details?.length);
  if (nonOk.length > 0) {
    console.log(c.bold('\n  Details\n'));
    for (const r of nonOk) {
      console.log(c.dim(`  ${r.name}:`));
      for (const d of r.details) {
        console.log(c.dim('    • ' + d));
      }
      console.log('');
    }
  }

  const withFixes = results.filter((r) => r.fixes?.length);
  if (withFixes.length > 0) {
    console.log(c.bold('  Suggested fixes\n'));
    for (const r of withFixes) {
      console.log(c.info(`  ${r.name}:`));
      for (const f of r.fixes) {
        console.log(c.dim('    ' + f));
      }
      console.log('');
    }
  }

  console.log(c.dim('  Run with --json to export results.\n'));
}

import scanFiles from '../utils/fileScanner.js';
import { readFile } from 'fs/promises';

const WEIGHT = 15;
const EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx', '.vue', '.py'];
const PATTERN = /(?:^|\s)(TODO|FIXME|HACK|XXX|BUG)\s*:?/gi;
const PENALTY = { todo: 2, fixme: 5, hack: 8, xxx: 3, bug: 6 };

/**
 * @param {string} projectPath
 * @returns {Promise<import('./index.js').CheckerResult>}
 */
export default async function checkTodos(projectPath) {
  let files;
  try {
    files = await scanFiles(projectPath, EXTENSIONS);
  } catch (err) {
    return {
      name: 'Code Quality',
      weight: WEIGHT,
      status: 'error',
      score: 0,
      summary: 'File scan failed',
      details: [],
      fixes: [],
    };
  }

  const byFile = new Map();
  let totalDeduction = 0;

  for (const filePath of files) {
    let content;
    try {
      content = await readFile(filePath, 'utf-8');
    } catch (_) {
      continue;
    }
    const counts = { todo: 0, fixme: 0, hack: 0, xxx: 0, bug: 0 };
    let m;
    const re = new RegExp(PATTERN.source, 'gi');
    while ((m = re.exec(content)) !== null) {
      const key = m[1].toLowerCase();
      if (counts[key] !== undefined) {
        counts[key]++;
        totalDeduction += PENALTY[key] ?? 2;
      }
    }
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    if (total > 0) {
      const relative = filePath.replace(projectPath, '').replace(/^[/\\]/, '') || filePath;
      byFile.set(relative, counts);
    }
  }

  const score = Math.max(0, 100 - totalDeduction);
  const status = score >= 80 ? 'ok' : score >= 50 ? 'warn' : 'fail';
  const parts = [];
  for (const [file, counts] of byFile) {
    const segs = [];
    if (counts.todo) segs.push(`${counts.todo} TODO(s)`);
    if (counts.fixme) segs.push(`${counts.fixme} FIXME(s)`);
    if (counts.hack) segs.push(`${counts.hack} HACK(s)`);
    if (counts.xxx) segs.push(`${counts.xxx} XXX(s)`);
    if (counts.bug) segs.push(`${counts.bug} BUG(s)`);
    parts.push(`${file} — ${segs.join(', ')}`);
  }
  const totalItems = [...byFile.values()].reduce(
    (a, c) => a + (c.todo + c.fixme + c.hack + c.xxx + c.bug),
    0
  );
  const summary =
    totalItems === 0
      ? 'No TODO/FIXME/HACK comments found'
      : `${totalItems} comment(s) across ${byFile.size} file(s)`;

  return {
    name: 'Code Quality',
    weight: WEIGHT,
    status,
    score,
    summary,
    details: parts,
    fixes: totalItems > 0 ? ['Address TODO/FIXME/HACK comments or remove them'] : [],
  };
}

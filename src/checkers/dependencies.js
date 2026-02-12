import { readFile } from 'fs/promises';
import { join } from 'path';
import execAsync from '../utils/execAsync.js';

const WEIGHT = 25;
const PENALTY = { major: 10, minor: 5, patch: 2 };

function statusFromScore(score) {
  if (score >= 80) return 'ok';
  if (score >= 50) return 'warn';
  return 'fail';
}

/**
 * @param {string} projectPath
 * @returns {Promise<import('./index.js').CheckerResult>}
 */
export default async function checkDependencies(projectPath) {
  const pkgPath = join(projectPath, 'package.json');
  let pkg;
  try {
    const raw = await readFile(pkgPath, 'utf-8');
    pkg = JSON.parse(raw);
  } catch (err) {
    return {
      name: 'Dependencies',
      weight: WEIGHT,
      status: 'skip',
      score: 0,
      summary: 'No package.json found',
      details: [],
      fixes: [],
    };
  }

  const deps = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {}),
  };
  const totalDeps = Object.keys(deps).length;

  if (totalDeps === 0) {
    return {
      name: 'Dependencies',
      weight: WEIGHT,
      status: 'ok',
      score: 100,
      summary: 'No dependencies to check',
      details: [],
      fixes: [],
    };
  }

  let outdated = {};
  try {
    const { stdout } = await execAsync('npm outdated --json', projectPath);
    outdated = JSON.parse(stdout.trim() || '{}');
  } catch (e) {
    if (e.code === 1 && e.stdout) {
      try {
        outdated = JSON.parse((e.stdout || '').trim() || '{}');
      } catch (_) {}
    }
  }

  const details = [];
  const fixes = new Set(['Run: npm update']);
  let deduction = 0;

  for (const [name, info] of Object.entries(outdated)) {
    if (!info || typeof info !== 'object') continue;
    const current = info.current || info.wanted || '?';
    const latest = info.latest ?? info.wanted ?? '?';
    let type = 'patch';
    if (typeof latest === 'string' && typeof current === 'string') {
      const [curMajor] = current.split('.').map(Number);
      const [latMajor, latMinor] = latest.split('.').map(Number);
      if (latMajor > curMajor) type = 'major';
      else if (latMinor > (current.split('.')[1] || 0)) type = 'minor';
    }
    deduction += PENALTY[type] || 2;
    details.push(`${name}: ${current} → ${latest} (${type})`);
    if (type === 'major') fixes.add(`Run: npm install ${name}@latest`);
  }

  const count = { major: 0, minor: 0, patch: 0 };
  for (const [, info] of Object.entries(outdated)) {
    if (!info || typeof info !== 'object') continue;
    const current = String(info.current || info.wanted || '');
    const latest = String(info.latest ?? info.wanted ?? '');
    const [curMajor] = current.split('.').map(Number);
    const [latMajor, latMinor] = latest.split('.').map(Number);
    if (latMajor > curMajor) count.major++;
    else if (latMinor > parseInt(current.split('.')[1], 10)) count.minor++;
    else count.patch++;
  }

  const score = Math.max(0, 100 - deduction);
  const summary =
    Object.keys(outdated).length === 0
      ? `All ${totalDeps} packages up to date`
      : `${Object.keys(outdated).length} packages outdated (${count.major} major, ${count.minor} minor, ${count.patch} patch)`;

  return {
    name: 'Dependencies',
    weight: WEIGHT,
    status: statusFromScore(score),
    score,
    summary,
    details,
    fixes: Array.from(fixes),
  };
}

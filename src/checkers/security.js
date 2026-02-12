import execAsync from '../utils/execAsync.js';

const WEIGHT = 10;
const PENALTY = { critical: 30, high: 15, moderate: 5, low: 1 };

function statusFromScore(score) {
  if (score >= 80) return 'ok';
  if (score >= 50) return 'warn';
  return 'fail';
}

/**
 * @param {string} projectPath
 * @returns {Promise<import('./index.js').CheckerResult>}
 */
export default async function checkSecurity(projectPath) {
  let raw = '';
  try {
    const { stdout } = await execAsync('npm audit --json', projectPath);
    raw = stdout;
  } catch (e) {
    if (e.stdout) raw = e.stdout;
    else
      return {
        name: 'Security',
        weight: WEIGHT,
        status: 'skip',
        score: 100,
        summary: 'npm audit not available (no package.json or no deps)',
        details: [],
        fixes: [],
      };
  }

  let data = {};
  try {
    raw = (raw || '').trim().replace(/\r\n/g, '\n');
    data = JSON.parse(raw || '{}');
  } catch (_) {
    return {
      name: 'Security',
      weight: WEIGHT,
      status: 'ok',
      score: 100,
      summary: 'No vulnerabilities reported',
      details: [],
      fixes: [],
    };
  }

  const vulns = data.vulnerabilities || {};
  const counts = { critical: 0, high: 0, moderate: 0, low: 0 };
  const details = [];
  const fixCommands = new Set();

  for (const [name, v] of Object.entries(vulns)) {
    if (!v || typeof v !== 'object') continue;
    const sev = (v.severity || 'moderate').toLowerCase();
    if (counts[sev] !== undefined) counts[sev]++;
    details.push(`${name}: ${sev} - ${v.via?.[0]?.title || v.via?.[0]?.url || 'vulnerability'}`);
    if (v.fixAvailable && typeof v.fixAvailable === 'object' && v.fixAvailable.name) {
      fixCommands.add(`npm audit fix`);
    }
  }

  if (data.auditReportVersion >= 2 && data.metadata?.vulnerabilities) {
    const meta = data.metadata.vulnerabilities;
    counts.critical = meta.critical ?? 0;
    counts.high = meta.high ?? 0;
    counts.moderate = meta.moderate ?? 0;
    counts.low = meta.low ?? 0;
  }

  let score = 100;
  score -= (counts.critical || 0) * PENALTY.critical;
  score -= (counts.high || 0) * PENALTY.high;
  score -= (counts.moderate || 0) * PENALTY.moderate;
  score -= (counts.low || 0) * PENALTY.low;
  score = Math.max(0, score);

  if (score < 100 && !fixCommands.size) fixCommands.add('npm audit fix');

  const total = counts.critical + counts.high + counts.moderate + counts.low;
  const summary =
    total === 0
      ? 'No known vulnerabilities'
      : `${total} vulnerability(ies): ${counts.critical} critical, ${counts.high} high, ${counts.moderate} moderate, ${counts.low} low`;

  return {
    name: 'Security',
    weight: WEIGHT,
    status: statusFromScore(score),
    score,
    summary,
    details: details.slice(0, 20),
    fixes: Array.from(fixCommands),
  };
}

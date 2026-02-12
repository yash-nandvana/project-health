import { readFile, access } from 'fs/promises';
import { join } from 'path';

const WEIGHT = 20;

function parseEnvKeys(content) {
  const keys = new Set();
  const lines = (content || '').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq > 0) {
      const key = trimmed.slice(0, eq).trim();
      if (key) keys.add(key);
    }
  }
  return keys;
}

/**
 * @param {string} projectPath
 * @returns {Promise<import('./index.js').CheckerResult>}
 */
export default async function checkEnv(projectPath) {
  const examplePath = join(projectPath, '.env.example');
  const envPath = join(projectPath, '.env');

  let hasExample = false;
  try {
    await access(examplePath);
    hasExample = true;
  } catch (_) {}

  if (!hasExample) {
    return {
      name: 'Environment',
      weight: WEIGHT,
      status: 'skip',
      score: 0,
      summary: 'No .env.example found',
      details: [],
      fixes: ['Add a .env.example documenting required environment variables'],
    };
  }

  let exampleContent = '';
  let envContent = '';
  try {
    exampleContent = await readFile(examplePath, 'utf-8');
  } catch (err) {
    return {
      name: 'Environment',
      weight: WEIGHT,
      status: 'error',
      score: 0,
      summary: 'Could not read .env.example',
      details: [],
      fixes: [],
    };
  }

  let hasEnv = false;
  try {
    await access(envPath);
    hasEnv = true;
    envContent = await readFile(envPath, 'utf-8');
  } catch (_) {}

  if (!hasEnv) {
    return {
      name: 'Environment',
      weight: WEIGHT,
      status: 'warn',
      score: 50,
      summary: '.env.example exists but .env is missing',
      details: ['.env file not found'],
      fixes: ['Copy .env.example to .env and fill in values: cp .env.example .env'],
    };
  }

  const exampleKeys = parseEnvKeys(exampleContent);
  const envKeys = parseEnvKeys(envContent);

  const missingInEnv = [...exampleKeys].filter((k) => !envKeys.has(k));
  const undocumented = [...envKeys].filter((k) => !exampleKeys.has(k));

  let score = 100;
  score -= missingInEnv.length * 20;
  score -= undocumented.length * 10;
  score = Math.max(0, score);

  const status = score >= 80 ? 'ok' : score >= 50 ? 'warn' : 'fail';
  const details = [];
  if (missingInEnv.length) details.push(`Missing in .env: ${missingInEnv.join(', ')}`);
  if (undocumented.length) details.push(`Undocumented in .env.example: ${undocumented.join(', ')}`);
  const fixes = [];
  if (missingInEnv.length) fixes.push('Add missing keys to .env from .env.example');
  if (undocumented.length) fixes.push('Document all .env keys in .env.example');

  const summary =
    score === 100
      ? '.env and .env.example are in sync'
      : missingInEnv.length
        ? `${missingInEnv.length} key(s) missing in .env`
        : `${undocumented.length} key(s) not in .env.example`;

  return {
    name: 'Environment',
    weight: WEIGHT,
    status,
    score,
    summary,
    details,
    fixes,
  };
}

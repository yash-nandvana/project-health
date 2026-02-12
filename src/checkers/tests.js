import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { glob } from 'glob';
import execAsync from '../utils/execAsync.js';

const WEIGHT = 10;

/**
 * @param {string} projectPath
 * @param {{ runTests?: boolean }} [options]
 * @returns {Promise<import('./index.js').CheckerResult>}
 */
export default async function checkTests(projectPath, options = {}) {
  const runTests = options.runTests === true;
  const pkgPath = join(projectPath, 'package.json');
  let pkg;
  try {
    const raw = await readFile(pkgPath, 'utf-8');
    pkg = JSON.parse(raw);
  } catch (_) {
    return {
      name: 'Tests',
      weight: WEIGHT,
      status: 'skip',
      score: 0,
      summary: 'No package.json',
      details: [],
      fixes: [],
    };
  }

  const scripts = pkg.scripts || {};
  const hasTestScript = !!(
    scripts.test ||
    scripts['test:ci'] ||
    scripts['test:unit'] ||
    scripts['test:integration']
  );

  const patterns = [
    '**/*.test.js',
    '**/*.spec.js',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/__tests__/**',
  ];
  let testFiles = [];
  try {
    for (const p of patterns) {
      const files = await glob(p, { cwd: projectPath, ignore: ['**/node_modules/**'] });
      testFiles = testFiles.concat(files);
    }
    testFiles = [...new Set(testFiles)];
  } catch (_) {}

  const configs = [
    'jest.config.js',
    'jest.config.ts',
    'jest.config.cjs',
    'vitest.config.js',
    'vitest.config.ts',
    '.mocharc.js',
    '.mocharc.json',
    'vitest.config.js',
  ];
  let hasConfig = false;
  for (const c of configs) {
    if (existsSync(join(projectPath, c))) {
      hasConfig = true;
      break;
    }
  }

  let score = 0;
  let status = 'fail';
  let summary = 'No tests found';
  const details = [];
  const fixes = [];

  if (!hasTestScript && testFiles.length === 0 && !hasConfig) {
    return {
      name: 'Tests',
      weight: WEIGHT,
      status: 'warn',
      score: 0,
      summary: 'No test setup detected',
      details: [],
      fixes: ['Add a test script to package.json and test files (*.test.js, *.spec.js, etc.)'],
    };
  }

  if (testFiles.length === 0 && !hasConfig) {
    score = hasTestScript ? 50 : 0;
    summary = 'Test script exists but no test files or config found';
    details.push('Add *.test.js / *.spec.js or jest/vitest config');
    fixes.push('Create test files or add jest.config.js / vitest.config.js');
  } else if (!hasConfig) {
    score = 50;
    summary = 'Test files found but no framework config';
    details.push(`${testFiles.length} test file(s), no jest/vitest/mocha config`);
    fixes.push('Add jest.config.js, vitest.config.js, or .mocharc.js');
  } else {
    score = 80;
    summary = 'Test setup detected';
    details.push(`${testFiles.length} test file(s), config present`);
  }

  if (runTests && hasTestScript && score >= 80) {
    try {
      const timeout = 30000;
      const { stdout, stderr } = await Promise.race([
        execAsync('npm test -- --passWithNoTests 2>&1', projectPath),
        new Promise((_, rej) => setTimeout(() => rej(new Error('Test run timed out')), timeout)),
      ]);
      const out = (stdout + stderr).replace(/\r\n/g, '\n');
      if (/passed|✓|ok\s+\d+\s+test/i.test(out) && !/failed|✗|Error:/i.test(out)) {
        score = 100;
        summary = 'Tests pass';
        details.push('Last run: passed');
      } else {
        details.push('Run: npm test (some tests may have failed)');
        fixes.push('Fix failing tests: npm test');
      }
    } catch (err) {
      details.push('Test run failed or timed out: ' + (err.message || ''));
      fixes.push('Run: npm test');
    }
  }

  status = score >= 80 ? 'ok' : score >= 50 ? 'warn' : 'fail';

  return {
    name: 'Tests',
    weight: WEIGHT,
    status,
    score: Math.min(100, score),
    summary,
    details,
    fixes,
  };
}

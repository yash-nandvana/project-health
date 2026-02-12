import checkers from './checkers/index.js';

const TIMEOUT_MS = 30000;

function withTimeout(promise, ms, name) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Checker "${name}" timed out after ${ms}ms`)), ms)
    ),
  ]);
}

/**
 * @param {string} projectPath
 * @param {{ skipList?: string[], runTests?: boolean }} [options]
 * @returns {Promise<import('./checkers/index.js').CheckerResult[]>}
 */
export async function runEngine(projectPath, options = {}) {
  const { skipList = [], runTests = false } = options;
  const skipSet = new Set(skipList.map((s) => s.toLowerCase().trim()));

  const toRun = checkers.filter((c) => !skipSet.has(c.name.toLowerCase()));

  const results = await Promise.allSettled(
    toRun.map(({ name, check }) => {
      const fn = () => check(projectPath, { runTests });
      return withTimeout(fn(), TIMEOUT_MS, name);
    })
  );

  return results.map((settled, i) => {
    const { name } = toRun[i];
    if (settled.status === 'fulfilled') {
      return settled.value;
    }
    return {
      name,
      weight: 0,
      status: 'error',
      score: 0,
      summary: 'Checker failed: ' + (settled.reason?.message || 'Unknown error'),
      details: [],
      fixes: [],
    };
  });
}

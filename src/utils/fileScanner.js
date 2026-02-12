import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'coverage']);

/**
 * Recursively scan a directory for files matching given extensions.
 * Skips node_modules, .git, dist, build, coverage.
 * @param {string} dir - Directory to scan (absolute path)
 * @param {string[]} extensions - File extensions to match (e.g. ['.js', '.ts'])
 * @returns {Promise<string[]>} Array of absolute file paths
 */
export default async function scanFiles(dir, extensions = []) {
  const normalizedExt = new Set(
    extensions.map((e) => (e.startsWith('.') ? e.toLowerCase() : `.${e.toLowerCase()}`))
  );
  const results = [];

  async function walk(currentDir) {
    let entries;
    try {
      entries = await readdir(currentDir, { withFileTypes: true });
    } catch (err) {
      return;
    }

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) {
          await walk(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = entry.name.includes('.')
          ? `.${entry.name.split('.').pop().toLowerCase()}`
          : '';
        if (normalizedExt.size === 0 || normalizedExt.has(ext)) {
          results.push(fullPath);
        }
      }
    }
  }

  await walk(dir);
  return results;
}

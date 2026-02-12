import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

/**
 * Promise wrapper for child_process.exec
 * @param {string} command - Command to execute
 * @param {string} [cwd] - Working directory
 * @returns {Promise<{ stdout: string, stderr: string }>}
 */
export default async function execAsync(command, cwd) {
  const options = cwd ? { cwd, maxBuffer: 1024 * 1024 } : { maxBuffer: 1024 * 1024 };
  return execPromise(command, options);
}

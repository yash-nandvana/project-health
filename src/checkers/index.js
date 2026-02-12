/**
 * @typedef {Object} CheckerResult
 * @property {string} name
 * @property {number} weight
 * @property {'ok'|'warn'|'fail'|'skip'|'error'} status
 * @property {number} score
 * @property {string} summary
 * @property {string[]} details
 * @property {string[]} fixes
 */

import checkDependencies from './dependencies.js';
import checkGit from './git.js';
import checkTodos from './todos.js';
import checkEnv from './env.js';
import checkTests from './tests.js';
import checkSecurity from './security.js';

/** @type {{ name: string, check: (path: string, options?: any) => Promise<CheckerResult> }[]} */
const checkers = [
  { name: 'Dependencies', check: checkDependencies },
  { name: 'Git', check: checkGit },
  { name: 'Code Quality', check: checkTodos },
  { name: 'Environment', check: checkEnv },
  { name: 'Tests', check: checkTests },
  { name: 'Security', check: checkSecurity },
];

export default checkers;
export { checkDependencies, checkGit, checkTodos, checkEnv, checkTests, checkSecurity };

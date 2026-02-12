import simpleGit from 'simple-git';

const WEIGHT = 20;

function statusFromScore(score) {
  if (score >= 80) return 'ok';
  if (score >= 50) return 'warn';
  return 'fail';
}

/**
 * @param {string} projectPath
 * @returns {Promise<import('./index.js').CheckerResult>}
 */
export default async function checkGit(projectPath) {
  const git = simpleGit({ baseDir: projectPath });
  let score = 100;
  const details = [];
  const fixes = [];

  try {
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      return {
        name: 'Git',
        weight: WEIGHT,
        status: 'skip',
        score: 0,
        summary: 'Not a git repository',
        details: [],
        fixes: ['Run: git init'],
      };
    }
  } catch (_) {
    return {
      name: 'Git',
      weight: WEIGHT,
      status: 'error',
      score: 0,
      summary: 'Git check failed',
      details: [],
      fixes: [],
    };
  }

  try {
    const status = await git.status();
    const untracked = status.not_added?.length ?? 0;
    const modified = status.modified?.length ?? 0;
    const staged = status.staged?.length ?? 0;

    if (untracked > 10) {
      score -= 15;
      details.push(`${untracked} untracked files`);
      fixes.push('Add or ignore untracked files: git add . or update .gitignore');
    }
    if (modified > 5) {
      score -= 10;
      details.push(`${modified} modified files`);
      fixes.push('Commit or stash changes: git add . && git commit -m "..."');
    }
    if (staged > 0) details.push(`${staged} staged files`);

    const log = await git.log({ maxCount: 1 });
    const lastCommit = log.latest?.date;
    if (lastCommit) {
      const daysSince = (Date.now() - new Date(lastCommit).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince > 30) {
        score -= 20;
        details.push(`${Math.floor(daysSince)} days since last commit`);
        fixes.push('Commit regularly to keep history fresh');
      }
    } else {
      details.push('No commits yet');
    }

    const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
    const branchName = branch.trim().replace(/\r\n?/g, '');
    details.push(`Branch: ${branchName}`);

    try {
      const remotes = await git.getRemotes(true);
      if (Object.keys(remotes).length > 0) {
        const pushStatus = await git.status();
        const ahead = pushStatus.ahead ?? 0;
        if (ahead > 0) {
          score -= 10;
          details.push(`${ahead} unpushed commit(s)`);
          fixes.push('Push your commits: git push');
        }
      }
    } catch (_) {}

    score = Math.max(0, score);
    const summary =
      score >= 80
        ? 'Repository in good shape'
        : score >= 50
          ? 'Some git issues to address'
          : 'Git health needs attention';

    return {
      name: 'Git',
      weight: WEIGHT,
      status: statusFromScore(score),
      score,
      summary,
      details,
      fixes,
    };
  } catch (err) {
    return {
      name: 'Git',
      weight: WEIGHT,
      status: 'error',
      score: 0,
      summary: 'Checker failed: ' + (err.message || 'Unknown error'),
      details: [],
      fixes: [],
    };
  }
}

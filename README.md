# check-project-health

[![npm version](https://img.shields.io/npm/v/check-project-health.svg)](https://www.npmjs.com/package/check-project-health)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)

**Terminal health dashboard for developers.** Run one command in any project directory and get a beautiful, real-time health report: dependencies, git status, code quality, environment config, tests, and security — all in one place.

```
  ╭─────────────────────────────────────╮
  │   🏥 PROJECT HEALTH REPORT          │
  │   Score: 78/100   Grade: B          │
  │   Status: Good                      │
  ╰─────────────────────────────────────╯

  ┌──────────────────┬────────┬──────────┬────────────────────────────┐
  │ Checker           │ Score  │ Status   │ Summary                    │
  ├──────────────────┼────────┼──────────┼────────────────────────────┤
  │ Dependencies     │ 85     │ ✅ ok    │ 2 packages outdated         │
  │ Git              │ 90     │ ✅ ok    │ Repository in good shape    │
  │ Code Quality     │ 72     │ ⚠️ warn  │ 5 TODOs across 2 files      │
  └──────────────────┴────────┴──────────┴────────────────────────────┘
```

---

## Installation

```bash
npm install -g check-project-health
```

---

## Usage

Run from any project directory (uses current working directory):

```bash
check-project-health
```

### Options

| Flag | Description |
|------|-------------|
| `--json` | Output raw JSON instead of the visual dashboard (for CI or tooling) |
| `--no-color` | Disable colored output |
| `--skip <checkers>` | Comma-separated checker names to skip (e.g. `--skip "Git,Security"`) |
| `--run-tests` | Run the test script as part of the Tests checker (adds time) |

**Examples:**

```bash
check-project-health --json > report.json
check-project-health --no-color
check-project-health --skip "Tests,Security"
check-project-health --run-tests
```

---

## How checkers work

| Checker | Weight | What it does |
|---------|--------|--------------|
| **Dependencies** | 25% | Runs `npm outdated`, penalizes major/minor/patch outdated packages, suggests updates |
| **Git** | 20% | Uses `simple-git`: status (untracked, modified, staged), last commit age, branch, unpushed commits |
| **Code Quality** | 15% | Scans `.js`, `.ts`, `.jsx`, `.tsx`, `.vue`, `.py` for TODO, FIXME, HACK, XXX, BUG comments |
| **Environment** | 20% | Compares `.env` and `.env.example` keys; warns if keys are missing or undocumented |
| **Tests** | 10% | Looks for test script, test files (`*.test.js`, `*.spec.js`, configs); optionally runs tests with `--run-tests` |
| **Security** | 10% | Runs `npm audit`, scores by severity (critical/high/moderate/low), suggests `npm audit fix` |

**Scoring:** Each checker returns a 0–100 score. The overall score is a weighted average. Grades: **A** (90+), **B** (75+), **C** (60+), **D** (45+), **F** (&lt;45).

---

## Adding custom checkers

1. Create a new file in `src/checkers/`, e.g. `src/checkers/custom.js`.
2. Export a default async function with signature:
   ```js
   export default async function check(projectPath, options = {}) {
     return {
       name: 'Custom',
       weight: 10,
       status: 'ok' | 'warn' | 'fail' | 'skip' | 'error',
       score: 0–100,
       summary: 'One-line summary',
       details: ['Detail 1', 'Detail 2'],
       fixes: ['Suggested command or action'],
     };
   }
   ```
3. Register it in `src/checkers/index.js`:
   ```js
   import checkCustom from './custom.js';
   const checkers = [
     // ...existing
     { name: 'Custom', check: checkCustom },
   ];
   ```

---

## Contributing

Contributions are welcome. Please open an issue or PR on GitHub. Ensure tests and lint pass before submitting.

---

## License

MIT

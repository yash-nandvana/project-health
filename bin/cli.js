#!/usr/bin/env node

import { program } from 'commander';
import figlet from 'figlet';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { runEngine } from '../src/engine.js';
import { calculateScore } from '../src/scorer.js';
import { renderDashboard } from '../src/ui/dashboard.js';
import { colors } from '../src/ui/colors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program
  .name('project-health')
  .description('Analyze a project and show a terminal health dashboard')
  .option('--json', 'Output raw JSON instead of the visual dashboard')
  .option('--no-color', 'Disable colored output')
  .option('--skip <checkers>', 'Comma-separated list of checker names to skip')
  .option('--run-tests', 'Run test script as part of Tests checker')
  .parse(process.argv);

const opts = program.opts();
const projectPath = process.cwd();
const skipList = opts.skip ? opts.skip.split(',').map((s) => s.trim()) : [];
const runTests = opts.runTests ?? false;

async function main() {
  if (!opts.json) {
    console.log(
      colors.title(
        figlet.textSync('project-health', { horizontalLayout: 'fitted', font: 'Slant' })
      )
    );
    console.log(colors.dim('  Analyzing your project...\n'));
  }

  const spinner = opts.json ? null : ora('Running health checkers...').start();

  try {
    const results = await runEngine(projectPath, { skipList, runTests });
    const { score, grade, label } = calculateScore(results);

    if (spinner) spinner.succeed('Analysis complete.\n');

    if (opts.json) {
      console.log(
        JSON.stringify(
          { score, grade, label, results, timestamp: new Date().toISOString() },
          null,
          2
        )
      );
      return;
    }

    renderDashboard({ results, score, grade, label }, { color: opts.color !== false });
  } catch (err) {
    if (spinner) spinner.fail('Analysis failed.');
    console.error(colors.fail('\nError: ' + (err.message || String(err))));
    if (err.stack && process.env.DEBUG) {
      console.error(colors.dim(err.stack));
    }
    process.exit(1);
  }
}

main();

#!/usr/bin/env node
const { execFileSync } = require('child_process');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const lifecycle = process.env.npm_lifecycle_event || '';
const shouldBuild = ['prepack', 'publish'].includes(lifecycle) || process.env.FORCE_BUILD === '1';

if (!shouldBuild) {
  console.log(`prepare: lifecycle="${lifecycle}" — skipping build (only run on 'prepack' or 'publish', or set FORCE_BUILD=1).`);
  process.exit(0);
}

console.log('prepare: building package (pnpm run build)');
try {
  const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
  execFileSync(pnpm, ['run', 'build'], { stdio: 'inherit', cwd: repoRoot });
  console.log('prepare: build completed');
} catch (err) {
  console.error('prepare: build failed');
  console.error(err && err.stack ? err.stack : (err && err.message ? err.message : err));
  process.exit(1);
}

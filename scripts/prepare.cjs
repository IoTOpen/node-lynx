#!/usr/bin/env node
const { existsSync } = require('node:fs');
const { join } = require('node:path');
const { execSync } = require('node:child_process');

const NODE_ENV = process.env.NODE_ENV;
const distPath = join(__dirname, '..', 'dist');
const nodeModulesPath = join(__dirname, '..', 'node_modules');

if (NODE_ENV === 'production') {
  console.log('prepare: NODE_ENV=production — skipping build to avoid requiring devDependencies.');
  process.exit(0);
}

if (existsSync(distPath)) {
  console.log('prepare: dist/ already exists — skipping build.');
  process.exit(0);
}

// When package managers prepare packages for install from git, devDependencies
// are not installed in the temporary package directory. If `node_modules`
// doesn't exist we are likely running inside a pnpm/npm temporary workspace
// — skip the build to avoid failing the install.
if (!existsSync(nodeModulesPath)) {
  console.log('prepare: node_modules not found — skipping build (likely running in package manager temporary dir).');
  process.exit(0);
}

console.log('prepare: running build (this requires devDependencies)...');
execSync('pnpm run build', { stdio: 'inherit' });

#!/usr/bin/env node
const { existsSync } = require('node:fs');
const { join } = require('node:path');
const { execSync } = require('node:child_process');

const NODE_ENV = process.env.NODE_ENV;
const distPath = join(__dirname, '..', 'dist');

if (NODE_ENV === 'production') {
  console.log('prepare: NODE_ENV=production — skipping build to avoid requiring devDependencies.');
  process.exit(0);
}

if (existsSync(distPath)) {
  console.log('prepare: dist/ already exists — skipping build.');
  process.exit(0);
}

console.log('prepare: running build (this requires devDependencies)...');
execSync('pnpm run build', { stdio: 'inherit' });
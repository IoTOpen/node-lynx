#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const distIndex = path.join(repoRoot, 'dist', 'index.d.ts');
const requiredExports = ['LynxClient', 'zero', 'HTTPError'];

if (!fs.existsSync(distIndex)) {
  console.error('verify-dist: missing expected build artifact: dist/index.d.ts');
  process.exit(1);
}

const distIndexContent = fs.readFileSync(distIndex, 'utf8');
const missingExports = requiredExports.filter((exportName) => !new RegExp(`\\b${exportName}\\b`).test(distIndexContent));

if (missingExports.length > 0) {
  console.error('verify-dist: dist/index.d.ts is missing expected exports:');
  missingExports.forEach((exportName) => console.error(`  - ${exportName}`));
  process.exit(1);
}

console.log('verify-dist: dist/index.d.ts contains the expected public exports');
process.exit(0);
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { readFileSync } from 'fs';
import { builtinModules } from 'module';
import path from 'path';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

const deps = Object.keys(pkg.dependencies || {});
const peers = Object.keys(pkg.peerDependencies || {});
const builtins = new Set(builtinModules);

function isExternal(id: string) {
  if (!id) return false;
  if (builtins.has(id) || id.startsWith('node:')) return true;
  for (const d of deps) if (id === d || id.startsWith(`${d}/`)) return true;
  for (const p of peers) if (id === p || id.startsWith(`${p}/`)) return true;
  return false;
}

export default defineConfig({
  build: {
    sourcemap: true,
    target: 'es2022',
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es'],
      fileName: (format) => (format === 'cjs' ? 'index.cjs' : 'index.js'),
    },
    rolldownOptions: {
      external: isExternal,
    },
  },
  plugins: [dts({ insertTypesEntry: true, rollupTypes: true })],
});

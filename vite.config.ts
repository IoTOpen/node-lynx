import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite';
import { readFileSync } from 'fs';
import { builtinModules } from 'module';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

const external = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
]);

function isExternal(id: string): boolean {
    if (!id) return false;
    if (builtinModules.includes(id) || id.startsWith('node:')) return true;
    for (const dep of external) {
        if (id === dep || id.startsWith(`${dep}/`)) return true;
    }
    return false;
}

export default defineConfig({
    build: {
        sourcemap: true,
        target: 'es2022',
        outDir: 'dist',
        minify: false,
        lib: {
            entry: `${__dirname}/src/index.ts`,
            formats: ['cjs', 'es'],
            fileName: (format) => (format === 'cjs' ? 'cjs/index.cjs' : 'esm/index.js'),
        },
        rolldownOptions: {
            external: isExternal,
        },
    },
    plugins: [dts({ bundleTypes: true, outDirs: ['dist/src'] })],
});

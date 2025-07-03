import process from 'node:process';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import { createRequire } from 'node:module';
import { visualizer } from 'rollup-plugin-visualizer';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

// NOTE: Check if the build is for production to apply optimizations.
const isProduction = process.env.NODE_ENV === 'production';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
                exports: 'named' // Explicit named exports for CJS
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            resolve({
                preferBuiltins: true, // For Node.js libraries, prefer built-ins
            }),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false,
                declarationMap: false,
            }),
            // NOTE: Minify the bundle only in production.
            ...(isProduction ? [terser({
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                }
            })] : []),
            // In development builds only
            ...(process.env.ANALYZE === 'true' ? [
                visualizer({
                    filename: 'dist/bundle-analysis.html',
                    open: true
                })
            ] : [])
        ],
        // NOTE: Exclude external dependencies from the bundle using a function
        // for more precise control over what gets bundled.
        external: (id) => {
            // Keep specified dependencies external
            if (/^cross-fetch/.test(id)) {
                return true;
            }
            // Keep Node.js built-ins external
            if (id.startsWith('node:')) {
                return true;
            }
            return false;
        }
    },
    // Build step for generating TypeScript type declaration files (.d.ts).
    {
        input: 'src/index.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
    },
];

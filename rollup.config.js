import process from 'node:process';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');
const manifestExternals = new Set(Object.keys(packageJson.dependencies ?? {}));

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
        exports: 'named',
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
        },
      })] : []),
      // In development builds only
      ...(process.env.ANALYZE === 'true' ? [
        visualizer({
          filename: 'dist/bundle-analysis.html',
          open: true,
        }),
      ] : []),
    ],
    // NOTE: Exclude runtime deps so consumers manage versions and tree-shaking.
    external: (id) => {
      if (id.startsWith('node:')) {
        return true;
      }

      if (manifestExternals.has(id)) {
        return true;
      }

      const normalizedId = id.startsWith('@')
        ? id.split('/').slice(0, 2).join('/')
        : id.split('/')[0];

      return manifestExternals.has(normalizedId);
    },
  },
  // Build step for generating TypeScript type declaration files (.d.ts).
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];

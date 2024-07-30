import { build } from 'esbuild';

build({
  entryPoints: ['src/app.ts'],
  bundle: true,
  sourcemap: true,
  platform: 'browser',
  outfile: 'build/app.js',
  loader: { '.ts': 'ts' },
  logLevel: 'info',
}).catch(() => process.exit(1));


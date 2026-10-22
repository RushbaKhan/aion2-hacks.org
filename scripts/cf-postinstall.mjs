import { spawnSync } from 'node:child_process';

if (process.env.WORKERS_CI !== '1') {
  process.exit(0);
}

console.log('Workers CI: building the Astro site into dist/ before wrangler deploy');
const result = spawnSync('npm', ['run', 'build:cf'], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});
process.exit(result.status ?? 1);

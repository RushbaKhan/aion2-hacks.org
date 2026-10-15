import fs from 'node:fs';
import path from 'node:path';

/** Drop source PNGs from dist — pages serve WebP variants only. */
const imageRoots = [path.resolve('dist/client/images'), path.resolve('dist/images')];
const seen = new Set();
let removed = 0;
let bytes = 0;
const prunedFrom = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const resolved = fs.realpathSync(dir);
  if (seen.has(resolved)) return;
  seen.add(resolved);

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    const keepOriginal = /[\\/](?:gameplay|extras)[\\/]/i.test(full);
    const dropWide = /-(?:512|1280|1920|2560|3840)\.webp$/i.test(entry.name);
    const dropDota = /dota-2/i.test(entry.name);
    const dropSourceRaster =
      !keepOriginal && /\.(?:png|jpe?g)$/i.test(entry.name) && !/^og\./i.test(entry.name);
    if (!dropWide && !dropDota && !dropSourceRaster) continue;
    if (/^og\.(?:jpg|jpeg|png)$/i.test(entry.name)) continue;
    const stat = fs.statSync(full);
    if (dropSourceRaster && !dropDota && stat.size < 30_000) continue;
    bytes += stat.size;
    fs.unlinkSync(full);
    removed += 1;
  }
}

for (const dir of imageRoots) {
  if (!fs.existsSync(dir)) continue;
  walk(dir);
  prunedFrom.push(path.relative(process.cwd(), dir).replaceAll('\\', '/'));
}

const label = prunedFrom.length > 0 ? prunedFrom.join(', ') : 'dist/images';
console.log(
  `Pruned ${removed} source PNG(s) from ${label} (${(bytes / 1024 / 1024).toFixed(1)} MB).`,
);

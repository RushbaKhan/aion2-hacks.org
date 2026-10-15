import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const widths = [320, 400, 640, 960];
const dirs = [
  'public/images/blog',
  'public/images/gameplay',
  'public/images/extras',
];

async function optimizeDir(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const isScreenshot = /[\\/](?:gameplay|extras)$/i.test(relativeDir);
  const quality = isScreenshot ? 78 : 68;

  const files = fs
    .readdirSync(dir)
    .filter((file) => /\.(png|jpe?g)$/i.test(file) && !/-\d+\.webp$/i.test(file));

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.(png|jpe?g)$/i, '');
    const srcStat = fs.statSync(input);

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      if (fs.existsSync(output) && fs.statSync(output).mtimeMs >= srcStat.mtimeMs) continue;
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 6, smartSubsample: true })
        .toFile(output);
      console.log(`Wrote ${path.relative(root, output)}`);
    }
  }
}

for (const dir of dirs) {
  await optimizeDir(dir);
}

console.log('Image optimization complete.');

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const screenshotWidths = [400, 640, 960, 1920, 2560, 3840];
const blogWidths = [400, 640, 960, 1920];
const dirs = [
  'public/images/blog',
  'public/images/gameplay',
  'public/images/extras',
];

function isScreenshotDir(relativeDir) {
  return /[\\/](?:gameplay|extras)$/i.test(relativeDir);
}

function clearVariants(dir, base) {
  for (const file of fs.readdirSync(dir)) {
    if (file.startsWith(`${base}-`) && /\.(webp|avif)$/i.test(file)) {
      fs.unlinkSync(path.join(dir, file));
    }
  }
}

function screenshotPipeline(input, width) {
  const sigma = width >= 1920 ? 1.05 : width >= 960 ? 0.7 : 0.45;
  return sharp(input)
    .rotate()
    .resize({
      width,
      height: Math.round((width * 9) / 16),
      fit: 'cover',
      position: 'centre',
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .modulate({ brightness: 1.04, saturation: 1.12 })
    .sharpen({ sigma, m1: 1.2, m2: 0.55 });
}

async function writeAvif(pipeline, output) {
  try {
    await pipeline.clone().avif({
      quality: 72,
      effort: 5,
      chromaSubsampling: '4:4:4',
      bitdepth: 10,
    }).toFile(output);
  } catch {
    await pipeline.clone().avif({
      quality: 74,
      effort: 5,
      chromaSubsampling: '4:4:4',
    }).toFile(output);
  }
}

async function optimizeDir(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const screenshot = isScreenshotDir(relativeDir);
  const widths = screenshot ? screenshotWidths : blogWidths;

  const files = fs
    .readdirSync(dir)
    .filter(
      (file) =>
        /\.(png|jpe?g)$/i.test(file) &&
        !/-\d+\.(webp|avif)$/i.test(file) &&
        !/^cloud-dma\.jpe?g$/i.test(file),
    );

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.(png|jpe?g)$/i, '');
    if (screenshot) clearVariants(dir, base);

    for (const width of widths) {
      const webpOut = path.join(dir, `${base}-${width}.webp`);
      const avifOut = path.join(dir, `${base}-${width}.avif`);
      const srcStat = fs.statSync(input);
      const skipWebp = !screenshot && fs.existsSync(webpOut) && fs.statSync(webpOut).mtimeMs >= srcStat.mtimeMs;

      if (screenshot) {
        const pipeline = screenshotPipeline(input, width);
        await pipeline
          .clone()
          .webp({ quality: 96, effort: 6, smartSubsample: false })
          .toFile(webpOut);
        await writeAvif(pipeline, avifOut);
        console.log(`Wrote ${path.relative(root, webpOut)} + avif`);
        continue;
      }

      if (skipWebp) continue;
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 72, effort: 6, smartSubsample: true })
        .toFile(webpOut);
      console.log(`Wrote ${path.relative(root, webpOut)}`);
    }
  }
}

for (const dir of dirs) {
  await optimizeDir(dir);
}

console.log('Image optimization complete.');

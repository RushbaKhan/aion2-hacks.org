import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const assets = path.resolve(
  process.env.USERPROFILE,
  '.cursor/projects/c-Users-HP-OneDrive-Desktop-aion2/assets',
);
const destDir = path.resolve(process.cwd(), 'public/images/gameplay');

const shots = [
  {
    name: 'aion-outpost',
    src: 'c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_ff6925ef1bee49a5341169dea29d5601_images_aion_one-bb6ac0ea-8d6b-45a4-a5fa-425a44e1006b.jpg',
  },
  {
    name: 'aion-lab',
    src: 'c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_ff6925ef1bee49a5341169dea29d5601_images_aion_two-342ecfb3-ec57-4359-a153-ba9b07b6703e.jpg',
  },
  {
    name: 'aion-wilds',
    src: 'c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_ff6925ef1bee49a5341169dea29d5601_images_aion_three-0ee611a4-bfb2-4a5a-b0c1-51efbf1dbfe9.jpg',
  },
  {
    name: 'aion-garden',
    src: 'c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_ff6925ef1bee49a5341169dea29d5601_images_aion_four-6afc59bd-e2da-4a4b-b8b7-d557fa1d4cf9.jpg',
  },
  {
    name: 'aion-plaza',
    src: 'c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_ff6925ef1bee49a5341169dea29d5601_images_aion_five-35ba1775-71be-4b95-bccf-772f752a7f1e.jpg',
  },
];

const widths = [400, 640, 960, 1920, 2560, 3840];
fs.mkdirSync(destDir, { recursive: true });

for (const shot of shots) {
  const input = path.join(assets, shot.src);
  if (!fs.existsSync(input)) throw new Error(`Missing ${input}`);

  const jpg = path.join(destDir, `${shot.name}.jpg`);
  await sharp(input)
    .resize(3840, 2160, { kernel: sharp.kernel.lanczos3, fit: 'fill' })
    .jpeg({ quality: 96, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(jpg);

  for (const width of widths) {
    const webp = path.join(destDir, `${shot.name}-${width}.webp`);
    await sharp(jpg)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 90, effort: 6, smartSubsample: true })
      .toFile(webp);
    console.log(`Wrote ${path.basename(webp)}`);
  }
  console.log(`Wrote ${path.basename(jpg)}`);
}

for (const file of fs.readdirSync(destDir)) {
  if (/^ow/i.test(file)) {
    fs.unlinkSync(path.join(destDir, file));
    console.log(`Removed ${file}`);
  }
}

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const assets = 'C:/Users/UzzyXX/.cursor/projects/a-Websites-Created-The-Isle/assets';
const gameplayDir = path.join(root, 'public/images/gameplay');
const widths = [320, 400, 512, 640, 960, 1280, 1920, 2560, 3840];

/** Display order starts with img_1 (reeds/aim). Adjacent shots do not share the same theme. */
const shots = [
  {
    name: 'isle-reeds-aim',
    file: 'c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_006632e089debafc467ca251570a1e84_images_img_1-130492f8-0f93-41dc-a81e-685234d9a3da.jpg',
  },
  {
    name: 'isle-beach-snaplines',
    file: 'c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_006632e089debafc467ca251570a1e84_images_img_12-b4099605-43c3-4c4d-a0eb-cb107a9b4fe9.jpg',
  },
  {
    name: 'isle-combat-health',
    file: 'c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_006632e089debafc467ca251570a1e84_images_img_17-b5af38c6-586a-4e4c-843c-8f199c7237bb.jpg',
  },
  {
    name: 'isle-water-swim',
    file: 'c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_006632e089debafc467ca251570a1e84_images_img_18-d039e4c7-cce6-453c-800f-f163cdde2462.jpg',
  },
  {
    name: 'isle-jungle-close',
    file: 'c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_006632e089debafc467ca251570a1e84_images_img_15-b247a611-11a2-4b3a-b2d7-69d53900b629.jpg',
  },
  {
    name: 'isle-forest-radar',
    file: 'c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_006632e089debafc467ca251570a1e84_images_img_14-cdb34d6f-2f65-41f9-b769-110b82ff72ca.jpg',
  },
  {
    name: 'isle-beach-pack',
    file: 'c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_006632e089debafc467ca251570a1e84_images_img_16-212cb76b-525f-4cb3-a411-dd24d7a160ce.jpg',
  },
  {
    name: 'isle-player-esp',
    file: 'c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_006632e089debafc467ca251570a1e84_images_img_13-144b616a-f13e-4ab4-8e26-dcf5eba5ff06.jpg',
  },
];

fs.mkdirSync(gameplayDir, { recursive: true });

const stale = fs
  .readdirSync(gameplayDir)
  .filter((file) => /^isle-(forest|plains|beach|combat|water|jungle|reeds|player)/i.test(file));
for (const file of stale) {
  fs.unlinkSync(path.join(gameplayDir, file));
}

for (const shot of shots) {
  const input = path.join(assets, shot.file);
  if (!fs.existsSync(input)) {
    throw new Error(`Missing source screenshot: ${input}`);
  }

  const masterJpg = path.join(gameplayDir, `${shot.name}.jpg`);
  fs.copyFileSync(input, masterJpg);

  const meta = await sharp(masterJpg, { failOn: 'none' }).metadata();
  console.log(`master ${shot.name}.jpg ${meta.width}x${meta.height} (original copy)`);

  for (const width of widths) {
    if (meta.width && width > meta.width) continue;
    const output = path.join(gameplayDir, `${shot.name}-${width}.webp`);
    await sharp(masterJpg, { failOn: 'none' })
      .resize({ width, withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
      .webp({ quality: 100, effort: 6, smartSubsample: true, nearLossless: true })
      .toFile(output);
    console.log(`  ${path.basename(output)}`);
  }
}

console.log('Isle screenshot import complete.');

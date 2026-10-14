import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const destDir = path.resolve('public/images/gameplay');
const assets = path.resolve(
  'C:/Users/UzzyXX/.cursor/projects/a-Websites-Created-aion2-cheats/assets',
);

const shots = [
  ['c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_7470b7d32123ede4e82e78604fe4cbdb_images_img_6-caba578f-ebc8-41ba-b2c1-337928d9e5bf.jpg', 'aion2-lab-combat.jpg'],
  ['c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_7470b7d32123ede4e82e78604fe4cbdb_images_img_2-c6062182-17a2-41e6-867b-58ccbb88b5f9.jpg', 'aion2-safehaven-combat.jpg'],
  ['c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_7470b7d32123ede4e82e78604fe4cbdb_images_img_7-35d7854c-4ce5-495b-b19f-876fe2253efe.jpg', 'aion2-radar-map.jpg'],
  ['c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_7470b7d32123ede4e82e78604fe4cbdb_images_img_4-a57a12ac-7ed9-4dfa-a564-ccc2b60f3bc6.jpg', 'aion2-snaplines.jpg'],
  ['c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_7470b7d32123ede4e82e78604fe4cbdb_images_img_1-15815f26-577b-435f-962b-a714f808263e.jpg', 'aion2-player-esp.jpg'],
  ['c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_7470b7d32123ede4e82e78604fe4cbdb_images_img_5-960ddcae-b6a3-4644-a119-db27240b9847.jpg', 'aion2-dungeon-quest.jpg'],
  ['c__Users_UzzyXX_AppData_Roaming_Cursor_User_workspaceStorage_7470b7d32123ede4e82e78604fe4cbdb_images_img_3-955cd32d-509d-4afe-9a26-f0bcdd95a76d.jpg', 'aion2-flight-view.jpg'],
];

const widths = [320, 400, 512, 640, 960, 1280, 1920];

fs.mkdirSync(destDir, { recursive: true });

for (const [srcName, destName] of shots) {
  const src = path.join(assets, srcName);
  const dest = path.join(destDir, destName);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source ${src}`);
  }
  fs.copyFileSync(src, dest);
  const meta = await sharp(dest).metadata();
  console.log(`Copied ${destName} ${meta.width}x${meta.height} q=original`);

  const base = destName.replace(/\.jpe?g$/i, '');
  for (const width of widths) {
    const output = path.join(destDir, `${base}-${width}.webp`);
    await sharp(dest)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 95, effort: 6, smartSubsample: true })
      .toFile(output);
    const outStat = fs.statSync(output);
    console.log(`  ${path.basename(output)} ${(outStat.size / 1024).toFixed(0)} KB`);
  }
}

console.log('AION 2 screenshot import complete.');

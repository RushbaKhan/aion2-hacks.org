import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function resolveSitemapDir() {
  const candidates = [path.join(root, 'dist', 'client'), path.join(root, 'dist')];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'sitemap-0.xml'))) return dir;
  }
  for (const dir of candidates) {
    if (!fs.existsSync(dir)) continue;
    const shard = fs.readdirSync(dir).find((name) => /^sitemap-\d+\.xml$/.test(name));
    if (shard) return dir;
  }
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'sitemap-index.xml'))) return dir;
  }
  return null;
}

const dist = resolveSitemapDir();
if (!dist) {
  console.error('finalize-sitemap: sitemap-0.xml not found in dist/ or dist/client/ — run astro build first.');
  process.exit(1);
}

const shards = fs
  .readdirSync(dist)
  .filter((name) => /^sitemap-\d+\.xml$/.test(name))
  .sort();
const source = shards.length > 0 ? path.join(dist, shards[0]) : path.join(dist, 'sitemap-0.xml');

if (!fs.existsSync(source)) {
  console.error(`finalize-sitemap: ${path.relative(root, source)} not found — run astro build first.`);
  process.exit(1);
}

const raw = fs.readFileSync(source, 'utf8');
const urlCount = (raw.match(/<url>/g) ?? []).length;

if (urlCount === 0) {
  console.error('finalize-sitemap: sitemap shard contains no URLs.');
  process.exit(1);
}

function formatUrlset(xml) {
  return xml
    .replace(/^<\?xml[^?]*\?>/, '<?xml version="1.0" encoding="UTF-8"?>\n')
    .replace(/<urlset([^>]*)>/, '<urlset$1>\n')
    .replace(/<\/urlset>/, '\n</urlset>\n')
    .replace(/<url>/g, '  <url>\n')
    .replace(/<\/url>/g, '\n  </url>\n')
    .replace(/<loc>/g, '    <loc>')
    .replace(/<\/loc>/g, '</loc>\n')
    .replace(/<lastmod>/g, '    <lastmod>')
    .replace(/<\/lastmod>/g, '</lastmod>\n')
    .replace(/<changefreq>/g, '    <changefreq>')
    .replace(/<\/changefreq>/g, '</changefreq>\n')
    .replace(/<priority>/g, '    <priority>')
    .replace(/<\/priority>/g, '</priority>\n');
}

const formatted = formatUrlset(raw);
const relDist = path.relative(root, dist).replaceAll('\\', '/');
fs.writeFileSync(path.join(dist, 'sitemap.xml'), formatted, 'utf8');

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://islehacks.org/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </sitemap>
</sitemapindex>
`;
fs.writeFileSync(path.join(dist, 'sitemap-index.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap-0.xml'), formatted, 'utf8');

console.log(`Sitemap finalized: ${urlCount} URLs → ${relDist}/sitemap.xml`);

import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import path from 'node:path';

const ASSETS_DIR = path.resolve('public/assets');

// Målstorlekar baserat på faktisk visningsbredd (×2 för retina, med marginal).
const RULES = [
  { test: /^smilo-.*-transparent\.png$/i, kind: 'png', maxWidth: 1200 },
  // Loggor – visas bara some små logotyper i header/footer.
  { test: /^smilo-retro-camera-2-black\.png$/i, kind: 'png', maxWidth: 256 }, // header (max ~96px)
  { test: /^smilo-retro-camera-2\.png$/i, kind: 'png', maxWidth: 360 }, // footer (max ~144px)
  { test: /^carousel-\d+\.jpe?g$/i, kind: 'jpeg', maxWidth: 640 },
  { test: /^gallery-\d+\.jpe?g$/i, kind: 'jpeg', maxWidth: 640 },
];

const kb = (n) => (n / 1024).toFixed(1).padStart(8) + ' KB';

async function process(file) {
  const rule = RULES.find((r) => r.test.test(file));
  if (!rule) return null;

  const src = path.join(ASSETS_DIR, file);
  const tmp = src + '.tmp';
  const before = (await stat(src)).size;

  let pipeline = sharp(src).resize({
    width: rule.maxWidth,
    withoutEnlargement: true,
  });

  if (rule.kind === 'png') {
    pipeline = pipeline.png({ quality: 82, effort: 10, palette: true });
  } else {
    pipeline = pipeline.jpeg({ quality: 72, mozjpeg: true });
  }

  await pipeline.toFile(tmp);
  const after = (await stat(tmp)).size;

  // Behåll bara om vi faktiskt vann något.
  if (after < before) {
    await rename(tmp, src);
  } else {
    await unlink(tmp);
  }

  return { file, before, after, kept: after < before };
}

const files = await readdir(ASSETS_DIR);
const results = [];
for (const f of files) {
  const r = await process(f);
  if (r) results.push(r);
}

results.sort((a, b) => b.before - a.before);
let totalBefore = 0;
let totalAfter = 0;
for (const r of results) {
  totalBefore += r.before;
  totalAfter += r.kept ? r.after : r.before;
  const tag = r.kept ? '' : '  (oförändrad – redan mindre)';
  console.log(`${kb(r.before)} -> ${kb(r.kept ? r.after : r.before)}  ${r.file}${tag}`);
}
console.log('─'.repeat(50));
console.log(`TOTALT: ${kb(totalBefore)} -> ${kb(totalAfter)}  (−${(100 * (1 - totalAfter / totalBefore)).toFixed(0)}%)`);

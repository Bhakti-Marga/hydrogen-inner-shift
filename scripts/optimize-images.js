/**
 * Batch image optimizer for static assets in `public/`.
 *
 * Two things happen here, and both keep the authoring format (no WebP/AVIF
 * conversion — that is an intentional constraint):
 *
 *   1. Oversized raster images are resized down to ~2x their on-screen
 *      display size (`fit: 'inside'`, never upscaled).
 *   2. PNGs are re-encoded with palette quantization + max compression and
 *      JPEGs with mozjpeg.
 *
 * A file is only overwritten when the re-encode is genuinely smaller, so the
 * script is safe to re-run and won't inflate already-optimized assets.
 *
 * Run with: make optimize-images
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMG_DIR = path.join(PUBLIC_DIR, 'images');

/**
 * Files smaller than this are left untouched, even if they match a rule.
 * Small assets are already light enough that same-format recompression would
 * trade visible quality for negligible byte savings.
 */
const SKIP_UNDER_BYTES = 200 * 1024;

/**
 * Resize + compression rules: `pattern` → {maxWidth, maxHeight, quality}.
 * `maxWidth`/`maxHeight` are ~2x the largest on-screen render size; images
 * already smaller than the cap are only recompressed, never enlarged.
 */
const RESIZE_RULES = [
  // ── Home (public/images/pages/home) ───────────────────────────────────────
  // Full-bleed hero background (incl. the portrait `-mobile` crop). Smooth
  // sky/water gradients, so it ships as JPG — palette PNG would band.
  {pattern: /^hero-iceberg(-mobile)?\.jpe?g$/, maxWidth: 2400, maxHeight: 2400, quality: 90},
];

function ruleFor(fileName) {
  return RESIZE_RULES.find((r) => r.pattern.test(fileName));
}

function encodeForExt(pipeline, ext, quality) {
  if (ext === '.jpg' || ext === '.jpeg') {
    return pipeline.jpeg({quality, mozjpeg: true});
  }
  // PNG: palette quantization is what actually shrinks 32-bit PNGs.
  return pipeline.png({quality, palette: true, effort: 10, compressionLevel: 9});
}

async function optimizeFile(filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName).toLowerCase();
  const rule = ruleFor(fileName);
  if (!rule) return null;

  const originalBytes = fs.statSync(filePath).size;
  if (originalBytes < SKIP_UNDER_BYTES) return null;

  const meta = await sharp(filePath).metadata();

  const buffer = await encodeForExt(
    sharp(filePath).resize(rule.maxWidth, rule.maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    }),
    ext,
    rule.quality,
  ).toBuffer();

  // Only overwrite when we actually win.
  if (buffer.length >= originalBytes) return null;

  fs.writeFileSync(filePath, buffer);
  const newMeta = await sharp(filePath).metadata();

  return {
    file: fileName,
    originalKB: Math.round(originalBytes / 1024),
    newKB: Math.round(buffer.length / 1024),
    savedKB: Math.round((originalBytes - buffer.length) / 1024),
    dims: `${meta.width}x${meta.height} -> ${newMeta.width}x${newMeta.height}`,
  };
}

async function optimizeDir(dir) {
  if (!fs.existsSync(dir)) return {count: 0, saved: 0};
  const entries = fs.readdirSync(dir, {withFileTypes: true});

  let count = 0;
  let saved = 0;

  // Recurse into subdirectories (e.g. public/images/pages/<page>/) so
  // per-page asset folders are covered by the same rules.
  for (const entry of entries.filter((e) => e.isDirectory())) {
    const sub = await optimizeDir(path.join(dir, entry.name));
    count += sub.count;
    saved += sub.saved;
  }

  const files = entries
    .filter((e) => e.isFile() && /\.(png|jpe?g)$/i.test(e.name))
    .map((e) => path.join(dir, e.name));

  for (const file of files) {
    try {
      const r = await optimizeFile(file);
      if (r) {
        count += 1;
        saved += r.savedKB;
        console.log(
          `  ${r.file.padEnd(48)} ${r.dims.padEnd(24)} ${String(
            r.originalKB,
          ).padStart(6)}KB -> ${String(r.newKB).padStart(6)}KB  (-${r.savedKB}KB)`,
        );
      }
    } catch (err) {
      console.error(`  Error: ${path.basename(file)}: ${err.message}`);
    }
  }
  return {count, saved};
}

async function main() {
  console.log('\nOptimizing public/images ...\n');
  const images = await optimizeDir(IMG_DIR);

  const totalCount = images.count;
  const totalSaved = images.saved;
  if (totalCount === 0) {
    console.log('\n  Nothing to do — all matched images already optimized.\n');
  } else {
    console.log(
      `\n  Optimized ${totalCount} images, saved ${totalSaved}KB (${(
        totalSaved / 1024
      ).toFixed(1)}MB) total.\n`,
    );
  }
}

await main();

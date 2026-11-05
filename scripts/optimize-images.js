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
  // Full-bleed hero poster shown before / instead of the background film.
  // Photographic with soft shadows, so it ships as JPG — palette PNG would band.
  {
    pattern: /^hero-founders\.jpe?g$/,
    maxWidth: 2400,
    maxHeight: 1400,
    quality: 90,
  },
  // Mobile hero band: 393×225, so 2× is about 800×450.
  {
    pattern: /^hero-band-mobile\.jpe?g$/,
    maxWidth: 800,
    maxHeight: 460,
    quality: 90,
  },
  // Closing CTA panel: 1392×720 at the design width, inset 24px from the edges.
  {
    pattern: /^cta-fireside\.jpe?g$/,
    maxWidth: 2784,
    maxHeight: 1440,
    quality: 90,
  },
  // ── Programs (public/images/pages/programs) ───────────────────────────────
  // Hero panel: 1392×768 at the design width, inset 24px. Soft forest light, so JPG.
  {
    pattern: /^hero\.jpe?g$/,
    maxWidth: 2784,
    maxHeight: 1536,
    quality: 90,
  },
  // Flagship card photo: about 723×530 visible, shown slightly wider than the card.
  {
    pattern: /^flagship\.jpe?g$/,
    maxWidth: 1900,
    maxHeight: 1100,
    quality: 90,
  },
  // Immersion card photos: 405×228.
  {
    pattern: /^(beliefs|values|identity)\.jpe?g$/,
    maxWidth: 820,
    maxHeight: 456,
    quality: 90,
  },
  // Belief-row portraits: about 196×294 on screen.
  {
    pattern: /^belief-(hoodie|listen|circle|hands|embrace|gesture|presence)\.jpe?g$/,
    maxWidth: 400,
    maxHeight: 600,
    quality: 90,
  },
  // Feedback-card portrait: 38px circle.
  {
    pattern: /^feedback-avatar\.jpe?g$/,
    maxWidth: 152,
    maxHeight: 152,
    quality: 90,
  },
  // Example-day panel: 1392×780 at the design width, inset 24px.
  {
    pattern: /^example-day\.jpe?g$/,
    maxWidth: 2784,
    maxHeight: 1560,
    quality: 90,
  },
  // Day-immersion panel: same inset frame, 1392×760.
  {
    pattern: /^taster-day\.jpe?g$/,
    maxWidth: 2784,
    maxHeight: 1578,
    quality: 90,
  },
  // Closing panel: full bleed, 1440×699.
  {
    pattern: /^close\.jpe?g$/,
    maxWidth: 2880,
    maxHeight: 1400,
    quality: 90,
  },
  // ── About (public/images/pages/about) ─────────────────────────────────────
  // Hero photograph reuses the `hero.jpg` rule above (full-bleed, ~1440×820).
  // Founder circles on the hero cards: 52px.
  {
    pattern: /^hero-(ratna|avish)\.jpe?g$/,
    maxWidth: 160,
    maxHeight: 160,
    quality: 90,
  },
  // Small portrait on the profile panel: about 125×134.
  {
    pattern: /^ratna-portrait\.jpe?g$/,
    maxWidth: 400,
    maxHeight: 600,
    quality: 90,
  },
  // Large portrait beside that panel: about 680×663.
  {
    pattern: /^ratna-sofa\.jpe?g$/,
    maxWidth: 1400,
    maxHeight: 1400,
    quality: 90,
  },
  // Hillside behind the quote stack: about 1424×800.
  {
    pattern: /^hillside\.jpe?g$/,
    maxWidth: 2848,
    maxHeight: 1600,
    quality: 90,
  },
  // Three cards under "Neither of us runs this alone": about 455×300.
  {
    pattern: /^pair-(structure|depth|change)\.jpe?g$/,
    maxWidth: 1100,
    maxHeight: 740,
    quality: 90,
  },
  // Closing invitation: full bleed, 1440×699.
  {
    pattern: /^invite\.jpe?g$/,
    maxWidth: 2880,
    maxHeight: 1400,
    quality: 90,
  },
  // ── Mission (public/images/pages/mission) ─────────────────────────────────
  // Hero mosaic sources. Each file is one photograph, shown through several
  // rounded windows; caps are ~2× the frame that holds that photograph.
  {
    pattern: /^mosaic-fire\.jpe?g$/,
    maxWidth: 1600,
    maxHeight: 2400,
    quality: 90,
  },
  {
    pattern: /^mosaic-mug\.jpe?g$/,
    maxWidth: 1800,
    maxHeight: 2700,
    quality: 90,
  },
  {
    pattern: /^mosaic-flask\.jpe?g$/,
    maxWidth: 1400,
    maxHeight: 2100,
    quality: 90,
  },
  {
    pattern: /^mosaic-runners\.jpe?g$/,
    maxWidth: 1400,
    maxHeight: 1200,
    quality: 90,
  },
  // Statement avatar: 53px circle.
  {
    pattern: /^statement-avatar\.jpe?g$/,
    maxWidth: 160,
    maxHeight: 160,
    quality: 90,
  },
  // Approach photo: about 801×671, object-cover from a portrait original.
  {
    pattern: /^approach-lake\.jpe?g$/,
    maxWidth: 1800,
    maxHeight: 2700,
    quality: 90,
  },
  // Founder portraits: about 618px square.
  {
    pattern: /^(ratna|avish)\.jpe?g$/,
    maxWidth: 1400,
    maxHeight: 1400,
    quality: 90,
  },
  // Closing panel: 1392×720 at the design width, inset 24px.
  {
    pattern: /^close\.jpe?g$/,
    maxWidth: 2784,
    maxHeight: 1600,
    quality: 90,
  },
  // ── Why (public/images/pages/why) ─────────────────────────────────────────
  // Hero polaroids: about 257×248, object-cover. Cap at ~2× that frame.
  {
    pattern: /^polaroid-(laptop|hike|presenter|woods|table)\.jpe?g$/,
    maxWidth: 900,
    maxHeight: 900,
    quality: 90,
  },
  // Underneath panel: 1420×668, the submerged half of the iceberg.
  {
    pattern: /^underneath\.jpe?g$/,
    maxWidth: 2840,
    maxHeight: 1340,
    quality: 90,
  },
  // Lever-row portraits: about 196×294 on screen. The lean is CSS.
  {
    pattern: /^lever-(hike|mug|laugh|highfive|sofa|map|nametag)\.jpe?g$/,
    maxWidth: 400,
    maxHeight: 600,
    quality: 90,
  },
  // ── Confirmation (public/images/pages/confirmation) ───────────────────────
  // Full-viewport photograph behind the post-submission screen.
  {
    pattern: /^background\.jpe?g$/,
    maxWidth: 2880,
    maxHeight: 1800,
    quality: 90,
  },
  // Pill avatar: 30px on screen.
  {
    pattern: /^avatar\.jpe?g$/,
    maxWidth: 128,
    maxHeight: 128,
    quality: 90,
  },
  // Mobile menu cards: 350×188 (programmes) and 350×130 (the rest).
  {
    pattern: /^menu-(programmes|results|why|mission)\.jpe?g$/,
    maxWidth: 700,
    maxHeight: 376,
    quality: 90,
  },
  // ── Results (public/images/pages/results) ─────────────────────────────────
  // Testimonial cards: about 404×253, 16:10 crop of a 16:9 frame.
  {
    pattern: /^(francesco|tommaso|christian|gosha|josh|shweta)\.jpe?g$/,
    maxWidth: 808,
    maxHeight: 506,
    quality: 90,
  },
];

function ruleFor(fileName) {
  return RESIZE_RULES.find((r) => r.pattern.test(fileName));
}

function encodeForExt(pipeline, ext, quality) {
  if (ext === '.jpg' || ext === '.jpeg') {
    return pipeline.jpeg({quality, mozjpeg: true});
  }
  // PNG: palette quantization is what actually shrinks 32-bit PNGs.
  return pipeline.png({
    quality,
    palette: true,
    effort: 10,
    compressionLevel: 9,
  });
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
          ).padStart(
            6,
          )}KB -> ${String(r.newKB).padStart(6)}KB  (-${r.savedKB}KB)`,
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

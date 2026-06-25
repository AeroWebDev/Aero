/**
 * generate-assets.mjs
 * Creates all placeholder image/icon assets using only Node.js built-ins.
 * Run once with: node scripts/generate-assets.mjs
 * Replace generated files with final production assets before launch.
 */

import { deflateSync } from "zlib";
import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");

// ─────────────────────────────────────────────
// Minimal CRC32 for PNG chunk integrity
// ─────────────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++)
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.allocUnsafe(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crcBuf = Buffer.allocUnsafe(4);
  crcBuf.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crcBuf]);
}

// ─────────────────────────────────────────────
// PNG encoder — solid colour, no external deps
// ─────────────────────────────────────────────
function createPNG(width, height, r, g, b) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdrData = Buffer.allocUnsafe(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 2;  // colour type: RGB
  ihdrData[10] = ihdrData[11] = ihdrData[12] = 0;

  const rows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.allocUnsafe(1 + width * 3);
    row[0] = 0; // filter: None
    for (let x = 0; x < width; x++) {
      row[1 + x * 3] = r;
      row[2 + x * 3] = g;
      row[3 + x * 3] = b;
    }
    rows.push(row);
  }

  return Buffer.concat([
    sig,
    pngChunk("IHDR", ihdrData),
    pngChunk("IDAT", deflateSync(Buffer.concat(rows))),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

// ─────────────────────────────────────────────
// ICO builder (stores a PNG blob inside .ico)
// ─────────────────────────────────────────────
function createICO(pngBufs) {
  const count = pngBufs.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: ICO
  header.writeUInt16LE(count, 4);

  const dirs = [];
  const datas = [];
  let offset = dirSize;

  for (const buf of pngBufs) {
    const dir = Buffer.alloc(16);
    dir[0] = 0; // width  (0 = 256)
    dir[1] = 0; // height (0 = 256)
    dir[2] = 0; // colour count
    dir[3] = 0; // reserved
    dir.writeUInt16LE(1, 4); // planes
    dir.writeUInt16LE(32, 6); // bit count
    dir.writeUInt32LE(buf.length, 8);
    dir.writeUInt32LE(offset, 12);
    dirs.push(dir);
    datas.push(buf);
    offset += buf.length;
  }

  return Buffer.concat([header, ...dirs, ...datas]);
}

// ─────────────────────────────────────────────
// Minimal 1×1 WebP (lossless, VP8L) placeholder
// Replace with real images before launch.
// ─────────────────────────────────────────────
const WEBP_1x1 = Buffer.from(
  "UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAUAmJZACdAEO/gHOAAA=",
  "base64"
);

// ─────────────────────────────────────────────
// Palette — site colours
// ─────────────────────────────────────────────
const DARK_BG  = [15,  23, 42];   // #0f172a
const AERO_BLUE = [59, 130, 246]; // #3b82f6

// ─────────────────────────────────────────────
// Generate files
// ─────────────────────────────────────────────
const files = [
  // Favicons
  { path: "favicon-16x16.png",   buf: createPNG(16,  16,  ...AERO_BLUE) },
  { path: "favicon-32x32.png",   buf: createPNG(32,  32,  ...AERO_BLUE) },
  { path: "apple-touch-icon.png",buf: createPNG(180, 180, ...AERO_BLUE) },
  { path: "favicon.ico",         buf: createICO([createPNG(32, 32, ...AERO_BLUE)]) },

  // Logo / OG
  { path: "logo.png",            buf: createPNG(512, 512, ...AERO_BLUE) },
  { path: "og-image.jpg",        buf: createPNG(1200, 630, ...DARK_BG)  },
  { path: "placeholder.png",     buf: createPNG(800, 450, ...DARK_BG)   },

  // Content images (placeholder — replace with real webp files)
  { path: "hero.webp",           buf: WEBP_1x1 },
  { path: "team.webp",           buf: WEBP_1x1 },
  { path: "cover.webp",          buf: WEBP_1x1 },
];

for (const { path: rel, buf } of files) {
  const dest = join(PUBLIC, rel);
  writeFileSync(dest, buf);
  console.log(`  ✅ public/${rel}  (${buf.length} bytes)`);
}

// ─────────────────────────────────────────────
// logo.svg — copy existing favicon.svg
// ─────────────────────────────────────────────
const svgSrc = join(PUBLIC, "favicon.svg");
const logoSvgDest = join(PUBLIC, "logo.svg");
writeFileSync(logoSvgDest, readFileSync(svgSrc));
console.log(`  ✅ public/logo.svg`);

console.log("\n✅ All assets generated. Replace placeholder images before launch.");

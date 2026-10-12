// Optimises story images: OpenAI_images/<ID>-*.png → story/public/img/<ID>-{640,1280,1920}.{avif,webp} + manifest.json
// Usage: npm run images            (all approved IDs)
//        npm run images -- P1-09   (just one, e.g. after a re-roll)
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SRC = process.env.IMG_SRC ?? "OpenAI_images";
const OUT = "story/public/img";
const WIDTHS = [640, 1280, 1920];
// Only images that passed review go live (storyboard §10 / OpenAI_image.md checklist).
const APPROVED = ["P1-01", "P1-02", "P1-03", "P1-04", "P1-05", "P1-06", "P1-07", "P1-08", "P1-08b", "P1-09", "P1-10"];

const only = process.argv.slice(2);
const ids = only.length ? only : APPROVED;
mkdirSync(OUT, { recursive: true });
const manifestPath = join(OUT, "manifest.json");
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const files = readdirSync(SRC);

for (const id of ids) {
  // Match "P1-08-…" but not "P1-08b-…" when asking for P1-08.
  const file = files.find((f) => f.startsWith(`${id}-`) && /\.(png|jpe?g|webp)$/i.test(f));
  if (!file) {
    console.warn(`skip ${id}: no file in ${SRC}`);
    continue;
  }
  const input = sharp(join(SRC, file));
  const meta = await input.metadata();
  const { dominant } = await input.stats();
  const color = `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`;
  const widths = WIDTHS.filter((w) => w <= (meta.width ?? 0));
  if (!widths.length || widths[widths.length - 1] < (meta.width ?? 0)) widths.push(Math.min(meta.width ?? 1920, 1920));
  const unique = [...new Set(widths)].sort((a, b) => a - b);
  for (const w of unique) {
    const resized = sharp(join(SRC, file)).resize({ width: w, withoutEnlargement: true });
    await resized.clone().avif({ quality: 55, effort: 5 }).toFile(join(OUT, `${id}-${w}.avif`));
    await resized.clone().webp({ quality: 74 }).toFile(join(OUT, `${id}-${w}.webp`));
  }
  manifest[id] = { w: meta.width, h: meta.height, color, widths: unique };
  console.log(`${id}: ${file} (${meta.width}×${meta.height}) → ${unique.join("/")}w, colour ${color}`);
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
console.log(`manifest: ${Object.keys(manifest).length} images`);

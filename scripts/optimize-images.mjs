// Optimises images from OpenAI_images/ (and its Portal_1/ Portal_2/ subfolders):
//   P1-*  → story/public/img/<ID>-{640,1280,1920}.{avif,webp} + manifest.json  (responsive story backgrounds)
//   P2-*  → web/public/img/<ID>.webp                                          (one size for the product UI)
// Usage: npm run images            (all approved IDs)
//        npm run images -- P1-09   (just one, e.g. after a re-roll)
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SRC = process.env.IMG_SRC ?? "OpenAI_images";
const OUT = "story/public/img";
const WIDTHS = [640, 1280, 1920];
// Only images that passed review go live (storyboard §10 / OpenAI_image.md checklist).
const APPROVED = ["P1-01", "P1-02", "P1-03", "P1-04", "P1-05", "P1-06", "P1-07", "P1-08", "P1-08b", "P1-09", "P1-10", "P2-01", "P2-02", "P2-03", "P2-04", "P2-05", "P2-06", "P2-07", "P2-08"];
const WEB_OUT = "web/public/img";
// Portal 2 widths: hero photos vs. circular avatars (shown at ≤96px, so 256px covers 2x screens).
const WEB_WIDTH = { "P2-01": 1200, "P2-02": 1400 };
// Portal 2 also shows Arjun's portrait from Portal 1 as an avatar.
const WEB_EXTRA = ["P1-10"];

const only = process.argv.slice(2);
const ids = only.length ? only : APPROVED;
mkdirSync(OUT, { recursive: true });
const manifestPath = join(OUT, "manifest.json");
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const files = [SRC, join(SRC, "Portal_1"), join(SRC, "Portal_2")]
  .filter((d) => existsSync(d))
  .flatMap((d) => readdirSync(d).map((f) => ({ dir: d, name: f })));
mkdirSync(WEB_OUT, { recursive: true });

for (const id of ids) {
  // Match "P1-08-…" but not "P1-08b-…" when asking for P1-08.
  const found = files.find((f) => f.name.startsWith(`${id}-`) && /\.(png|jpe?g|webp)$/i.test(f.name));
  if (!found) {
    console.warn(`skip ${id}: no file in ${SRC}`);
    continue;
  }
  const file = join(found.dir, found.name);
  if (id.startsWith("P2-") || WEB_EXTRA.includes(id)) {
    const w = WEB_WIDTH[id] ?? 256;
    await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(join(WEB_OUT, `${id}.webp`));
    console.log(`${id}: ${found.name} → ${WEB_OUT}/${id}.webp (${w}w)`);
    if (id.startsWith("P2-")) continue;
  }
  const input = sharp(file);
  const meta = await input.metadata();
  const { dominant } = await input.stats();
  const color = `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`;
  const widths = WIDTHS.filter((w) => w <= (meta.width ?? 0));
  if (!widths.length || widths[widths.length - 1] < (meta.width ?? 0)) widths.push(Math.min(meta.width ?? 1920, 1920));
  const unique = [...new Set(widths)].sort((a, b) => a - b);
  for (const w of unique) {
    const resized = sharp(file).resize({ width: w, withoutEnlargement: true });
    await resized.clone().avif({ quality: 55, effort: 5 }).toFile(join(OUT, `${id}-${w}.avif`));
    await resized.clone().webp({ quality: 74 }).toFile(join(OUT, `${id}-${w}.webp`));
  }
  manifest[id] = { w: meta.width, h: meta.height, color, widths: unique };
  console.log(`${id}: ${found.name} (${meta.width}×${meta.height}) → ${unique.join("/")}w, colour ${color}`);
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
console.log(`manifest: ${Object.keys(manifest).length} images`);

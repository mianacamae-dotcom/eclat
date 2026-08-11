// Build the static Éclat site into ./dist for GitHub Pages.
// Canonical source is site/eclat.html — this script never modifies it.
// It produces a publishable copy with:
//   - the __ORIGIN__ placeholder resolved to the deployed base URL (for og:image)
//   - a favicon link injected
//   - all image assets copied alongside index.html
import { mkdir, readFile, writeFile, copyFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const dist = new URL("dist/", root);

// Base URL where the site is served. Override with SITE_ORIGIN in CI if needed.
const ORIGIN = process.env.SITE_ORIGIN || "https://mianacamae-dotcom.github.io/eclat";

const srcHtml = await readFile(new URL("site/eclat.html", root), "utf8");

let html = srcHtml.replaceAll("__ORIGIN__", ORIGIN);

// Inject a favicon link (only in the published copy) if not already present.
if (!html.includes('rel="icon"')) {
  html = html.replace(
    "</title>",
    '</title>\n  <link rel="icon" type="image/svg+xml" href="favicon.svg">'
  );
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await writeFile(new URL("index.html", dist), html, "utf8");

// Assets referenced by the page (relative paths) + social image + favicon.
const assets = [
  ["site/eclat-logo-champagne-pearl.png", "eclat-logo-champagne-pearl.png"],
  ["site/eclat-logo-champagne-pearl-no-tagline.png", "eclat-logo-champagne-pearl-no-tagline.png"],
  ["public/og.png", "og.png"],
  ["public/favicon.svg", "favicon.svg"],
];
for (const [from, to] of assets) {
  await copyFile(new URL(from, root), new URL(to, dist));
}

// Prevent GitHub Pages from running Jekyll on the output.
await writeFile(new URL(".nojekyll", dist), "", "utf8");

console.log(`Built Éclat static site into ${fileURLToPath(dist)} (origin: ${ORIGIN})`);

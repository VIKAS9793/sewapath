/**
 * Module: prepare-seo
 * Layer: Shared
 * Purpose: Write absolute production URLs into the built SEO files for the selected site domain.
 * Dependencies: dist/client/index.html, SEWAPATH_SITE_URL build environment variable
 * Author: Vikas Sahani
 * Date: August 22, 2026
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const clientRoot = path.join(projectRoot, "dist", "client");
const siteUrl = (process.env.SEWAPATH_SITE_URL || "https://sewapath.pages.dev").replace(/\/$/, "");
const indexPath = path.join(clientRoot, "index.html");

/**
 * Replace relative canonical and social image URLs with absolute URLs for crawlers.
 *
 * @param html Built HTML document emitted by Vite.
 * @returns HTML document with production-origin SEO URLs.
 */
function injectAbsoluteUrls(html) {
  return html
    .replace('<link rel="canonical" href="__SEWAPATH_CANONICAL__" />', `<link rel="canonical" href="${siteUrl}/" />`)
    .replaceAll('content="/assets/sewapath/maharashtra-journey.png"', `content="${siteUrl}/assets/sewapath/maharashtra-journey.png"`);
}

const builtIndex = readFileSync(indexPath, "utf8");
writeFileSync(indexPath, injectAbsoluteUrls(builtIndex), "utf8");

writeFileSync(
  path.join(clientRoot, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>2026-08-22</lastmod>\n  </url>\n</urlset>\n`,
  "utf8",
);

writeFileSync(
  path.join(clientRoot, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  "utf8",
);

console.log(`Prepared SEO files for ${siteUrl}`);

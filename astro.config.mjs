import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import llms from "astro-llms-md";
import { execFileSync } from "node:child_process";
import { appendFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

const site = "https://wolfautokereskedes.hu";

// Preload the latin and latin-ext fonts (ő and ű live in latin-ext) with a Link header too,
// so Cloudflare can send early hints. File names are hashed, hence generated after the build.
const preloadFonts = () => ({
  name: "preload-font-headers",
  hooks: {
    "astro:build:done": ({ dir }) => {
      const assets = fileURLToPath(new URL("_astro/", dir));
      const links = readdirSync(assets)
        .filter((f) => /^hanken-grotesk-latin(-ext)?-wght-normal\..+\.woff2$/.test(f))
        .map((f) => `  Link: </_astro/${f}>; rel=preload; as=font; type="font/woff2"; crossorigin`);
      appendFileSync(fileURLToPath(new URL("_headers", dir)), `\n/*\n${links.join("\n")}\n`);
    },
  },
});

// Shared by every page, a change here counts as a change of each page.
const sharedSources = [
  "src/layouts",
  "src/data",
  "src/styles",
  "src/components/Header.astro",
  "src/components/Footer.astro",
];

const sitemapPages = [
  {
    path: "/",
    priority: "1.0",
    sources: [
      "src/pages/index.astro",
      "src/components/Hero.astro",
      "src/components/Services.astro",
      "src/components/WhyUs.astro",
      "src/components/Faq.astro",
    ],
  },
  {
    path: "/services/",
    priority: "0.9",
    sources: ["src/pages/services.astro", "src/components/ServiceDetails.astro"],
  },
  {
    path: "/pricing/",
    priority: "0.8",
    sources: ["src/pages/pricing.astro", "src/components/PricingTable.astro"],
  },
  {
    path: "/contact/",
    priority: "0.7",
    sources: ["src/pages/contact.astro", "src/components/ContactMap.astro"],
  },
];

/** Last commit date of the given paths, or the build time when git history is unavailable. */
const lastModified = (sources) => {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...sources], {
      encoding: "utf8",
    }).trim();
    if (date) return new Date(date).toISOString();
  } catch {
    // Not a git checkout, fall through.
  }
  return new Date().toISOString();
};

// lastmod comes from git, so CI must check out the full history (fetch-depth: 0).
const sitemap = () => ({
  name: "sitemap-lastmod",
  hooks: {
    "astro:build:done": ({ dir }) => {
      const urls = sitemapPages
        .map(
          ({ path, priority, sources }) =>
            `  <url>\n    <loc>${site}${path}</loc>\n    <lastmod>${lastModified([...sources, ...sharedSources])}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
        )
        .join("\n");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
      writeFileSync(fileURLToPath(new URL("sitemap.xml", dir)), xml);
    },
  },
});

export default defineConfig({
  site,
  output: "static",
  integrations: [
    preloadFonts(),
    sitemap(),
    llms({
      name: "Wolf Autókereskedés",
      description:
        "Eredetvizsgálat, gépjárműátírás és ingyenes biztosításkötés Szombathelyen. Árak, nyitvatartás és elérhetőség.",
      excludeSelectors: ["iframe", "svg"],
      trailingSlash: "always",
    }),
  ],
  trailingSlash: "always",
  build: {
    // External stylesheets only, so the CSP in public/_headers needs no 'unsafe-inline'.
    inlineStylesheets: "never",
  },
  vite: {
    build: {
      // Never inline assets as data: URIs, the CSP only allows 'self'.
      assetsInlineLimit: 0,
    },
    plugins: [tailwindcss()],
  },
});

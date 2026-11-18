import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import llms from "astro-llms-md";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

const site = "https://wolfautokereskedes.hu";

// Preload the latin and latin-ext fonts (ő and ű live in latin-ext) with a Link header too,
// so Cloudflare can send early hints. File names are hashed, hence generated after the build.
// The lines go into the existing "/*" block: a second "/*" block makes Cloudflare drop the first.
const preloadFonts = () => ({
  name: "preload-font-headers",
  hooks: {
    "astro:build:done": ({ dir }) => {
      const assets = fileURLToPath(new URL("_astro/", dir));
      const links = readdirSync(assets)
        .filter((f) => /^hanken-grotesk-latin(-ext)?-wght-normal\..+\.woff2$/.test(f))
        .map((f) => `  Link: </_astro/${f}>; rel=preload; as=font; type="font/woff2"; crossorigin`);
      const file = fileURLToPath(new URL("_headers", dir));
      const rules = readFileSync(file, "utf8");
      const endOfFirstBlock = rules.indexOf("\n\n");
      if (!rules.startsWith("/*\n") || endOfFirstBlock === -1) {
        throw new Error('_headers must start with a "/*" block');
      }
      writeFileSync(
        file,
        `${rules.slice(0, endOfFirstBlock)}\n${links.join("\n")}${rules.slice(endOfFirstBlock)}`,
      );
    },
  },
});

// astro-llms-md 3.0.3 ignores its trailingSlash option and always strips the slash from the page
// URLs it writes, but the canonical URLs end with one. Must be listed after llms() to run after it.
const llmsTrailingSlash = () => ({
  name: "llms-trailing-slash",
  hooks: {
    "astro:build:done": ({ dir }) => {
      const withSlash = (url) => (url.endsWith("/") ? url : `${url}/`);
      const root = fileURLToPath(dir);
      const files = [...readdirSync(root).filter((f) => f.endsWith(".md")), "llms-full.txt"];
      for (const name of files) {
        const file = `${root}${name}`;
        const text = readFileSync(file, "utf8")
          .replace(/^(url: ")(.*)(")$/gm, (_, a, url, b) => `${a}${withSlash(url)}${b}`)
          .replace(/^(URL: )(\S+)$/gm, (_, a, url) => `${a}${withSlash(url)}`);
        writeFileSync(file, text);
      }
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
    }),
    llmsTrailingSlash(),
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

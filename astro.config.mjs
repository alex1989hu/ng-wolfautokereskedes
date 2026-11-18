import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import llms from "astro-llms-md";
import { appendFileSync, readdirSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";

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

export default defineConfig({
  site: "https://wolfautokereskedes.hu",
  output: "static",
  integrations: [
    preloadFonts(),
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

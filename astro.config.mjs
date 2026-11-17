import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import llms from "astro-llms-md";

export default defineConfig({
  site: "https://wolfautokereskedes.hu",
  output: "static",
  integrations: [
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

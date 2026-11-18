# ng-wolfautokereskedes

One page [Astro](https://astro.build) website in Hungarian to advertise a vehicle origin inspection, title transfer and insurance service in Szombathely.

## Recipe

- [Astro 7](https://astro.build), static output
- [Tailwind CSS 4](https://tailwindcss.com), design tokens in [global.css](src/styles/global.css)
- [Hanken Grotesk](https://fontsource.org/fonts/hanken-grotesk), self-hosted via Fontsource
- [Lucide](https://lucide.dev) icons
- [astro-llms-md](https://github.com/tfmurad/astro-llms-md) generates `llms.txt`, `llms-full.txt` and a markdown file per page at build time for AI agents

Business data (contact, prices, FAQ) lives in [site.ts](src/data/site.ts).

## Development

Requires Node 26 (see [.nvmrc](.nvmrc), `nvm use` picks it up).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
npm run preview
npm run lint     # ESLint (incl. template a11y rules)
npm run check    # astro check (TypeScript + templates)
npm run format   # Prettier check, use `npx prettier --write .` to fix
```

## Deployment

### Cloudflare Pages

[wrangler.jsonc](wrangler.jsonc) and [public/_headers](public/_headers) (CSP, security headers, caching) are ready for Cloudflare Pages. Once the migration is complete, delete the FTP step from GitHub Action.

### Markdown for agents

Every page has a generated markdown twin (`/pricing/` → `/pricing.md`). [functions/_middleware.ts](functions/_middleware.ts) is a Cloudflare Pages Function that returns it for `Accept: text/markdown`. [public/_routes.json](public/_routes.json) limits the function to the four page paths, so assets never invoke it. Keep both in sync when adding a page. The response carries `X-Markdown-Tokens`, a rough token estimate (characters / 3). The build adds the same header to the static `.md` files through `_headers`, so keep the formula in [astro.config.mjs](astro.config.mjs) and the function in sync. On the Workers Free plan every call counts towards 100,000 a day, so set "Fail open" under Workers & Pages → project → Settings → Runtime; pages then still load as HTML when the quota is used up. Try it with `curl -H "Accept: text/markdown" https://wolfautokereskedes.hu/pricing/`.

### Map

The contact page shows a static image of the location instead of a third-party embed, so no visitor data goes to Google. [map.webp](src/assets/map.webp) is built from OpenStreetMap tiles by [build-map.mjs](scripts/build-map.mjs); rerun `node scripts/build-map.mjs` only if the location changes. The image links to the Google Maps place, and the "Útvonaltervezés" button opens Google Maps directions to the address, with small links for Waze and Apple Maps. The OpenStreetMap credit under the image is required by the ODbL licence.

### SEO

[robots.txt](public/robots.txt) is a static file in `public/`. `sitemap.xml` is generated at build time in [astro.config.mjs](astro.config.mjs), with `lastmod` from the last git commit touching each page. Search console tokens are `<meta>` tags in [Layout.astro](src/layouts/Layout.astro), plus `public/google68f2ed3cba4aae86.html` and `public/BingSiteAuth.xml`.

[IndexNow](https://www.indexnow.org): the key is the name of the hex `.txt` file in `public/`, which contains the same key. After each deploy, CI runs [indexnow.mjs](scripts/indexnow.mjs) to submit the sitemap URLs to Bing and other participating engines (not Google). Try it locally with `npm run build && node scripts/indexnow.mjs --dry-run`.

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

Requires Node 24 (see [.nvmrc](.nvmrc), `nvm use` picks it up).

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

### Cloudflare Pages (not active yet)

[wrangler.jsonc](wrangler.jsonc) and [public/_headers](public/_headers) (CSP, security headers, caching) are ready for Cloudflare Pages. To switch, replace the FTP step with `cloudflare/wrangler-action` running `pages deploy dist --project-name=wolfautokereskedes` and add the secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

### SEO

[robots.txt](public/robots.txt) and [sitemap.xml](public/sitemap.xml) are static files in `public/`. Search console tokens are `<meta>` tags in [Layout.astro](src/layouts/Layout.astro), plus `public/google68f2ed3cba4aae86.html` and `public/BingSiteAuth.xml`.

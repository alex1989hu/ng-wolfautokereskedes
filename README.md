# ng-wolfautokereskedes
Simple one page Angular app in Hungarian language to advert a service for specific customers.
## Recipe
- [Angular 19](https://angular.io)
- [Bootsrap 5](https://getbootstrap.com)
- [Fontawesome 6](https://fontawesome.com)
- [Icons8](https://icons8.com)
- [Roboto fonts](https://fonts.google.com/specimen/Roboto)

## Development
### Build and lint
```bash
npm run lint
npm run build
```

### Package update
```bash
ng update
npm update
```

### SEO
Default files for website crawler [robots.txt](src/seo/robots.txt), [sitemap.xml](src/seo/sitemap.xml).
#### Bing Webmaster Tools
Current token is written in [index.html](src/index.html). Example `<meta name="msvalidate.01" content="token" />`

Additional file is deployed next to `index.html`: [BingSiteAuth.xml](src/seo/BingSiteAuth.xml)
#### Google Search Console
Current token is written in [index.html](src/index.html) `<meta name="google-site-verification" content="token" />` `google68f2ed3cba4aae86.html`

Additional file is deployed next to `index.html`: [google68f2ed3cba4aae86.html](src/seo/google68f2ed3cba4aae86.html)

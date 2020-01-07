# ng-wolfautokereskedes
Simple one page Angular app in Hungarian language to advert a service for specific customers.
## Recipe
- [Angular 8](https://angular.io)
- [Bootsrap 4](https://getbootstrap.com)
- [Fontawesome 5](https://fontawesome.com)
- [Icons8](https://icons8.com)
- [Roboto fonts](https://fonts.google.com/specimen/Roboto)

## Development
## Build and lint
```bash
ng lint
ng build --prod --build-optimizer
```

After build do not forget to **replace** `type="module"` to `type="text/javascript"` in generated [index.html](dist/wolfautokereskedes/index.html).
For further details visit [angular-issue-30835](https://github.com/angular/angular/issues/30835).
## Package update
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

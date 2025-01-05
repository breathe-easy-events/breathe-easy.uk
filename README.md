# breathe-easy.uk

Based on [`11tsy-starter`](https://github.com/aaaaargZombies/11tsy-starter/)

## Development

The approach with this starter is to treat Eleventy layouts as wrappers for stateless UI components so they can be easily tested and reasoned about. The contract between these components and Eleventy can be expressed as types in `eleventy.ts`.

Although JSX is used for the templates there is no connection to react and these components will be rendered to static HTML in the build process with no hydration.


### Prerequisites

- [node](https://nodejs.org/) I recommend using [asdf](https://asdf-vm.com/) or other version manager.

### Setup & install instructions

- clone this repo.
- make sure you are using the correct node version listed in `.tool-versions`
- install dependencies with `npm install`

### Build

- `npm start` to start a dev server on http://localhost:5173
- `npm run build` generate a production build in `dist/`

### Testing

- `npm test` to run vitest in watch mode

You can use Vitest and Testing Library to make assertions about how your components render. See this [example](https://github.com/aaaaargZombies/11tsy-starter/blob/df4ba94d3270abe9ecf36d95a8a7812173f36973/src/_components/Heading.test.tsx). Currently there is no test server delivering assets so things like links to CSS files will raise warnings if you test a full layout.

Tests are co-located with their source.

```
src
├── _components
│   ├── Heading.test.tsx
│   └── Heading.tsx
```

### Cache Busting

As static sites are often hosted on CDNs it is a good idea to hash assets so you don't get outdated CSS, etc loading after an update has been made. This is currently handles through an [Eleventy transform](https://www.11ty.dev/docs/transforms/) and can be triggered by adding `data-asset-hash` attribute to an element but the `href`/`src` needs to be pointing to the root. For example.

```html
<link data-asset-hash href="/css/styles.css" rel="stylesheet" />
```


## Code & configs

### This site is built with `Elm` and bundled by `Vite`

- [Elm's official homepage](https://elm-lang.org/).
- [Elm Package docs](https://package.elm-lang.org/)
- [Vite's official documentation.](https://vitejs.dev/)
- [Vite static asset handling](https://package.elm-lang.org/packages/hmsk/elm-vite-plugin-helper/latest/)

### What it's for

- `eleventy.config.ts` configure the Eleventy build
- `eleventy.ts` a place to add types that describe the data you expect to consume from Eleventy
- `package.json` node dependencies and scripts
- `tsconfig.json` typescript configuration for the Eleventy build process
- `vitest.config.js` test configuration
- `src` source for building the site
- `src/_config` entry point for [organizing the Eleventy config](https://www.lenesaile.com/en/blog/organizing-the-eleventy-config-file/)
- `src/_includes` default layouts folder
- `src/_components` components to be used by layouts or shortcodes
- `./src/js/index.ts` entrypoint for compiling *client side* JS. Bundling options are set in `src/_config/bundle-javascript.ts`
- `./src/css/styles.scss` entrypoint for compiling CSS add a `browserlist` entry to `package.json` or `.browserslistrc` to change lightningcss default targets

### baseURL

the `BASE_URL` environment variable is set by doing.

```sh
BASE_URL="https://breathe-easy.uk" npm start
```

This will then be accessed as `globalData` in templates under `data.baseURL`


## Content

New pages can be added and edited through the Decap CMS available at [breathe-easy.uk/admin](https://breathe-easy.uk/admin). You can mess about in the [demo environment](https://demo.decapcms.org/) without effecting the site.

### pages

Pages accept the following front-matter

```yaml
layout: "which template to use"
menu: (true | false) show page title in navigation, defaults to false
title: "for pages h1 and opengraph metadata"
description: "[optional] for opengraph metadata"
emoji: "[optional] for insertion to favicon"
socialImage: "[optional] for opengraph metadata (external link or path to file)"
socialImageAlt: "[optional] alt text describing social preview image, if you do not include this then it will fallback to the default image / alt"
```

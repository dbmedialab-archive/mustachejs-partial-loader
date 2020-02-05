# mustachejs-partial-loader

A loader for webpack that works with mustachejs-loader package to load in partials from a directory.

## Getting started

To begin, you'll need to install mustache, mustachejs-partial-loader and mustachejs-loader:

Yarn

```bash
$ yarn add --dev mustache mustachejs-loader mustachejs-partial-loader
```

Npm

```bash
$ npm install mustache mustachejs-loader mustachejs-partial-loader --save-dev
```

**Webpack config**

```javascript
module: {
  rules: [
    {
      test: /\.mustache$/,
      loader: [
        '@aller/mustachejs-loader',
        '@aller/mustachejs-partial-loader',
      ]
    }
  ]
}
```


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

## Options

### `path`

Type: `string`  
Default: `./partials`

Decides where to look for partials

### `recurse`

Type: `boolean`  
Default: `false`

If set it will recursivly look for partials in the specified location

### `suffix`

Type: `string`  
Default: `.mustache`

What the file ending should be

### `modifyTemplateKey`

Type: `[[string | regexp, string],...]`
Default: `[]`

If added you can modify the name of the key for your templates.

Instead of asking for

```html
{{ > ./partials/header/site.mustache }}
````

you can add a modifiers

```javascript
modifyTemplateKey: [
  ['./partials/', ''],
  [/\.mustache$/, '']
]
```

and change it to

```html
{{ > header/site }}
```

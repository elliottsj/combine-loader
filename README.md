# combine-loader

[![npm version](https://img.shields.io/npm/v/combine-loader.svg)](https://www.npmjs.com/package/combine-loader)
[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/i2aljhr7inuh9wrf/branch/master?svg=true)](https://ci.appveyor.com/project/elliottsj/combine-loader/branch/master)

webpack loader to combine results from multiple loaders into one object

## Installation

```shell
npm install combine-loader
```

## Usage

In your webpack configuration, pass an object as the options for `combine-loader`. Each key-value pair corresponds to the same key in the exported object, using the provided loader string value to load the file. For example:

```js
module.exports = {
  // ...
  module: {
    // ...
    rules: [
      {
        test: /\.md$/,
        loader: 'combine-loader',
        options: {
          raw: 'raw-loader',
          frontmatter: ['json-loader', 'front-matter-loader?onlyAttributes'],
          content: [
            'html-loader',
            'markdown-it-loader',
            'front-matter-loader?onlyBody',
          ],
        },
      },
    ],
  },
};
```

In the above example, the final exported value for **.md** files is an object with keys `raw`, `frontmatter`, and `content`, with values loaded using the provided loaders. In other words, this...

```js
const example = require('./example.md');
```

...is effectively equivalent to this:

```js
const example = {
  raw: require('!raw-loader!./example.md'),
  frontmatter: require('!json-loader!front-matter-loader?onlyAttributes!./example.md'),
  content: require('!html-loader!markdown-it-loader!front-matter-loader?onlyBody!./example.md'),
};
```

[_NOTE: `!` is prepended to override loaders in webpack's config_](https://webpack.js.org/concepts/loaders/#inline)

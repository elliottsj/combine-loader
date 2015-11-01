# combine-loader
Webpack loader to combine results from multiple loaders into one object

## Installation

```shell
npm install combine-loader
```

## Usage

In your webpack configuration, pass an object as the query string for `combine-loader`. Each key-value pair corresponds to the same key in the exported object, using the provided loader string value to load the file. For example:

```js
module.exports = {
  // ...
  module: {
    // ...
    loaders: [
      {
        test: /\.md$/,
        loader: 'combine-loader?' + JSON.stringify({
          raw: 'raw-loader',
          frontmatter: ['json-loader', 'front-matter-loader?onlyAttributes'],
          content: ['html-loader', 'markdown-it-loader', 'front-matter-loader?onlyBody']
        })
      }
    ]
  }
}
```

In the above example, the final exported value for **.md** files is an object with keys `raw`, `frontmatter`, and `content`, with values loaded using the provided loaders. In other words, this...

```js
const example = require('./example.md')
```

...is effectively equivalent to this:

```js
const example = {
  raw: require('!!raw-loader!./example.md'),
  frontmatter: require('!!json-loader!front-matter-loader?onlyAttributes!./example.md'),
  content: require('!!html-loader!markdown-it-loader!front-matter-loader?onlyBody!./example.md')
}
```

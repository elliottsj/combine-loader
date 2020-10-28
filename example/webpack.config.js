const path = require('path');

const combineLoader = require.resolve('..');

module.exports = {
  mode: 'none',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'build'),
    pathinfo: true,
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: combineLoader,
        options: {
          content: [
            'html-loader',
            'markdown-it-loader',
            'front-matter-loader?{"onlyBody":true}',
          ],
          frontmatter: [
            'json-loader',
            'front-matter-loader?{"onlyAttributes":true}',
          ],
          raw: 'raw-loader',
        },
      },
    ],
  },
};

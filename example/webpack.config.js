const path = require('path');

const combineLoader = require.resolve('..');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'build'),
    pathinfo: true,
  },
  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: `${combineLoader}?${JSON.stringify({
          raw: 'raw-loader',
          frontmatter: ['json-loader', 'front-matter-loader?onlyAttributes'],
          content: ['html-loader', 'markdown-it-loader', 'front-matter-loader?onlyBody'],
        })}`,
      },
    ],
  },
};

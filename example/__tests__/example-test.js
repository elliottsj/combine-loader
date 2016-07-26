jest.unmock('../webpack.config');

import path from 'path';
import webpack from 'webpack';
import config from '../webpack.config';

describe('example', () => {
  it('combines loader results into one object', () => new Promise((resolve) => {
    webpack(config, (error, stats) => {
      const bundlePath = path.resolve(
        stats.compilation.compiler.outputPath,
        stats.toJson().assetsByChunkName.main
      );
      expect(require(bundlePath)).toEqual({ // eslint-disable-line global-require
        raw: '---\ntitle: Example\n---\n\nSome markdown\n',
        frontmatter: { title: 'Example' },
        content: '<p>Some markdown</p>\n',
      });
      resolve();
    });
  }));
});

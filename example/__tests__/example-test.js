import path from 'path';
import webpack from 'webpack';
import config from '../webpack.config';

jest.setTimeout(10000); // 10 second timeout

describe('example', () => {
  it('combines loader results into one object', () =>
    new Promise(resolve => {
      webpack(config, (error, stats) => {
        const bundlePath = path.resolve(
          stats.compilation.compiler.outputPath,
          stats.toJson().assetsByChunkName.main,
        );
        expect(require(bundlePath)).toEqual({
          raw: '---\ntitle: Example\n---\n\nSome markdown\n',
          frontmatter: { title: 'Example' },
          content: '<p>Some markdown</p>\n',
        });
        resolve();
      });
    }));
});

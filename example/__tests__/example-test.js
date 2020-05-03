const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config');

jest.setTimeout(10000); // 10 second timeout

describe('example', () => {
  it('combines loader results into one object', () =>
    new Promise((resolve) => {
      webpack(config, (error, stats) => {
        if (error) {
          throw error;
        }
        if (stats.hasErrors()) {
          throw stats.toJson().errors[0];
        }
        const bundlePath = path.resolve(
          stats.compilation.compiler.outputPath,
          stats.toJson().assetsByChunkName.main
        );
        expect(require(bundlePath).content).toEqual('<p>Some markdown</p> ');
        expect(require(bundlePath).frontmatter).toEqual({ title: 'Example' });
        expect(require(bundlePath).raw.default).toMatchInlineSnapshot(`
          "---
          title: Example
          ---

          Some markdown
          "
        `);
        resolve();
      });
    }));
});

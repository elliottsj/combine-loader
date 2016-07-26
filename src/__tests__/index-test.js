jest.unmock('..');

import * as combineLoader from '..';

describe('combine-loader', () => {
  it('returns the correct module content', () => {
    const context = {
      cacheable: jest.fn(),
      query: `?${JSON.stringify({
        raw: 'raw-loader',
        frontmatter: ['json-loader', 'front-matter-loader?onlyAttributes'],
        content: ['html-loader', 'markdown-it-loader', 'front-matter-loader?onlyBody'],
      })}`,
    };
    const result = combineLoader.pitch.call(context, './path/to/example.md');

    expect(context.cacheable).toBeCalled();
    expect(result).toBe(
      'module.exports = {' +
        '"raw": require(' +
          '"-!raw-loader!./path/to/example.md"' +
        '),' +
        '"frontmatter": require(' +
          '"-!json-loader!front-matter-loader?onlyAttributes!./path/to/example.md"' +
        '),' +
        '"content": require(' +
          '"-!html-loader!markdown-it-loader!front-matter-loader?onlyBody!./path/to/example.md"' +
        ')' +
      '}'
    );
  });
});

import loaderUtils from 'loader-utils';

module.exports = function () {};
module.exports.pitch = function (remainingRequest) {
  this.cacheable();
  const loaders = loaderUtils.parseQuery(this.query);

  const keysValues = Object.keys(loaders).map(key => {
    const loader = Array.isArray(loaders[key])
      ? loaders[key].join('!')
      : loaders[key];
    const request = loaderUtils.stringifyRequest(this, `-!${loader}!${remainingRequest}`);
    return `"${key}": require(${request})`;
  });
  return `module.exports = {${keysValues.join(',')}}`;
};

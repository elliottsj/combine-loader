import loaderUtils from 'loader-utils'

module.exports = function () {}
module.exports.pitch = function (remainingRequest) {
  this.cacheable()
  const loaders = loaderUtils.parseQuery(this.query)
  const validRequest = process.platform === 'win32'
    ? remainingRequest.replace(/\\/g, '/')
    : remainingRequest

  const keysValues = Object.keys(loaders).map(key => {
    const loader = Array.isArray(loaders[key])
      ? loaders[key].join('!')
      : loaders[key]
    return `"${key}": require("-!${loader}!${validRequest}")`
  })
  return `module.exports = {${keysValues.join(',')}}`
}

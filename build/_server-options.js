const path = require('path')

module.exports = {
  proxy: {
    '/myPath': {
      target: 'https://myHost',
      pathRewrite: { '^/myPath': '' },
      secure: true,
      changeOrigin: true
    }
  }
}

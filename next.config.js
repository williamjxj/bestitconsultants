const path = require('path')

module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    }
    return config
  },
}

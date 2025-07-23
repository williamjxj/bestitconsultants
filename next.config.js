const path = require('path')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.google.com',
      'shot.screenshotapi.net',
      'images.unsplash.com',
      'api.screenshotmachine.com',
      'htmlcsstoimage.com',
    ],
  },
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    }
    return config
  },
}

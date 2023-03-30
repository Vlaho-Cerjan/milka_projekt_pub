const { withPlaiceholder } = require("@plaiceholder/next");
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})


module.exports = withPWA(withPlaiceholder(
  {
    reactStrictMode: true,
    images: {
      unoptimized: true,
      deviceSizes: [400, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [8, 16, 32, 48, 64, 96, 128, 256, 384],
    },
    experimental: {
      esmExternals: true,
    },
    compiler: {
      styledComponents: true,
    }
  }
));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      '@react-email/components',
      '@react-email/render',
      '@react-email/html'
    ]
  },
  /* transpilePackages: [
    '@react-email/components',
    '@react-email/render',
    '@react-email/html'
  ], */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'devsergey.ru',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'test-for-flower.storage.yandexcloud.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        pathname: '/test-for-flower/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig

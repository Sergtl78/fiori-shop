/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: 'test-for-flower.storage.yandexcloud.net',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig

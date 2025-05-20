/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'alphabetsmarketing.jo',
        port: '',
        pathname: '/**',
      },
{
  protocol: 'https',
  hostname: 'itchronicles.com',
  port: '',
  pathname: '/wp-content/uploads/**',
}

    ],
  },
};

export default nextConfig;
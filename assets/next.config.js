/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/booking:path*',
        destination: `http://rbp-booking:3000/booking:path*`,
      },
      {
        source: '/room/:path*',
        destination: `http://rbp-room:3001/room/:path*`,
      },
      {
        source: '/brand/:path*',
        destination: `http://rbp-branding:3002/brand/:path*`,
      },
      {
        source: '/auth/:path*',
        destination: `http://rbp-auth:3004/auth/:path*`,
      },
      {
        source: '/report/:path*',
        destination: `http://rbp-report:3005/report/:path*`,
      },
      {
        source: '/message/:path*',
        destination: `http://rbp-message:3006/message/:path*`,
      }
    ];
  }
};

module.exports = nextConfig;

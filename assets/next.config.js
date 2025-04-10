/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  async rewrites() {
    const bookingApi = process.env.BOOKING_API || 'http://localhost:3000';
    const roomApi = process.env.ROOM_API || 'http://localhost:3001';
    const brandApi = process.env.BRAND_API || 'http://localhost:3002';
    const authApi = process.env.AUTH_API || 'http://localhost:3004';
    const reportApi = process.env.REPORT_API || 'http://localhost:3005';
    const messageApi = process.env.MESSAGE_API || 'http://localhost:3006';
    
    return [
      {
        source: '/booking/:path*',
        destination: `${bookingApi}/booking/:path*`,
      },
      {
        source: '/room/:path*',
        destination: `${roomApi}/room/:path*`,
      },
      {
        source: '/brand/:path*',
        destination: `${brandApi}/brand/:path*`,
      },
      {
        source: '/auth/:path*',
        destination: `${authApi}/auth/:path*`,
      },
      {
        source: '/report/:path*',
        destination: `${reportApi}/report/:path*`,
      },
      {
        source: '/message/:path*',
        destination: `${messageApi}/message/:path*`,
      }
    ];
  },
}

module.exports = nextConfig

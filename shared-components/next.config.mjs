/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/server/:path*',
            destination: `${process.env.SERVER_URL}/:path*`,
          },
        ]
      },
};

export default nextConfig;

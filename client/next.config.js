/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    // local
    API_URL: "http://localhost:8080",
    CLIENT_URL: "http://localhost:3000"

    // production
    //API_URL: "http://10.109.78.17:8080",
  },
  images: { unoptimized: true },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:8080/api/:path*`
      }
    ];
  }
};

module.exports = nextConfig;
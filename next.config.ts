import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "localhost"
      }, {
        hostname: "invest.zanity.net"
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost", "invest.zanity.net"],
      bodySizeLimit: '20mb'
    },
  }
};

export default nextConfig;

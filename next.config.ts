import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
module.exports = {
  images: {
    domains: ['ibb.co', 'via.placeholder.com', 'res.cloudinary.com'], // add your image hosts here
  },
};
export default nextConfig;

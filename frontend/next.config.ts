import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  // CesiumJS needs these for proper module resolution
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Cesium uses dynamic require, needs this fallback
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
      };
    }
    return config;
  },
  // Allow Cesium CDN assets
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cesium.com" },
      { protocol: "https", hostname: "*.cesium.com" },
    ],
  },
};

export default nextConfig;

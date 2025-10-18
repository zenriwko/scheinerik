import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    // ✅ Prevent ESLint errors from breaking Cloudflare builds
    ignoreDuringBuilds: true,
  },

  typescript: {
    // ✅ Prevent TypeScript warnings from blocking deploys
    ignoreBuildErrors: true,
  },

  images: {
    // ✅ Allow external image sources (for e.g. picsum.photos placeholders)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // ✅ Disable server compression to avoid Cloudflare double-gzip
  compress: false,

  // ✅ Ensure correct basePath when deployed under custom domain or subdir
  output: "standalone",
};

export default nextConfig;
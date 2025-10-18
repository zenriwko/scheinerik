/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Prevent ESLint errors from failing production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Skip TypeScript build errors (optional)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
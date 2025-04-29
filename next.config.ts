/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during build process
  eslint: {
    // Warning: only use this to unblock deployment
    ignoreDuringBuilds: true,
  },
  // Add this too if you have TypeScript errors
  typescript: {
    // Warning: only use this to unblock deployment
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
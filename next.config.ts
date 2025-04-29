// next.config.js

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
  // Adjust serverless function timeout (max 60 seconds in Vercel Pro plans)
  serverRuntimeConfig: {
    // Will only be available on the server side
    PROJECT_ROOT: __dirname,
  },
};

module.exports = nextConfig;
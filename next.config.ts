import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  // Ensure proper generation of required manifest files
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Removed externalDir as it can cause path issues during deployment
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Fixed the outputFileTracingRoot path to avoid duplicated paths
  outputFileTracingRoot: path.resolve(__dirname),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure proper manifest generation
  generateBuildId: async () => {
    return process.env.BUILD_ID || null;
  }
};

export default nextConfig;
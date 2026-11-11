import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NEXT_OUTPUT_STANDALONE === "true" ? { output: "standalone" as const } : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**',
      }
    ],
  },

  // Explicitly include both the playwright layout configuration AND the chromium binary folder
  outputFileTracingIncludes: {
    '/api/**/*': [
      './node_modules/playwright-core/browsers.json',
      './node_modules/@sparticuz/chromium/bin/**/*', // Force bundles the .br executables
    ],
  },

  // Tells Next.js not to modify or treeshake these modules
  serverExternalPackages: ['@sparticuz/chromium', 'playwright-core'],
};

export default nextConfig;
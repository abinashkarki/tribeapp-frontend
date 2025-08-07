/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production-ready settings
  eslint: {
    ignoreDuringBuilds: false, // Enable linting for production builds
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily disable for shadcn component compatibility
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [], // Add external image domains if needed
    dangerouslyAllowSVG: false, // Security: disable SVG optimization
    contentDispositionType: 'attachment', // Security: force download for unknown types
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false, // Security: remove X-Powered-By header
  reactStrictMode: true,
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },
    ]
  },
  // Environment-specific optimizations
  experimental: {
    scrollRestoration: true, // Better UX for navigation
  },
};

let exported = nextConfig;

if (process.env.ANALYZE === 'true') {
  const { default: withBundleAnalyzer } = await import('@next/bundle-analyzer');
  exported = withBundleAnalyzer({ enabled: true })(nextConfig);
}

export default exported;

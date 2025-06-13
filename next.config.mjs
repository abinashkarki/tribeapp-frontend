/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

let exported = nextConfig;

if (process.env.ANALYZE === 'true') {
  const { default: withBundleAnalyzer } = await import('@next/bundle-analyzer');
  exported = withBundleAnalyzer({ enabled: true })(nextConfig);
}

export default exported;

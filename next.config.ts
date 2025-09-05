import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

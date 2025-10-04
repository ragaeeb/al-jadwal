import type { NextConfig } from 'next';

const nextConfig: NextConfig = { images: { remotePatterns: [{ hostname: '*', pathname: '/**', protocol: 'https' }] } };

export default nextConfig;

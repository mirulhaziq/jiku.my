/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Source maps disabled in production — enabling them slightly bloated
  // chunks and regressed Lighthouse Perf. Best-practice warning about
  // missing maps is acceptable trade for a leaner bundle.
  productionBrowserSourceMaps: false,
  // Security headers.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
    ];
  },
};
export default nextConfig;

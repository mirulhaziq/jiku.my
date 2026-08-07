/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit source maps in production so browsers / Sentry can map minified stack
  // traces back to original source. Also silences a Lighthouse best-practice
  // warning about missing source maps for large first-party JS.
  productionBrowserSourceMaps: true,
  // Content-Security-Policy and small security headers.
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

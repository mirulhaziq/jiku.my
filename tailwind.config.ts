import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        card: 'var(--card)',
        border: 'var(--border)',
      },
      borderRadius: {
        card: '16px',
        hero: '24px',
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"',
          '"Segoe UI"', 'Roboto', 'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
export default config;

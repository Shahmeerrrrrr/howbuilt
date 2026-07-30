/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Silkscreen"', 'cursive', 'sans-serif'],
        retro: ['"Press Start 2P"', 'monospace'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', '"Space Mono"', 'monospace'],
        geist: ['"Geist"', '"Geist Mono"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

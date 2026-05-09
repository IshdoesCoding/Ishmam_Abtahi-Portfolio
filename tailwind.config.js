/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: { DEFAULT: '#050a18', surface: '#080d1e', card: '#0d1526' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
      },
      backgroundSize: { 'dot-grid': '28px 28px' },
      animation: {
        'float': 'float 7s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out 1.5s infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-18px)' } },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
    },
  },
  plugins: [],
};

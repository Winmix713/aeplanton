export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--bg)',
        inv: 'var(--inv)',
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
          4: 'var(--ink-4)',
          5: 'var(--ink-5)',
        },
        line: { DEFAULT: 'var(--line)', 2: 'var(--line-2)' },
        fill: { 1: 'var(--fill-1)', 2: 'var(--fill-2)', 3: 'var(--fill-3)' },
        track: 'var(--track)',
        amber: { DEFAULT: 'var(--amber)', soft: 'var(--amber-2)', ink: 'var(--amber-ink)' },
        green: { DEFAULT: 'var(--green)', soft: 'var(--green-2)' },
        blue: { DEFAULT: 'var(--blue)', soft: 'var(--blue-2)' },
        red: 'var(--red)',
      },
      fontFamily: {
        sans: ['Inter', '"SF Pro Text"', '-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
};

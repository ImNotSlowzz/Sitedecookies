/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        honey: {
          DEFAULT: '#F5C518',
          light: '#FFE89C',
          dark: '#E0A800',
        },
        cream: '#FDF6EC',
        'brown-dark': '#2A1B0F',
        'brown-chocolate': '#5B3A1F',
        pistache: '#7FA650',
      },
      fontFamily: {
        display: ['"Clash Display"', 'Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        bounce: 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
};

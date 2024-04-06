/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        roboto: 'Roboto,sans-serif',
      },
      colors: {
        primary: '#FD3D57',
      },
    },
  },
};

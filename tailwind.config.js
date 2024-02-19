/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // DarkMode colors
        'primary-100': '#18c7b5',
        'primary-200': '#4bcebd',
        'primary-300': '#69d4c5',
        'primary-400': '#83dbcd',
        'primary-500': '#9ae1d5',
        'primary-600': '#afe7dd',
        'surface-100': '#121212',
        'surface-200': '#282828',
        'surface-300': '#3f3f3f',
        'surface-400': '#575757',
        'surface-500': '#717171',
        'surface-600': '#8b8b8b',
        'mixed-100': '#192220',
        'mixed-200': '#2e3735',
        'mixed-300': '#454d4b',
        'mixed-400': '#5d6462',
        'mixed-500': '#767c7a',
        'mixed-600': '#8f9493'
      }
    },
  },
  plugins: [],
}


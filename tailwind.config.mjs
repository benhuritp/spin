/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter-sans)', 'sans-serif'],
        'montserrat': ['var(--font-montserrat-sans)', 'sans-serif'],
      },
      colors: {
        brand: 'hsl(var(--color-brand))',
        purple: 'hsl(var(--color-purple))',
        red: 'hsl(var(--color-red))',
        blue: 'hsl(var(--color-blue))',
      },
    },
  },
  plugins: [],
};

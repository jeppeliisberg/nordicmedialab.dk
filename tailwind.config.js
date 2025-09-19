/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        spacing: {
            '8xl': '89rem',
        },
        borderRadius: {
            '4xl': '50px',
        },
        
        boxShadow: {
            '3xl': '0 2px 4px 12px rgba(0, 0, 0, 0.54)',
        },
        fontFamily: {
        serif: ["'Playfair Display'", 'serif'],
        sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
    }
  },
  plugins: [],
}
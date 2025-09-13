/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff2eb',
          100: '#ffe6d9',
          200: '#ffd1b3',
          300: '#ffb88a',
          400: '#ff9a58',
          500: '#FF722B', // main requested orange
          600: '#e65f24',
          700: '#b7481b',
          800: '#8f3513',
          900: '#5f240d',
        },
        indian: {
          red: '#FF722B',
          maroon: '#b7481b',
          ochre: '#d97706',
          gold: '#f59e0b',
          saffron: '#ea580c',
          deepRed: '#8f3513',
        },
        accent: {
          gold: '#f59e0b',
          ochre: '#d97706',
          maroon: '#b7481b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'texture': "url('/images/texture.png')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}




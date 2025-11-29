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
        'jamaica-green': '#00A859',
        'jamaica-yellow': '#FCD116',
        'jamaica-black': '#000000',
        'accent-red': '#EF4444',
        'accent-dark-red': '#DC2626',
        'accent-blue': '#3B82F6',
        'accent-purple': '#8B5CF6',
        'accent-pink': '#EC4899',
        'accent-orange': '#F97316',
      },
    },
  },
  plugins: [],
}


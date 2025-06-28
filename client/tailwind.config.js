/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        nav: 'var(--nav)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        secondary: 'var(--secondary)',
        border: 'var(--border)',
        muted: 'var(--muted)',
        surface: 'var(--surface)',
      }
    }
  },
  darkMode: 'class',
  plugins: [],
}


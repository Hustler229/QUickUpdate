/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Tailles de police pour desktop
        'base-desktop': '1rem', // 16px
        'h1-desktop': '2.5rem', // 40px
        'h2-desktop': '2rem', // 32px
        'h3-desktop': '1.75rem', // 28px
        'h4-desktop': '1.5rem', // 24px
        'h5-desktop': '1.25rem', // 20px
        'h6-desktop': '1rem', // 16px
        'subtitle-desktop': '1rem', // 16px

        // Tailles de police pour mobile
        'base-mobile': '0.875rem', // 14px
        'h1-mobile': '2rem', // 32px
        'h2-mobile': '1.75rem', // 28px
        'h3-mobile': '1.5rem', // 24px
        'h4-mobile': '1.25rem', // 20px
        'h5-mobile': '1.125rem', // 18px
        'h6-mobile': '1rem', // 16px
        'subtitle-mobile': '0.875rem', // 14px
      },
      lineHeight: {
        // Espacement des lignes pour desktop
        'normal-desktop': '1.5',
        
        // Espacement des lignes pour mobile
        'normal-mobile': '1.4',
      },
      colors: {
        'primary' : '#1D56C2',
        'secondary' : '#60B478',
        'tertiary' : '#9A7CF8',
        'default' : '#191A21',
        'danger' : '#F85046',
        'white' : '#FFFFF1'
      }
    },
  },
  plugins: [],
}
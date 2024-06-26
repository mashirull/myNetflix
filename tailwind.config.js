/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
  
        'lg': {'max': '1023px'},

        '940' : {'max' : '940px'},

        '732' : {'max' : '732px'},
  
        'md2': {'max': '800px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '600px'},
        // => @media (max-width: 639px) { ... }
        '1200px' : {'max' : '1200px'},

        '460' : {'max' : '460px'},

        '555' : {'max' : '530px'},

        '396' : {'max' : '396px'}
      }
  },
  plugins: [],
}


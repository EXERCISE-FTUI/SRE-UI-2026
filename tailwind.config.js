/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",   
  ],
  theme: {
    extend: {
      backgroundImage: {
        button_admin:
          "linear-gradient(135deg, rgba(254,242,0,1) 0%, rgba(16,93,72,1) 70%)",
      },
    },
  },
  plugins: [],
};
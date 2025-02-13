/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#9333EA", // Custom secondary color
        danger: "#DC2626", // Custom danger color
        primary: "#3B82F6", // Replace with your current blue color
        primaryDark: "#1E40AF", // Darker shade for hover
        danger: "#EF4444", // Custom red color (same as red-500)
        dangerDark: "#B91C1C",
      },
    },
  },
  plugins: [],
};

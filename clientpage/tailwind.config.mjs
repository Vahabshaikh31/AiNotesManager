/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class", // Enables dark mode using 'class'
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: "var(--light-bg)",
        darkBg: "var(--dark-bg)",
        lightText: "var(--light-text)",
        darkText: "var(--dark-text)",
        lightCard: "var(--light-card)",
        darkCard: "var(--dark-card)",
        lightPrimary: "var(--light-primary)",
        darkPrimary: "var(--dark-primary)",
        lightSecondary: "var(--light-secondary)",
        darkSecondary: "var(--dark-secondary)",
        lightBorder: "var(--light-border)",
        darkBorder: "var(--dark-border)",
        lightInputBg: "var(--light-input-bg)",
        darkInputBg: "var(--dark-input-bg)",
        lightInputBorder: "var(--light-input-border)",
        darkInputBorder: "var(--dark-input-border)",
        lightInputFocus: "var(--light-input-focus)",
        darkInputFocus: "var(--dark-input-focus)",
        lightShadow: "var(--light-shadow)",
        darkShadow: "var(--dark-shadow)",
      },
    },
  },
  plugins: [],
};

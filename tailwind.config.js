module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        global: {
          background1: "var(--global-bg-1)",
          background2: "var(--global-bg-2)",
          background3: "var(--global-bg-3)",
          background4: "var(--global-bg-4)",
          background5: "var(--global-bg-5)",
          background6: "var(--global-bg-6)",
          background7: "var(--global-bg-7)",
          background8: "var(--global-bg-8)",
          background9: "var(--global-bg-9)",
          background10: "var(--global-bg-10)",
          background11: "var(--global-bg-11)",
          background12: "var(--global-bg-12)",
          text1: "var(--global-text-1)",
          text2: "var(--global-text-2)"
        },
        button: {
          background1: "var(--button-bg-1)",
          background2: "var(--button-bg-2)",
          text1: "var(--button-text-1)",
          text2: "var(--button-text-2)"
        },
        searchview: {
          background1: "var(--searchview-bg-1)"
        },
        slider: {
          background1: "var(--slider-bg-1)",
          text1: "var(--slider-text-1)"
        }
      },
      fontFamily: {
        'neue-montreal': ['Neue Montreal', 'sans-serif'],
        'sofia-pro': ['Sofia Pro', 'sans-serif'],
        'impact': ['Impact', 'Arial Black', 'sans-serif']
      }
    }
  },
  plugins: []
};
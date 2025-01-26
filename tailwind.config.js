/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fly: "fly 0.8s ease-in-out",
        "cart-animation": "cartAnimation 2s ease-in-out",
      },
      screens: {
        sm: "640px",
        small: "340px",
        semismall: "500px",
        extramedium: "780px",
        medium: "580px",
        semimedium: "800px",
        large: "900px",
      },

      keyframes: {
        fly: {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "100%": {
            transform:
              "translate(var(--tw-translate-x), var(--tw-translate-y))",
            opacity: "0",
          },
        },
        cartAnimation: {
          "0%": {
            transform: "translateX(0) scale(1)",
            color: "#450920",
          },
          "50%": {
            transform: "translateX(10px) scale(1.2)",
            color: "red",
          },
          "100%": {
            transform: "translateX(0) scale(1)",
            color: "#450920",
          },
        },

        fallDown: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

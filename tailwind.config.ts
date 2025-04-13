import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "data-aos-delay",
    "data-aos-duration",
    "data-aos-easing",
    "data-aos",
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      animation: {
        "footer-pulse": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "footer-pulse-reversed":
          "pulseReversed 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        breadcrumbPatternBg: "url('/images/breadcrumb/patternBg.webp')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        themeBg: "#0B0F1A", // Darker blue-black background
        bannerBg: "#111A2E", // Rich dark blue
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // Main primary color
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        secondary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8", // Accent color
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        accent: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef", // Vibrant purple accent
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
        },
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "0.4", transform: "translateX(0)" },
          "80%": { opacity: "1", transform: "translate(20px)" },
        },
        pulseReversed: {
          "0%, 100%": { opacity: "0.4", transform: "translateX(0)" },
          "80%": { opacity: "1", transform: "translate(-20px)" },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
    },
  },
  plugins: [],
};
export default config;

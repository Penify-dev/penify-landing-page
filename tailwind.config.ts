import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

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
        "footer-pulse-reversed": "pulseReversed 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: {
        breadcrumbPatternBg: "url('/images/breadcrumb/patternBg.webp')",
        "primary-gradient": "linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)",
        "secondary-gradient": "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        "accent-gradient": "linear-gradient(135deg, #f97316 0%, #f43f5e 100%)",
        "dark-gradient": "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(24, 24, 27, 0) 0%, rgba(24, 24, 27, 0.9) 100%)",
        "mesh-1": "radial-gradient(at 40% 20%, rgba(74, 222, 128, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(236, 72, 153, 0.1) 0px, transparent 50%)",
        "mesh-2": "radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.1) 0px, transparent 50%), radial-gradient(at 0% 0%, rgba(74, 222, 128, 0.1) 0px, transparent 50%)"
      },
      boxShadow: {
        highlight: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
        card: "0 0 0 1px rgba(255, 255, 255, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        glow: "0 0 15px 2px rgba(74, 222, 128, 0.3)",
        "glow-purple": "0 0 15px 2px rgba(139, 92, 246, 0.3)",
      },
      colors: {
        themeBg: "#0f172a", // Darker background for more contrast
        bannerBg: "#1e293b",
        accent: {
          50: "#eef9ff",
          100: "#dcf2ff",
          200: "#b3e9ff",
          300: "#75dcff",
          400: "#30cdff",
          500: "#0ebeff",
          600: "#0098db",
          700: "#0079b0",
          800: "#006691",
          900: "#005477",
          950: "#003549",
        },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        heading: ["Cal Sans", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(74, 222, 128, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(74, 222, 128, 0.6)" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#94a3b8',
            a: {
              color: '#4ade80',
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: '#4ade8040',
              textUnderlineOffset: '2px',
              textDecorationThickness: '2px',
              '&:hover': {
                color: '#22c55e',
                textDecorationColor: '#22c55e80',
              },
            },
            h1: {
              color: '#f8fafc',
              fontWeight: '700',
              fontSize: '2.25rem',
            },
            h2: {
              color: '#f1f5f9',
              fontWeight: '600',
              fontSize: '1.875rem',
            },
            h3: {
              color: '#e2e8f0',
              fontWeight: '600',
              fontSize: '1.5rem',
            },
            h4: {
              color: '#e2e8f0',
              fontWeight: '600',
              fontSize: '1.25rem',
            },
            code: {
              color: '#e2e8f0',
              fontWeight: '400',
              fontSize: '0.875rem',
              backgroundColor: '#1e293b',
              borderRadius: '0.25rem',
              padding: '0.25rem 0.5rem',
            },
            pre: {
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
            },
          },
        },
      },
    },
  },
  plugins: [
    plugin(function({ addBase }) {
      addBase({
        '@font-face': {
          fontFamily: 'Cal Sans',
          fontWeight: '400 700',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          src: 'url("https://cdn.jsdelivr.net/npm/cal-sans@1.0.1/cal-sans.woff2") format("woff2")',
        },
      });
    }),
    require('@tailwindcss/typography'),
  ],
};

export default config;

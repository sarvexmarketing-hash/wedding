import type { Config } from "tailwindcss";
// @ts-expect-error - internal tailwind helper without types
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FCFBF9",
          100: "#F9F6F0",
          200: "#F4EFE6",
          300: "#EAE2D5",
          400: "#DCD0BE",
          500: "#CFC3B0",
          DEFAULT: "#FAF7F2",
        },
        burgundy: {
          50: "#FDF2F4",
          100: "#FBE4E8",
          200: "#F7CCD5",
          300: "#F0A3B3",
          400: "#E36D88",
          500: "#CE3B61",
          600: "#A82445",
          700: "#8B1B36",
          800: "#74182E",
          900: "#581223",
          950: "#380714",
          DEFAULT: "#74182E",
        },
        gold: {
          50: "#FCFAF4",
          100: "#F7F3E3",
          200: "#EDE2C0",
          300: "#E1CD98",
          400: "#D3B56E",
          500: "#C5A059",
          600: "#B08A43",
          700: "#8D6B33",
          800: "#73562C",
          900: "#5F4727",
          DEFAULT: "#C5A059",
        },
        plum: {
          50: "#FAF7FA",
          100: "#F4EFF4",
          200: "#E9DFE9",
          300: "#D6C4D6",
          400: "#B89EB8",
          500: "#987599",
          600: "#7D597E",
          700: "#654566",
          800: "#4D334E",
          900: "#2D1B28",
          950: "#1A1017",
          DEFAULT: "#2D1B28",
        },
        sand: {
          50: "#FDFCFB",
          100: "#FAF7F2",
          200: "#F3ECE1",
          300: "#E8DDCF",
          400: "#D5C3AE",
          500: "#BC9F84",
          600: "#A38267",
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "Cinzel", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px 0 rgba(45, 27, 40, 0.04), 0 1px 2px -1px rgba(45, 27, 40, 0.04)',
        'soft': '0 4px 20px -2px rgba(45, 27, 40, 0.05), 0 2px 6px -1px rgba(45, 27, 40, 0.02)',
        'soft-lg': '0 12px 32px -4px rgba(45, 27, 40, 0.08), 0 4px 12px -2px rgba(45, 27, 40, 0.03)',
        'soft-xl': '0 24px 48px -8px rgba(45, 27, 40, 0.12), 0 8px 16px -4px rgba(45, 27, 40, 0.04)',
        'gold-glow': '0 0 24px -4px rgba(197, 160, 89, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  const extract = (flattenColorPalette as any)?.default || flattenColorPalette;
  const allColors = extract(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;

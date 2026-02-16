import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(20.0deg)' },
          '20%': { transform: 'rotate(-16.0deg)' },
          '30%': { transform: 'rotate(20.0deg)' },
          '40%': { transform: 'rotate(-8.0deg)' },
          '50%': { transform: 'rotate(20.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        wave: 'wave 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
      },
      colors: {
        accent: {
          DEFAULT: '#e94560',
          50: '#fef2f3',
          100: '#fde6e9',
          200: '#fbd0d7',
          300: '#f7a8b5',
          400: '#f1758d',
          500: '#e94560',
          600: '#d42a50',
          700: '#b21e42',
          800: '#951c3d',
          900: '#7f1b3a',
        },
      },
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#e94560",
          secondary: "#0f3460",
          accent: "#d4a373",
          neutral: "#1a1a2e",
          "base-100": "#fefae0",
          "base-200": "#faedcd",
          "base-300": "#e9dcc0",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#f43f5e",
          secondary: "#3b82f6",
          accent: "#d4a373",
          neutral: "#0a0a0f",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
        },
      },
    ],
  },
};

export default config;

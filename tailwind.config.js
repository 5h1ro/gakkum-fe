import theme from "tailwindcss/defaultTheme";

const themeConstants = {
  background: "#FAFAFA",
  primary: {
    50: "#3c7d21",
    100: "#3c7d21",
    200: "#3c7d21",
    300: "#3c7d21",
    400: "#3c7d21",
    500: "#3c7d21",
    600: "#3c7d21",
    700: "#3c7d21",
    800: "#3c7d21",
    900: "#3c7d21",
  },
  secondary: {
    50: "#FFF9EB",
    100: "#FFEFC6",
    200: "#FFDD88",
    300: "#FFC64A",
    400: "#FFA912",
    500: "#F98B07",
    600: "#DD6502",
    700: "#B74406",
    800: "#94340C",
    900: "#7A2B0D",
  },
  success: {
    50: "#F3FEF8",
    100: "#E7FDF1",
    200: "#C5FBE3",
    300: "#A3F9D5",
    400: "#5FF5B1",
    500: "#50C793",
    600: "#3F9A7A",
    700: "#2E6D61",
    800: "#1F4B47",
    900: "#0F2A2E",
  },
  info: {
    50: "#F3FEFF",
    100: "#E7FEFF",
    200: "#C5FDFF",
    300: "#A3FCFF",
    400: "#5FF9FF",
    500: "#0CE7FA",
    600: "#00B8D4",
    700: "#007A8D",
    800: "#005E67",
    900: "#003F42",
  },
  warning: {
    50: "#FFFAF8",
    100: "#FFF4F1",
    200: "#FEE4DA",
    300: "#FDD2C3",
    400: "#FCB298",
    500: "#FA916B",
    600: "#DF8260",
    700: "#965741",
    800: "#714231",
    900: "#4A2E21",
  },
  danger: {
    50: "#FFF7F7",
    100: "#FEEFEF",
    200: "#FCD6D7",
    300: "#FABBBD",
    400: "#F68B8D",
    500: "#F1595C",
    600: "#D75052",
    700: "#913638",
    800: "#6D292A",
    900: "#461A1B",
  },
  general: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },
  base: {
    dark: "#0F172A",
    white: "#FFFFFF",
  },
  fg: { main: "#FFFFFF", dark: "#0F172A" },
  breakpoints: {
    xs: "0px",
    mb: "350px",
    sm: "600px",
    md: "960px",
    lg: "1280px",
    xl: "1920px",
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        background: themeConstants.background,
        primary: themeConstants.primary,
        secondary: themeConstants.secondary,
        base: themeConstants.base,
        fg: themeConstants.fg.main,
        "fg-dark": themeConstants.fg.dark,
      },
      screens: {
        ...theme.screens,
        ...themeConstants.breakpoints,
        ha: { raw: "(hover: hover)" },
      },
    },
    colors: {
      success: themeConstants.success,
      danger: themeConstants.danger,
      info: themeConstants.info,
      warning: themeConstants.warning,
      general: themeConstants.general,
    },
  },
  plugins: [],
};

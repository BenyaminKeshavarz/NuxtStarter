/** @type {import('tailwindcss').Config} */

// * Helper function to create colors with optional opacity for Tailwind CSS
const withOpacity = (variableName) => {
  /**
   * ! Function to generate colors with optional opacity, leveraging CSS variables.
   * Supports Tailwind’s `/opacity` utility (e.g., `bg-brand-primary/50`) to apply opacity dynamically.
   *
   * @param {string} variableName - CSS variable name for the color (e.g., '--brand-primary').
   * @returns {function} - Returns a color in `rgb()` or `rgba()` format depending on the provided opacity.
   *
   * Usage Example:
   * - Returns RGB format without opacity (e.g., `bg-brand-primary`).
   * - Returns RGBA format if opacity is specified (e.g., `bg-brand-primary/50`).
   */
  return ({ opacityValue }) => {
    return opacityValue !== undefined
      ? `rgba(var(${variableName}), ${opacityValue})`
      : `rgb(var(${variableName}))`;
  };
};

export default {
  // * Enable dark mode toggle via a class (for custom dark mode styling support)
  darkMode: "class",

  // * Files Tailwind will scan for class usage
  content: [
    "./components/**/*.{js,vue,ts}", // Scan all JS, Vue, and TS files in components directory
    "./composables/**/*.{js,ts}", // Scan all JS, and TS files in composables directory
    "./layouts/**/*.vue", // Scan all Vue layout files
    "./pages/**/*.vue", // Scan all Vue pages
    "./plugins/**/*.{js,ts}", // Scan plugin files (JS & TS)
    "./app.vue", // Main app file
    "./error.vue", // Error page
    "./nuxt.config.{js,ts}", // Nuxt configuration files
  ],

  theme: {
    // ! Disables unused core plugins for optimized build size
    corePlugins: {
      aspectRatio: false,
    },

    // * Configures container for centered, responsive layouts
    container: {
      center: true, // Centers container on the page
      screens: {
        lg: "1100px", // Set width for large screens
        xl: "1280px", // Set width for extra-large screens
        "2xl": "1440px", // Set width for 2x-large screens
        // TODO: Add additional sizes as needed...
      },
    },

    // * Custom breakpoints to target additional device sizes
    screens: {
      "2xs": "375px", // Very small devices (small phones)
      xs: "480px", // Extra small devices (phones)
      sm: "640px", // Small devices (standard phones)
      md: "768px", // Medium devices (tablets)
      lg: "1024px", // Large devices (small laptops/desktops)
      xl: "1280px", // Extra-large devices (large laptops/desktops)
      "2xl": "1440px", // 2x-large devices (large desktops)
      "3xl": "1920px", // 3x-large devices (Full HD screens)
    },

    extend: {
      // * Custom font weights for typography styling
      fontWeight: {
        extrablack: 950, // Very heavy font weight for emphasized text
      },

      // * Color palette using CSS variables, accessible with optional opacity
      colors: {
        /* -----------------------------
           Palette colors 
           -----------------------------*/

        brand: {
          // Primary brand color (supports opacity levels via Tailwind utilities)
          primary: withOpacity("--brand-primary"),

          // Secondary brand color shades
          secondary: {
            DEFAULT: withOpacity("--brand-secondary"),
            100: withOpacity("--brand-secondary-100"),
            200: withOpacity("--brand-secondary-200"),
            300: withOpacity("--brand-secondary-300"),
            400: withOpacity("--brand-secondary-400"),
            500: withOpacity("--brand-secondary-500"),
            // TODO: Add additional shades as needed...
          },

          // Accent color for UI highlights (supports opacity)
          accent: withOpacity("--brand-accent"),

          // Neutral palette with multiple shades for background and text colors
          neutral: {
            100: withOpacity("--brand-neutral-100"),
            200: withOpacity("--brand-neutral-200"),
            300: withOpacity("--brand-neutral-300"),
            400: withOpacity("--brand-neutral-400"),
            500: withOpacity("--brand-neutral-500"),
            // TODO: Add more shades if required for specific designs...
          },
        },

        /* -----------------------------
           Default colors 
           -----------------------------*/

        default: {
          // Typography colors
          text: withOpacity("--default-text-color"), // For normal text color
          heading: withOpacity("--default-heading-color"), // For headings
        },

        /* -----------------------------
           Constant colors 
           -----------------------------*/

        const: {
          pink: {
            100: "#FCE7F1",
          },
        },
      },

      // * Custom box shadow presets for UI depth
      boxShadow: {
        surround: "0px 0px 60px 0px rgba(0, 0, 0, 0.10)", // Subtle surrounding shadow for depth
      },

      // * Custom animations for UI interactions
      // TODO: Add additional animations as needed...
      animation: {
        "move-up-down": "moveUpDown 1.2s infinite ease-in-out", // Smooth vertical bounce effect
      },
      keyframes: {
        moveUpDown: {
          "0%, 100%": { transform: "translateY(4px)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
    },
  },

  // * Tailwind plugins for extended functionality
  plugins: [
    require("@tailwindcss/aspect-ratio"), // Provides utilities for controlling the aspect ratio of elements
    require("@tailwindcss/typography"), // Enhanced typography for better text readability
    // Pre-styled form elements for consistent UI
    require("@tailwindcss/forms")({
      strategy: "class", // Only apply form styles when using .form-* classes
    }),
    require("tailwindcss-rtl"), // Adds support for right-to-left text direction
    // TODO: Add additional plugins as needed...
  ],
};

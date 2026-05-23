import tailwindcssAnimate from "tailwindcss-animate";

const tailwindConfig = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Smilo brand colors
        smilo: {
          cream: "hsl(var(--smilo-cream))",
          "cream-light": "hsl(var(--smilo-cream-light))",
          paper: "hsl(var(--smilo-paper))",
          sepia: "hsl(var(--smilo-sepia))",
          olive: "hsl(var(--smilo-olive))",
          "olive-light": "hsl(var(--smilo-olive-light))",
          "olive-dark": "hsl(var(--smilo-olive-dark))",
          brown: "hsl(var(--smilo-brown))",
          "brown-light": "hsl(var(--smilo-brown-light))",
          ink: "hsl(var(--smilo-ink))",
          charcoal: "hsl(var(--smilo-charcoal))",
          gold: "hsl(var(--smilo-gold))",
          "gold-soft": "hsl(var(--smilo-gold-soft))",
          flash: "hsl(var(--smilo-flash))",
          "flash-dark": "hsl(var(--smilo-flash-dark))",
          digital: "hsl(var(--smilo-digital))",
          "digital-light": "hsl(var(--smilo-digital-light))",
          // Product colors
          "product-black": "hsl(var(--smilo-product-black))",
          "product-green": "hsl(var(--smilo-product-green))",
          "product-brown": "hsl(var(--smilo-product-brown))",
          "product-blue": "hsl(var(--smilo-product-blue))",
          "product-yellow": "hsl(var(--smilo-product-yellow))",
        },
      },
      fontFamily: {
        heading: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-lora)', 'Georgia', 'serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        hover: "var(--shadow-hover)",
        retro: "var(--shadow-retro)",
        flash: "var(--shadow-flash)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default tailwindConfig;

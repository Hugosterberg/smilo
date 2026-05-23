import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-heading uppercase tracking-[0.12em] border border-transparent",
  {
    variants: {
      variant: {
        default: "bg-smilo-charcoal text-smilo-cream-light hover:bg-smilo-ink shadow-retro hover:shadow-card border-smilo-ink/50 active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-smilo-charcoal bg-transparent text-smilo-ink hover:bg-smilo-charcoal hover:text-smilo-paper shadow-retro",
        secondary: "bg-smilo-cream text-smilo-ink hover:bg-smilo-sepia border-smilo-brown/15",
        ghost: "hover:bg-smilo-digital-light hover:text-smilo-digital",
        link: "text-smilo-digital underline-offset-4 hover:underline normal-case tracking-normal font-body",
        hero: "bg-smilo-flash text-smilo-ink hover:bg-smilo-flash-dark shadow-flash hover:shadow-hover border-smilo-flash-dark/50 active:scale-[0.98] text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3.5 sm:py-4 tracking-[0.14em] sm:tracking-[0.18em] whitespace-normal sm:whitespace-nowrap text-center",
        gold: "bg-smilo-flash text-smilo-ink hover:bg-smilo-flash-dark shadow-flash border-smilo-flash-dark/40",
        cream: "bg-smilo-paper text-smilo-ink hover:bg-smilo-cream border-smilo-brown/20",
        camera: "bg-smilo-olive text-smilo-cream-light hover:bg-smilo-olive-dark shadow-retro border-smilo-olive-dark/40 active:scale-[0.98]",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-md px-4 text-sm",
        lg: "h-14 rounded-md px-8 text-lg",
        xl: "h-16 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

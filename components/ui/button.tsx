import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary/90 backdrop-blur-sm text-primary-foreground hover:bg-primary/80 relative neon-button",
        destructive:
          "bg-destructive/90 backdrop-blur-sm text-destructive-foreground hover:bg-destructive/80 relative neon-button-red",
        outline:
          "border border-input/80 bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground relative neon-button-subtle",
        secondary:
          "bg-secondary/80 backdrop-blur-sm text-secondary-foreground hover:bg-secondary/70 relative neon-button-subtle",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        learner: "border border-gray-700 text-gray-200 hover:text-white hover:border-gray-500 bg-black/80",
        instructor: "bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 text-white hover:opacity-90",
        admin: "bg-gradient-to-r from-indigo-600 via-purple-700 to-cyan-600 text-white hover:opacity-90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return (
    <div className="relative group">
      {/* Neon border elements - positioned absolutely with specific dimensions */}
      <div className="neon-top absolute top-[-2px] left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[1]"></div>
      <div className="neon-right absolute right-[-2px] top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[1]"></div>
      <div className="neon-bottom absolute bottom-[-2px] left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[1]"></div>
      <div className="neon-left absolute left-[-2px] top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[1]"></div>

      {/* Actual button with opaque background shield */}
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative z-[2] active:scale-95 transition-transform",
          variant === "default" &&
            "border border-gray-700 text-gray-200 hover:text-white hover:border-gray-500 bg-black/80",
          variant === "outline" &&
            size === "icon" &&
            "bg-gray-500/15 backdrop-blur-[85%] border-gray-400/20 hover:bg-gray-500/25",
        )}
        ref={ref}
        {...props}
      >
        {props.children}
      </button>
    </div>
  )
})
Button.displayName = "Button"

// Add enhanced edge lighting styles
const enhancedButtonStyles = `
  .neon-top {
    background: linear-gradient(
      90deg,
      rgba(6, 182, 212, 0) 0%,
      rgba(6, 182, 212, 0.8) 20%,
      rgba(124, 58, 237, 0.8) 50%,
      rgba(6, 182, 212, 0.8) 80%,
      rgba(6, 182, 212, 0) 100%
    );
    box-shadow: 0 0 8px 0 rgba(6, 182, 212, 0.7);
    border-radius: 4px 4px 0 0;
  }

  .neon-right {
    background: linear-gradient(
      180deg,
      rgba(124, 58, 237, 0) 0%,
      rgba(124, 58, 237, 0.8) 20%,
      rgba(6, 182, 212, 0.8) 50%,
      rgba(124, 58, 237, 0.8) 80%,
      rgba(124, 58, 237, 0) 100%
    );
    box-shadow: 0 0 8px 0 rgba(124, 58, 237, 0.7);
    border-radius: 0 4px 4px 0;
  }

  .neon-bottom {
    background: linear-gradient(
      90deg,
      rgba(6, 182, 212, 0) 0%,
      rgba(6, 182, 212, 0.8) 20%,
      rgba(124, 58, 237, 0.8) 50%,
      rgba(6, 182, 212, 0.8) 80%,
      rgba(6, 182, 212, 0) 100%
    );
    box-shadow: 0 0 8px 0 rgba(6, 182, 212, 0.7);
    border-radius: 0 0 4px 4px;
  }

  .neon-left {
    background: linear-gradient(
      180deg,
      rgba(124, 58, 237, 0) 0%,
      rgba(124, 58, 237, 0.8) 20%,
      rgba(6, 182, 212, 0.8) 50%,
      rgba(124, 58, 237, 0.8) 80%,
      rgba(124, 58, 237, 0) 100%
    );
    box-shadow: 0 0 8px 0 rgba(124, 58, 237, 0.7);
    border-radius: 4px 0 0 4px;
  }

  /* Ensure button variants have opaque backgrounds */
  .bg-primary\\/90 {
    background-color: rgba(0, 210, 255, 0.9) !important;
  }
  
  .bg-destructive\\/90 {
    background-color: rgba(239, 68, 68, 0.9) !important;
  }
  
  .bg-secondary\\/80 {
    background-color: rgba(38, 38, 38, 0.95) !important;
  }
  
  .bg-background\\/50 {
    background-color: rgba(0, 0, 0, 0.95) !important;
  }
  
  /* Gradient background for default button */
  .bg-gradient-to-r.from-purple-600\\/90.via-indigo-700\\/90.to-cyan-500\\/90 {
    background: linear-gradient(to right, rgba(124, 58, 237, 0.9), rgba(67, 56, 202, 0.9), rgba(6, 182, 212, 0.9)) !important;
  }
`

// Apply the styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style")
  styleElement.textContent = enhancedButtonStyles
  document.head.appendChild(styleElement)
}

export { Button, buttonVariants }

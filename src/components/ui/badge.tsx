
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-red-800 text-white hover:bg-red-800",  // Direct color class
        outline: "text-foreground",
        success: "border-transparent bg-green-700 text-white hover:bg-green-800",  // Darker green
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

// Enhanced memoization with proper equality check
const Badge = React.memo(
  function Badge({ className, variant, ...props }: BadgeProps) {
    return (
      <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
  },
  (prevProps, nextProps) => {
    // Only re-render if these props change
    if (prevProps.variant !== nextProps.variant) return false;
    if (prevProps.className !== nextProps.className) return false;
    if (prevProps.children !== nextProps.children) return false;

    // Check for other important props that might influence rendering
    const prevKeys = Object.keys(prevProps);
    const nextKeys = Object.keys(nextProps);

    if (prevKeys.length !== nextKeys.length) return false;

    // Check for changes in any props
    for (const key of prevKeys) {
      if (key !== 'variant' && key !== 'className' && key !== 'children') {
        if (prevProps[key as keyof BadgeProps] !== nextProps[key as keyof BadgeProps]) {
          return false;
        }
      }
    }

    return true;
  }
)

export { Badge, badgeVariants }

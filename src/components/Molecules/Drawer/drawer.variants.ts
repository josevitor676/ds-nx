import { cva } from "class-variance-authority"

export const drawerVariants = cva(
  [
    "ds-fixed ds-top-0 ds-z-50 ds-flex ds-flex-col",
    "ds-bg-surface-base ds-shadow-lg",
    "ds-h-screen ds-w-[304px]",
  ],
  {
    variants: {
      side: {
        right: ["ds-right-0"],
        left: ["ds-left-0"],
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

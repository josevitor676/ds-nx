import { cva } from "class-variance-authority"

export const barChartVariants = cva(["ds-w-full"], {
  variants: {
    size: {
      sm: "ds-h-40",
      md: "ds-h-64",
      lg: "ds-h-80",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

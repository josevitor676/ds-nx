import { cva } from "class-variance-authority"

export const progressBarWrapperVariants = cva("ds-w-full ds-flex ds-flex-col ds-gap-1")

export const progressBarRowVariants = cva("ds-flex ds-items-center ds-gap-3")

export const progressBarLabelVariants = cva(
  "ds-text-sm ds-font-medium ds-text-neutral-600 ds-w-[48px] ds-text-right"
)

export const progressBarRailVariants = cva(
  "ds-flex-1 ds-h-1 ds-rounded-full ds-bg-neutral-100 ds-overflow-hidden"
)

export const progressBarTrackVariants = cva(
  "ds-h-full ds-rounded-full ds-transition-all ds-duration-300",
  {
    variants: {
      color: {
        primary: "ds-bg-primary-500",
        success: "ds-bg-success-500",
        error: "ds-bg-error-500",
        warning: "ds-bg-warning-500",
      },
    },
    defaultVariants: { color: "primary" },
  }
)

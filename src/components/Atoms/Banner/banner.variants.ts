import { cva } from "class-variance-authority"

export const bannerVariants = cva(
  ["ds-flex ds-items-center ds-gap-4 ds-p-4", "ds-rounded-md ds-border ds-border-solid ds-w-full"],
  {
    variants: {
      type: {
        neutral: "ds-bg-neutral-25 ds-border-neutral-200",
        warning: "ds-bg-warning-50 ds-border-warning-200",
        success: "ds-bg-success-50 ds-border-success-200",
        error: "ds-bg-error-50 ds-border-error-200",
        info: "ds-bg-primary-25 ds-border-primary-200",
      },
    },
    defaultVariants: {
      type: "neutral",
    },
  }
)

export const bannerIconBadgeVariants = cva(
  ["ds-flex ds-items-center ds-p-1 ds-rounded-full ds-shrink-0"],
  {
    variants: {
      type: {
        neutral: "ds-bg-neutral-100 ds-text-neutral-700",
        warning: "ds-bg-warning-200 ds-text-warning-700",
        success: "ds-bg-success-300 ds-text-success-700",
        error: "ds-bg-error-200 ds-text-error-600",
        info: "ds-bg-primary-100 ds-text-primary-500",
      },
    },
    defaultVariants: {
      type: "neutral",
    },
  }
)

export const bannerTextVariants = cva(
  ["ds-flex-1 ds-min-w-0 ds-text-sm ds-font-medium ds-leading-5"],
  {
    variants: {
      type: {
        neutral: "ds-text-neutral-700",
        warning: "ds-text-warning-700",
        success: "ds-text-success-700",
        error: "ds-text-error-600",
        info: "ds-text-primary-500",
      },
    },
    defaultVariants: {
      type: "neutral",
    },
  }
)

export const bannerActionButtonVariants = cva([
  "ds-inline-flex ds-items-center ds-justify-center",
  "ds-h-8 ds-max-h-8 ds-min-h-8 ds-px-3 ds-py-1.5",
  "ds-rounded-sm ds-border ds-border-solid",
  "ds-border-neutral-700 ds-text-neutral-700",
  "ds-whitespace-nowrap ds-w-16",
  "ds-text-sm ds-font-medium",
])

export const bannerContentVariants = cva(["ds-flex ds-flex-1 ds-gap-4 ds-items-center ds-min-w-0"])

export const bannerActionsVariants = cva(["ds-flex ds-gap-2 ds-items-center ds-shrink-0"])

export const bannerCloseButtonVariants = cva([
  "ds-inline-flex ds-items-center ds-justify-center",
  "ds-w-8 ds-h-8 ds-rounded-sm",
  "ds-text-neutral-700 ds-bg-transparent ds-border-none ds-shrink-0",
  "ds-focus-visible:ds-ring-2 ds-focus-visible:ds-ring-primary-500",
])

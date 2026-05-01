import { cva } from "class-variance-authority"

export const multiSelectTriggerVariants = cva(
  [
    "ds-flex ds-items-start ds-flex-wrap ds-gap-2",
    "ds-w-full ds-min-h-10 ds-px-4 ds-py-2",
    "ds-bg-surface-base ds-border ds-border-solid ds-rounded",
    "ds-cursor-pointer ds-transition-colors ds-duration-150",
    "ds-text-sm ds-text-neutral-700",
  ],
  {
    variants: {
      state: {
        default: "ds-border-neutral-100 hover:ds-border-neutral-400",
        disabled: "ds-border-neutral-100 ds-bg-neutral-100 ds-opacity-50 ds-cursor-not-allowed",
        error: "ds-border-error-500 hover:ds-border-error-600",
        open: "ds-border-primary-500",
      },
    },
    defaultVariants: { state: "default" },
  }
)

export const multiSelectListVariants = cva([
  "ds-flex ds-flex-col",
  "ds-max-h-64 ds-overflow-y-auto",
])

export const multiSelectItemVariants = cva([
  "ds-flex ds-items-center ds-w-full ds-px-2 ds-py-2",
  "ds-rounded-xs ds-cursor-pointer ds-transition-colors ds-duration-100",
  "hover:ds-bg-neutral-50",
])

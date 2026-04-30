import { cva } from "class-variance-authority"

export const exibitionGridVariants = cva(["ds-inline-flex ds-items-center ds-gap-2"])

export const counterCellVariants = cva(
  [
    "ds-inline-flex ds-items-center ds-gap-2",
    "ds-border ds-border-solid ds-border-neutral-200 ds-rounded-sm",
    "ds-pl-2 ds-pr-0.5 ds-py-0.5",
    "ds-cursor-pointer ds-select-none",
    "ds-transition-colors ds-duration-150",
    "focus-visible:ds-outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-primary-500 focus-visible:ds-ring-offset-1",
  ],
  {
    variants: {
      open: {
        true: "ds-bg-neutral-50",
        false: "ds-bg-white hover:ds-bg-neutral-50",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
)

export const dropdownItemVariants = cva([
  "ds-flex ds-items-center ds-justify-start",
  "ds-w-full ds-px-2 ds-py-1",
  "ds-rounded-sm",
  "ds-cursor-pointer",
  "ds-text-14 ds-leading-20 ds-font-medium ds-text-neutral-600 ds-whitespace-nowrap",
  "ds-transition-colors ds-duration-150",
  "hover:ds-bg-neutral-50",
])

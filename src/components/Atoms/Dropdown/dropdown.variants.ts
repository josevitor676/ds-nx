import { cva } from "class-variance-authority"

export const dropdownVariants = cva([
  "ds-bg-surface-base",
  "ds-border ds-border-solid ds-border-neutral-100",
  "ds-rounded-sm",
  "ds-p-2",
  "ds-flex ds-flex-col ds-gap-0.5 ds-items-stretch",
  "ds-shadow-md",
  "ds-w-fit",
])

export const dropdownItemVariants = cva(
  [
    "ds-flex ds-items-center ds-gap-2",
    "ds-p-2",
    "ds-rounded-xs",
    "ds-w-full",
    "ds-text-14 ds-font-normal ds-leading-20 ds-text-left ds-whitespace-nowrap",
    "ds-transition-colors ds-duration-200",
    "ds-cursor-pointer",
    "disabled:ds-opacity-50 disabled:ds-cursor-not-allowed disabled:hover:ds-bg-transparent",
  ],
  {
    variants: {
      selected: {
        true: "ds-bg-primary-25 ds-text-primary-500",
        false: "ds-text-neutral-600 hover:ds-bg-neutral-50",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

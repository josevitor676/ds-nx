import { cva } from "class-variance-authority"

export const headerVariants = cva([
  "ds-flex ds-items-center ds-gap-4 ds-w-full ds-justify-between",
  "ds-bg-surface-base ds-px-4 ds-py-1",
])

export const headerSearchVariants = cva(
  [
    "ds-flex ds-items-center ds-gap-2 ds-flex-1 ds-min-w-0 ds-max-w-[726px]",
    "ds-h-7 ds-px-2 ds-rounded-sm",
    "ds-bg-surface-base ds-border ds-border-primary-500",
    "hover:ds-border-primary-400 focus-within:ds-border-primary-400",
    "ds-transition-colors ds-duration-150 ds-cursor-text",
    "ds-mx-auto",
  ],
  {
    variants: {
      variant: {
        default: "",
        filled: "ds-text-white ds-border-primary-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export const headerProfileButtonVariants = cva([
  "ds-flex ds-items-center ds-p-1 ds-rounded-sm ds-flex-shrink-0",
  "ds-cursor-pointer ds-transition-colors ds-duration-150",
  "hover:ds-bg-primary-200",
])

export const headerDropdownVariants = cva([
  "ds-bg-surface-base ds-rounded-sm ds-shadow-sm",
  "ds-p-2 ds-w-60",
  "ds-flex ds-flex-col ds-gap-2",
  "ds-outline-none",
])

export const headerMenuItemVariants = cva([
  "ds-flex ds-items-center ds-gap-2 ds-p-2 ds-rounded-md",
  "ds-cursor-pointer ds-transition-colors ds-duration-150",
  "ds-text-neutral-600 hover:ds-bg-primary-25",
  "ds-w-full ds-text-left ds-text-sm ds-font-normal ds-tracking-normal ds-leading-normal",
])

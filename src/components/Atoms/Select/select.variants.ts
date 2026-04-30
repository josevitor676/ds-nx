import { cva } from "class-variance-authority"

export const selectTriggerVariants = cva(
  [
    "ds-group ds-flex ds-items-center ds-justify-between ds-gap-[8px]",
    "ds-w-full ds-h-[40px] ds-px-[16px] ds-border-neutral-100",
    "ds-rounded-sm ds-border ds-border-solid ds-transition-colors ds-duration-200",
    "ds-outline-none ds-text-left",
  ],
  {
    variants: {
      state: {
        default:
          "ds-border-neutral-100 ds-bg-surface-base ds-cursor-pointer hover:ds-border-neutral-100 data-[state=open]:ds-border-neutral-100",
        hover: "ds-border-neutral-100 ds-bg-surface-base ds-cursor-pointer",
        filled:
          "ds-border-neutral-100 ds-bg-surface-base ds-cursor-pointer hover:ds-border-neutral-100 data-[state=open]:ds-border-neutral-100",
        open: "ds-border-neutral-100 ds-bg-surface-base ds-cursor-pointer",
        error: "ds-border-error-500 ds-bg-surface-base ds-cursor-pointer",
        disable: "ds-border-neutral-100 ds-bg-neutral-100 ds-cursor-not-allowed ds-opacity-100",
      },
    },
    defaultVariants: { state: "default" },
  }
)

export const selectContentVariants = cva([
  "ds-w-[var(--radix-select-trigger-width)]",
  "ds-bg-surface-base ds-rounded-sm",
  "ds-border ds-border-solid ds-border-neutral-100",
  "ds-shadow-md",
  "ds-z-50 ds-overflow-hidden",
  "ds-flex ds-flex-col ds-gap-0.5",
])

export const selectItemVariants = cva([
  "ds-relative ds-flex ds-items-center",
  "ds-h-[40px] ds-pl-[40px] ds-pr-[16px]",
  "ds-text-14 ds-font-regular ds-leading-20 ds-text-neutral-600",
  "ds-cursor-pointer ds-select-none ds-outline-none",
  "hover:ds-bg-neutral-25 focus:ds-bg-neutral-25",
  "data-[state=checked]:ds-bg-primary-25 data-[state=checked]:ds-text-primary-500 data-[state=checked]:ds-font-medium",
])

export const selectValueVariants = cva("ds-text-14 ds-leading-20", {
  variants: {
    filled: {
      true: "ds-text-neutral-600 ds-font-medium",
      false: "ds-text-neutral-400 ds-font-regular",
    },
  },
})

export const selectIconVariants = cva(
  [
    "ds-w-[20px] ds-h-[20px] ds-flex ds-items-center ds-justify-center ds-shrink-0",
    "ds-transition-transform ds-duration-200",
    "group-data-[state=open]:ds-rotate-180",
  ],
  {
    variants: {
      disabled: {
        true: "ds-text-neutral-400",
        false: "ds-text-neutral-600",
      },
    },
    defaultVariants: { disabled: false },
  }
)

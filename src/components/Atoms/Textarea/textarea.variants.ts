import { cva } from "class-variance-authority"

export const textareaContainerVariants = cva(
  [
    "ds-relative ds-flex ds-flex-col ds-items-end ds-justify-between",
    "ds-border ds-border-solid ds-rounded ds-p-2",
    "ds-transition-colors ds-duration-200",
  ],
  {
    variants: {
      state: {
        default: "ds-bg-surface-base ds-border-neutral-100 focus-within:ds-border-primary-500",
        hover: "ds-bg-surface-base ds-border-neutral-600",
        filled: "ds-bg-surface-base ds-border-neutral-600",
        error: "ds-bg-surface-base ds-border-error-500",
        disable: "ds-bg-neutral-100 ds-border-neutral-100",
      },
    },
    defaultVariants: { state: "default" },
  }
)

export const textareaLabelVariants = cva(
  "ds-text-[14px] ds-font-normal ds-leading-[20px] ds-tracking-[0px]",
  {
    variants: {
      state: {
        default: "ds-text-neutral-600",
        hover: "ds-text-neutral-600",
        filled: "ds-text-neutral-600",
        error: "ds-text-neutral-600",
        disable: "ds-text-neutral-400",
      },
    },
    defaultVariants: { state: "default" },
  }
)

export const textareaHelperTextVariants = cva(
  "ds-text-[12px] ds-font-normal ds-leading-[18px] ds-tracking-[0px]",
  {
    variants: {
      state: {
        default: "ds-text-neutral-600",
        hover: "ds-text-neutral-600",
        filled: "ds-text-neutral-600",
        error: "ds-text-error-500",
        disable: "ds-text-neutral-600",
      },
    },
    defaultVariants: { state: "default" },
  }
)

export const textareaFieldVariants = cva(
  [
    "ds-w-full ds-min-h-[60px]",
    "ds-bg-transparent ds-border-none ds-outline-none ds-resize-y",
    "ds-text-[14px] ds-font-normal ds-leading-[20px] ds-tracking-[0px]",
    "ds-text-neutral-600 ds-placeholder-neutral-400",
  ],
  {
    variants: {
      disabled: {
        true: "ds-cursor-not-allowed",
        false: "ds-cursor-text",
      },
    },
    defaultVariants: { disabled: false },
  }
)

import { cva } from "class-variance-authority";

export const inputContainerVariants = cva(
  [
    "ds-flex ds-items-center ds-gap-[8px]",
    "ds-h-[40px] ds-px-[12px]",
    "ds-rounded ds-border ds-border-solid",
    "ds-transition-colors ds-duration-200",
  ],
  {
    variants: {
      state: {
        default: "ds-border-neutral-300 ds-bg-surface-base hover:ds-border-neutral-600 focus-within:ds-border-primary-500",
        hover:   "ds-border-neutral-600 ds-bg-surface-base",
        filled:  "ds-border-neutral-300 ds-bg-surface-base hover:ds-border-neutral-600",
        error:   "ds-border-error-500 ds-bg-surface-base focus-within:ds-border-error-600",
        disable: "ds-border-neutral-200 ds-bg-neutral-50 ds-cursor-not-allowed ds-opacity-60",
      },
    },
    defaultVariants: { state: "default" },
  },
);

export const inputHelperTextVariants = cva("ds-text-[12px] ds-leading-[1.4]", {
  variants: {
    state: {
      default: "ds-text-neutral-500",
      hover:   "ds-text-neutral-500",
      filled:  "ds-text-neutral-500",
      error:   "ds-text-error-500",
      disable: "ds-text-neutral-400",
    },
  },
  defaultVariants: { state: "default" },
});

export const inputFieldVariants = cva(
  [
    "ds-flex-1 ds-min-w-0 ds-bg-transparent ds-border-none ds-outline-none",
    "ds-text-[14px] ds-text-neutral-800 ds-placeholder-neutral-400",
  ],
  {
    variants: {
      disabled: {
        true:  "ds-cursor-not-allowed",
        false: "ds-cursor-text",
      },
    },
    defaultVariants: { disabled: false },
  },
);

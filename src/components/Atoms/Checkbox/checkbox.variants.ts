import { cva } from "class-variance-authority";

export const checkboxWrapperVariants = cva("ds-inline-flex ds-items-center ds-gap-[8px]", {
  variants: {
    disabled: {
      true:  "ds-cursor-not-allowed ds-opacity-50",
      false: "ds-cursor-pointer",
    },
  },
  defaultVariants: { disabled: false },
});

export const checkboxBoxVariants = cva(
  // ds-rounded-sm replaces the hardcoded ds-rounded-[6px]
  "ds-rounded-sm ds-border ds-border-solid ds-flex ds-items-center ds-justify-center ds-transition-colors ds-duration-150 ds-shrink-0",
  {
    variants: {
      size: {
        sm: "ds-w-[16px] ds-h-[16px]",
        md: "ds-w-[18px] ds-h-[18px]",
        lg: "ds-w-[22px] ds-h-[22px]",
      },
      selected: {
        true:  "ds-bg-primary-500 ds-border-primary-500",
        false: "ds-bg-surface-base ds-border-neutral-300 hover:ds-border-primary-400",
      },
    },
    defaultVariants: { size: "md", selected: false },
  },
);

export const checkboxLabelVariants = cva("ds-text-[14px] ds-leading-[1.4]", {
  variants: {
    disabled: {
      true:  "ds-text-neutral-400",
      false: "ds-text-neutral-700",
    },
  },
  defaultVariants: { disabled: false },
});

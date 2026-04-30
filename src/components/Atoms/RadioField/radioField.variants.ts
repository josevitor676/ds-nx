import { cva } from "class-variance-authority";

export const radioWrapperVariants = cva("ds-inline-flex ds-items-center ds-gap-3", {
  variants: {
    disabled: {
      true:  "ds-cursor-not-allowed ds-opacity-50",
      false: "ds-cursor-pointer",
    },
  },
  defaultVariants: { disabled: false },
});

export const radioButtonVariants = cva(
  "ds-w-[20px] ds-h-[20px] ds-rounded-full ds-border-2 ds-border-solid ds-shrink-0 ds-relative ds-overflow-hidden ds-transition-colors ds-duration-150 ds-outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-primary-200",
  {
    variants: {
      checked: {
        true:  "ds-border-primary-600",
        false: "ds-border-neutral-300 hover:ds-border-primary-400",
      },
    },
    defaultVariants: { checked: false },
  },
);

export const radioLabelVariants = cva(
  "ds-text-[14px] ds-text-neutral-700",
);

import { cva } from "class-variance-authority";

/** Track — trilho do switch */
export const switchTrackVariants = cva(
  [
    "ds-relative ds-inline-flex ds-shrink-0 ds-items-center",
    "ds-w-[44px] ds-h-[24px] ds-rounded-full",
    "ds-transition-colors ds-duration-200",
    "ds-cursor-pointer",
    "ds-border ds-border-solid",
    "focus-visible:ds-outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-primary-500 focus-visible:ds-ring-offset-2",
    "disabled:ds-cursor-not-allowed",
  ],
  {
    variants: {
      checked: {
        true:  "ds-bg-primary-500 ds-border-primary-500 hover:ds-bg-primary-700 hover:ds-border-primary-700",
        false: "ds-bg-neutral-200 ds-border-neutral-300 hover:ds-bg-neutral-300 hover:ds-border-neutral-400",
      },
      disabled: {
        true:  "ds-opacity-50 hover:ds-bg-neutral-200 hover:ds-border-neutral-300",
        false: "",
      },
    },
    compoundVariants: [
      {
        checked: true,
        disabled: true,
        class: "hover:ds-bg-primary-500 hover:ds-border-primary-500",
      },
    ],
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  },
);

/** Thumb — bolinha deslizante */
export const switchThumbVariants = cva(
  [
    "ds-absolute ds-top-[3px]",
    "ds-w-[16px] ds-h-[16px] ds-rounded-full ds-bg-white",
    "ds-shadow-sm ds-transition-all ds-duration-200",
  ],
  {
    variants: {
      checked: {
        true:  "ds-left-[24px]",
        false: "ds-left-[3px]",
      },
    },
    defaultVariants: {
      checked: false,
    },
  },
);

/** Label de texto ao lado do switch */
export const switchLabelVariants = cva(
  "ds-text-[14px] ds-font-normal ds-leading-[1.4] ds-select-none",
  {
    variants: {
      disabled: {
        true:  "ds-text-neutral-400 ds-cursor-not-allowed",
        false: "ds-text-neutral-700 ds-cursor-pointer",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

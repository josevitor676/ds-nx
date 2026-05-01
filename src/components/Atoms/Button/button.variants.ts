import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  // base styles
  [
    "ds-inline-flex ds-items-center ds-justify-center ds-gap-2",
    "ds-rounded ds-font-medium ds-text-sm ds-tracking-normal ds-transition-all ds-duration-200",
    "ds-w-full md:ds-w-auto",
    "ds-cursor-pointer disabled:ds-text-neutral-400 disabled:ds-cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        filled: "disabled:ds-bg-neutral-100",
        outlined:
          "ds-bg-transparent ds-border ds-border-solid disabled:ds-border-neutral-200 disabled:ds-bg-transparent",
        clear: "ds-bg-transparent ds-border-none disabled:hover:ds-bg-transparent",
      },
      color: {
        primary: "",
        error: "",
        neutral: "",
      },
      size: {
        sm: "ds-h-7 ds-px-3",
        md: "ds-h-8 ds-px-3",
        lg: "ds-h-10 ds-px-4",
      },
    },
    compoundVariants: [
      // filled
      {
        variant: "filled",
        color: "primary",
        class: "ds-bg-primary-500 ds-text-white hover:ds-bg-primary-400",
      },
      {
        variant: "filled",
        color: "error",
        class: "ds-bg-error-500 ds-text-white hover:ds-bg-error-600",
      },
      {
        variant: "filled",
        color: "neutral",
        class: "ds-bg-neutral-200 ds-text-white hover:ds-bg-neutral-300",
      },
      // outlined
      {
        variant: "outlined",
        color: "primary",
        class: "ds-text-primary-500 ds-border-primary-500 hover:ds-bg-primary-50",
      },
      {
        variant: "outlined",
        color: "error",
        class: "ds-text-error-500 ds-border-error-500 hover:ds-bg-error-50",
      },
      {
        variant: "outlined",
        color: "neutral",
        class: "ds-text-neutral-700 ds-border-neutral-700 hover:ds-bg-neutral-50",
      },
      // clear
      {
        variant: "clear",
        color: "primary",
        class: "ds-text-primary-500 hover:ds-bg-primary-50",
      },
      {
        variant: "clear",
        color: "error",
        class: "ds-text-error-500 hover:ds-bg-error-50",
      },
      {
        variant: "clear",
        color: "neutral",
        class: "ds-text-neutral-700 hover:ds-bg-neutral-50",
      },
    ],
    defaultVariants: {
      variant: "filled",
      color: "primary",
      size: "md",
    },
  }
)

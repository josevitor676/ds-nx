import { cva } from "class-variance-authority"

export const iconButtonVariants = cva(
  [
    "ds-inline-flex ds-items-center ds-justify-center ds-shrink-0",
    "ds-rounded ds-transition-all ds-duration-200 ds-cursor-pointer",
    "disabled:ds-opacity-50 disabled:ds-cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        filled: "",
        outlined: "ds-bg-transparent ds-border ds-border-solid",
        clear: "ds-bg-transparent ds-border-none",
      },
      colorVariant: {
        primary: "",
        error: "",
        neutral: "",
      },
      size: {
        sm: "ds-w-[28px] ds-h-[28px]",
        md: "ds-w-[32px] ds-h-[32px]",
        lg: "ds-w-[40px] ds-h-[40px]",
      },
    },
    compoundVariants: [
      // filled
      {
        variant: "filled",
        colorVariant: "primary",
        class: "ds-bg-primary-500 ds-text-white hover:ds-bg-primary-700 hover:ds-text-primary-25",
      },
      {
        variant: "filled",
        colorVariant: "error",
        class: "ds-bg-error-500 ds-text-white hover:ds-bg-error-700 hover:ds-text-error-50",
      },
      {
        variant: "filled",
        colorVariant: "neutral",
        class: "ds-bg-neutral-500 ds-text-white hover:ds-bg-neutral-700 hover:ds-text-neutral-25",
      },
      // outlined
      {
        variant: "outlined",
        colorVariant: "primary",
        class: "ds-text-primary-500 ds-border-primary-100 hover:ds-bg-primary-50",
      },
      {
        variant: "outlined",
        colorVariant: "error",
        class: "ds-text-error-500 ds-border-error-100 hover:ds-bg-error-50",
      },
      {
        variant: "outlined",
        colorVariant: "neutral",
        class: "ds-text-neutral-500 ds-border-neutral-200 hover:ds-bg-neutral-50",
      },
      // clear
      {
        variant: "clear",
        colorVariant: "primary",
        class: "ds-text-primary-500 hover:ds-bg-primary-50",
      },
      { variant: "clear", colorVariant: "error", class: "ds-text-error-500 hover:ds-bg-error-50" },
      {
        variant: "clear",
        colorVariant: "neutral",
        class: "ds-text-neutral-500 hover:ds-bg-neutral-50",
      },
    ],
    defaultVariants: {
      variant: "filled",
      colorVariant: "primary",
      size: "md",
    },
  }
)

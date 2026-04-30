import { cva } from "class-variance-authority"

export const linkButtonVariants = cva(
  "ds-inline-flex ds-items-center ds-gap-0.5 ds-text-14 ds-leading-20 ds-font-medium ds-underline ds-underline-offset-2 ds-transition-colors ds-duration-150",
  {
    variants: {
      colorVariant: {
        primary: "ds-text-primary-500 hover:ds-text-primary-700",
        neutral: "ds-text-neutral-600 hover:ds-text-neutral-800",
      },
      disabled: {
        true: "ds-pointer-events-none ds-opacity-50 ds-cursor-not-allowed",
        false: "ds-cursor-pointer",
      },
    },
    defaultVariants: { colorVariant: "primary", disabled: false },
  }
)

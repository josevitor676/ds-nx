import { cva } from "class-variance-authority"

export type BreadcrumbState = "disabled" | "active" | "link"

export const breadcrumbAnchorVariants = cva(
  "ds-inline-flex ds-items-center ds-gap-2 ds-border-b ds-border-transparent ds-pb-px",
  {
    variants: {
      state: {
        disabled: "ds-cursor-not-allowed ds-pointer-events-none",
        active: "ds-cursor-default",
        link: "ds-cursor-pointer hover:ds-border-primary-500",
      },
    },
    defaultVariants: { state: "link" },
  }
)

export const breadcrumbColorVariants = cva("", {
  variants: {
    state: {
      disabled: "ds-text-neutral-600",
      active: "ds-text-neutral-600",
      link: "ds-text-primary-500",
    },
  },
  defaultVariants: { state: "link" },
})

export const breadcrumbTextVariants = cva(
  "ds-font-medium ds-text-sm ds-leading-5 ds-tracking-normal ds-whitespace-nowrap",
  {
    variants: {
      state: {
        disabled: "ds-text-neutral-600",
        active: "ds-text-neutral-600",
        link: "ds-text-primary-500",
      },
    },
    defaultVariants: { state: "link" },
  }
)

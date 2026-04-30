import { cva } from "class-variance-authority"

export const toastVariants = cva(
  [
    "ds-flex ds-items-start ds-gap-[12px]",
    "ds-w-full sm:ds-w-fit ds-max-w-[400px] ds-rounded-md ds-border ds-border-solid",
    "ds-px-[16px] ds-py-[12px]",
    "ds-shadow-md ds-pointer-events-auto",
    "ds-animate-in ds-fade-in-0 ds-slide-in-from-top-2",
  ],
  {
    variants: {
      type: {
        success: "ds-bg-success-50     ds-border-success-200",
        information: "ds-bg-primary-50     ds-border-primary-200",
        warning: "ds-bg-warning-50     ds-border-warning-200",
        error: "ds-bg-error-50       ds-border-error-200",
      },
    },
    defaultVariants: {
      type: "information",
    },
  }
)

export const toastIconVariants = cva(
  "ds-shrink-0 ds-rounded-full ds-w-[22px] ds-h-[22px] ds-flex ds-items-center ds-justify-center",
  {
    variants: {
      type: {
        success: "ds-text-success-600 ds-bg-success-100",
        information: "ds-text-primary-500 ds-bg-primary-100",
        warning: "ds-text-warning-600 ds-bg-warning-100",
        error: "ds-text-error-500 ds-bg-error-100",
      },
    },
    defaultVariants: {
      type: "information",
    },
  }
)

export const toastTitleVariants = cva(
  "ds-text-[16px] ds-font-medium ds-leading-[1.4] ds-text-neutral-900"
)

export const positionClasses: Record<string, string> = {
  "top-right": "ds-top-4 ds-right-4 ds-items-end",
  "top-left": "ds-top-4 ds-left-4  ds-items-start",
  "top-center": "ds-top-4 ds-left-1/2 ds--translate-x-1/2 ds-items-center",
  "bottom-right": "ds-bottom-4 ds-right-4 ds-items-end",
  "bottom-left": "ds-bottom-4 ds-left-4  ds-items-start",
  "bottom-center": "ds-bottom-4 ds-left-1/2 ds--translate-x-1/2 ds-items-center",
}

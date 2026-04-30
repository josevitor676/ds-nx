import { cva } from "class-variance-authority";

export const modalVariants = cva(
  [
    "ds-flex ds-flex-col",
    "ds-bg-surface-base ds-rounded-md ds-shadow-md ds-max-w-full",
  ],
  {
    variants: {
      size: {
        sm: "ds-w-[480px]",
        md: "ds-w-[589px]",
        lg: "ds-w-[720px]",
      },
    },
    defaultVariants: { size: "md" },
  },
);

import { cva } from "class-variance-authority";

export const dialogVariants = cva(
  [
    "ds-flex ds-flex-col",
    "ds-bg-surface-base ds-rounded-md ds-shadow-md ds-max-w-full",
  ],
  {
    variants: {
      type: {
        mobile: "ds-w-[327px]",
        web: "ds-w-[536px]",
      },
    },
    defaultVariants: { type: "web" },
  },
);

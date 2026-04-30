import { cva } from "class-variance-authority";

export const popoverVariants = cva("", {
  variants: {
    size: {
      sm: "ds-w-[260px]",
      md: "ds-w-[320px]",
      lg: "ds-w-[380px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

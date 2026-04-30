import { cva } from "class-variance-authority";

export const paginationVariants = cva([
  "ds-flex ds-items-center ds-gap-2",
], {
  variants: {
    size: {
      sm: "",
      md: "",
    },
  },
  defaultVariants: { size: "md" },
});

export const pageButtonVariants = cva([
  "ds-inline-flex ds-items-center ds-justify-center ds-rounded ds-cursor-pointer",
], {
  variants: {
    variant: {
      clear: "ds-bg-transparent ds-text-neutral-600",
      hover: "ds-bg-neutral-50 ds-text-neutral-600",
      active: "ds-bg-primary-500 ds-font-semibold ds-text-white",
      disabled: "ds-bg-transparent ds-text-neutral-400 ds-cursor-default",
    },
  },
  defaultVariants: { variant: "clear" },
});

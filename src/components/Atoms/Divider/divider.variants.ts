import { cva } from "class-variance-authority";

export const dividerVariants = cva("ds-block", {
  variants: {
    orientation: {
      horizontal: "ds-w-full",
      vertical:   "ds-inline-block ds-self-stretch",
    },
    thickness: {
      1: "",
      2: "",
    },
    color: {
      100: "ds-bg-neutral-100",
      600: "ds-bg-neutral-600",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", thickness: 1, class: "ds-h-[1px]" },
    { orientation: "horizontal", thickness: 2, class: "ds-h-[2px]" },
    { orientation: "vertical",   thickness: 1, class: "ds-w-[1px]" },
    { orientation: "vertical",   thickness: 2, class: "ds-w-[2px]" },
  ],
  defaultVariants: { orientation: "horizontal", thickness: 1, color: 600 },
});

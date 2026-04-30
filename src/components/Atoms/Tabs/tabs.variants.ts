import { cva } from "class-variance-authority";

export const tabsVariants = cva([
  "ds-inline-flex ds-items-center ds-gap-[8px] ds-cursor-pointer ds-select-none",
], {
  variants: {
    size: {
      sm: "ds-text-[12px] ds-py-[6px] ds-px-[8px]",
      md: "ds-text-[14px] ds-py-[8px] ds-px-[10px]",
      lg: "ds-text-[16px] ds-py-[10px] ds-px-[12px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const tabButtonVariants = cva(
  "ds-relative ds-flex ds-flex-col ds-items-start ds-gap-1 ds-border-0 ds-bg-transparent ds-font-semibold",
  {
    variants: {
      active: {
        true:  "ds-text-primary-500",
        false: "ds-text-neutral-500",
      },
    },
    defaultVariants: { active: false },
  },
);

export const tabBadgeVariants = cva(
  "ds-inline-flex ds-items-center ds-justify-center ds-rounded-full ds-px-[8px] ds-h-[20px] ds-min-w-[20px] ds-text-[12px]",
  {
    variants: {
      active: {
        true:  "ds-bg-primary-100 ds-text-primary-500",
        false: "ds-bg-neutral-50 ds-text-neutral-500",
      },
    },
    defaultVariants: { active: false },
  },
);

export const tabUnderlineVariants = cva(
  "ds-block ds-w-full ds-h-[2px] ds-mt-2",
  {
    variants: {
      active: {
        true:  "ds-bg-primary-500",
        false: "ds-bg-neutral-200",
      },
    },
    defaultVariants: { active: false },
  },
);

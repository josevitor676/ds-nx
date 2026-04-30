import { cva } from "class-variance-authority";

export const calendarDayVariants = cva(
  [
    "ds-flex ds-items-center ds-justify-center",
    "ds-h-10 ds-w-10",
    "ds-rounded-sm ds-text-14 ds-font-medium",
  ],
  {
    variants: {
      state: {
        default:
          "ds-text-neutral-500 hover:ds-bg-primary-25 focus-visible:ds-ring-2 focus-visible:ds-ring-primary-500 focus-visible:ds-ring-offset-1",
        dim: "ds-text-neutral-300",
        selected:
          "ds-bg-primary-500 ds-text-white ds-font-semibold focus-visible:ds-ring-2 focus-visible:ds-ring-offset-2 focus-visible:ds-ring-primary-500",
      },
    },
    defaultVariants: { state: "default" },
  },
);

export const calendarPickerButtonVariants = cva(
  [
    "ds-flex ds-items-center ds-gap-1",
    "ds-w-[87px] ds-h-8",
    "ds-px-2 ds-py-[6px]",
    "ds-rounded-md ds-border ds-border-solid ds-text-14 ds-font-semibold",
  ],
  {
    variants: {
      state: {
        idle: [
          "ds-bg-surface-base ds-border-neutral-200 ds-text-neutral-700",
          "hover:ds-border-neutral-500",
          "focus-visible:ds-ring-2 focus-visible:ds-ring-primary-500 focus-visible:ds-ring-offset-1",
        ],
        open: "ds-bg-surface-base ds-border-neutral-500 ds-text-neutral-700",
        disabled:
          "ds-bg-neutral-100 ds-border-neutral-100 ds-text-neutral-400 ds-cursor-default ds-pointer-events-none",
      },
    },
    defaultVariants: { state: "idle" },
  },
);

export const calendarPickerItemVariants = cva(
  [
    "ds-flex ds-items-center ds-justify-center",
    "ds-p-[2px] ds-rounded-sm ds-w-full ds-text-14 ds-text-neutral-800",
    "focus-visible:ds-ring-2 focus-visible:ds-ring-inset focus-visible:ds-ring-primary-500",
  ],
  {
    variants: {
      active: {
        true: "ds-bg-neutral-50 ds-font-semibold",
        false: "ds-font-normal hover:ds-bg-neutral-50",
      },
    },
    defaultVariants: { active: false },
  },
);

import { cva } from "class-variance-authority"

// ─── Container ────────────────────────────────────────────────────────────────

export const sideMenuVariants = cva(
  [
    "ds-flex ds-flex-col ds-h-full",
    "ds-bg-surface-base",
    "ds-overflow-hidden",
    "ds-transition-all ds-duration-300 ds-ease-in-out",
    "ds-py-2",
  ],
  {
    variants: {
      collapsed: {
        true: "ds-w-16",
        false: "ds-w-[238px]",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
)

// ─── Shared base for item and sub-item ────────────────────────────────────────

const sideMenuItemBase = [
  "ds-text-16 ds-text-left",
  "ds-rounded-[2px]",
  "ds-transition-colors ds-duration-150",
  "ds-cursor-pointer ds-select-none ds-outline-none",
  "focus-visible:ds-ring-2 focus-visible:ds-ring-primary-500 focus-visible:ds-ring-inset",
  "disabled:ds-opacity-40 disabled:ds-cursor-not-allowed disabled:ds-pointer-events-none",
] as const

// ─── Item ─────────────────────────────────────────────────────────────────────

export const sideMenuItemVariants = cva(
  [
    "ds-relative ds-flex ds-items-center ds-gap-2",
    "ds-w-full ds-h-10 ds-px-2",
    ...sideMenuItemBase,
  ],
  {
    variants: {
      active: {
        true: ["ds-bg-primary-25 ds-text-primary-700 ds-font-medium"],
        false: [
          "ds-bg-transparent ds-text-neutral-600",
          "hover:ds-bg-primary-25 hover:ds-text-primary-700",
        ],
      },
      expanded: {
        true: "",
        false: "",
      },
      collapsed: {
        true: "ds-justify-center ds-px-0",
        false: "",
      },
    },
    compoundVariants: [
      {
        active: false,
        expanded: false,
        className: "ds-font-normal",
      },
      {
        active: false,
        expanded: true,
        className: "ds-text-primary-700 ds-font-medium",
      },
    ],
    defaultVariants: {
      active: false,
      expanded: false,
      collapsed: false,
    },
  }
)

// ─── Sub-item ─────────────────────────────────────────────────────────────────

export const sideMenuSubItemVariants = cva(
  ["ds-flex ds-items-center ds-gap-2", "ds-w-full ds-h-8 ds-pl-6 ds-pr-2", ...sideMenuItemBase],
  {
    variants: {
      active: {
        true: "ds-bg-primary-25 ds-text-primary-700 ds-font-medium",
        false: [
          "ds-bg-transparent ds-text-neutral-600 ds-font-normal",
          "hover:ds-bg-primary-25 hover:ds-text-primary-700",
        ],
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

// ─── Group label ──────────────────────────────────────────────────────────────

export const sideMenuGroupLabelVariants = cva([
  "ds-px-4 ds-pt-4 ds-pb-0.5",
  "ds-text-14 ds-font-semibold ds-uppercase ds-tracking-[0.08em]",
  "ds-text-neutral-400",
  "ds-truncate",
  "ds-transition-all ds-duration-300",
])

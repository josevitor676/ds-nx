import { cva } from "class-variance-authority"

// ─── Header Cell (TopCell) ────────────────────────────────────────────────────

export const dataTableHeaderCellVariants = cva(
  [
    "ds-bg-surface-base ds-border-neutral-100 ds-border-solid",
    "ds-h-9 ds-min-h-9 ds-max-h-9",
    "ds-p-0 ds-align-middle",
    "ds-overflow-hidden",
  ],
  {
    variants: {
      /**
       * Positional type of the header cell within the row.
       * - enter  → leftmost column  (all borders + rounded-tl)
       * - mid    → middle column    (top + right + bottom)
       * - last   → rightmost column (top + right + bottom + rounded-tr)
       */
      type: {
        enter: "ds-border ds-rounded-tl-sm",
        mid: "ds-border-t ds-border-r ds-border-b",
        last: "ds-border-t ds-border-r ds-border-b ds-rounded-tr-sm",
      },
    },
    defaultVariants: { type: "mid" },
  }
)

// ─── Body Cell (InnerCell) ────────────────────────────────────────────────────

export const dataTableCellVariants = cva(
  [
    "ds-border-neutral-100 ds-border-solid",
    "ds-h-9 ds-min-h-9 ds-max-h-9",
    "ds-p-0 ds-align-middle",
    "ds-overflow-hidden",
    "ds-transition-colors ds-duration-150",
  ],
  {
    variants: {
      /**
       * Positional type within the table grid.
       * - enter      → leftmost column, non-last row       (left + right)
       * - last-enter → leftmost column, last row           (all borders + rounded-bl)
       * - mid        → non-leftmost, non-last row          (right only)
       * - last-mid   → non-leftmost non-corner, last row   (right + bottom)
       * - last       → rightmost column, last row          (right + bottom + rounded-br)
       */
      type: {
        enter: "ds-border-l ds-border-r",
        "last-enter": "ds-border-l ds-border-r ds-border-b ds-rounded-bl-sm",
        mid: "ds-border-r",
        "last-mid": "ds-border-r ds-border-b",
        last: "ds-border-r ds-border-b ds-rounded-br-sm",
      },
      /** Background color of the cell (white / striped / selected-hover) */
      color: {
        white: "ds-bg-surface-base group-hover:ds-bg-primary-50",
        gray: "ds-bg-neutral-25 group-hover:ds-bg-primary-50",
        hover: "ds-bg-primary-25 group-hover:ds-bg-primary-50",
      },
    },
    defaultVariants: { type: "mid", color: "white" },
  }
)

// ─── Sort Button ─────────────────────────────────────────────────────────────

export const dataTableSortButtonVariants = cva(
  [
    "ds-inline-flex ds-items-center ds-justify-center",
    "ds-w-5 ds-h-5 ds-shrink-0",
    "ds-rounded-full ds-transition-colors ds-duration-150",
    "ds-cursor-pointer",
    "hover:ds-bg-primary-25 hover:ds-text-primary-500",
    "focus-visible:ds-outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-primary-500",
  ],
  {
    variants: {
      active: {
        true: "ds-bg-primary-25 ds-text-primary-500",
        false: "ds-text-neutral-300",
      },
    },
    defaultVariants: { active: false },
  }
)

// ─── Filter Button ────────────────────────────────────────────────────────────

export const dataTableFilterButtonVariants = cva(
  [
    "ds-inline-flex ds-items-center ds-justify-center",
    "ds-w-5 ds-h-5 ds-shrink-0",
    "ds-rounded-full ds-transition-colors ds-duration-150",
    "ds-cursor-pointer",
    "hover:ds-bg-primary-25 hover:ds-text-primary-500",
    "focus-visible:ds-outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-primary-500",
  ],
  {
    variants: {
      active: {
        true: "ds-bg-primary-25 ds-text-primary-500",
        false: "ds-text-neutral-300",
      },
    },
    defaultVariants: { active: false },
  }
)

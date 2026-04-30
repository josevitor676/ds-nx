import { cva } from "class-variance-authority";

export const tagVariants = cva(
  [
    "ds-inline-flex ds-items-center ds-gap-1",
    "ds-font-medium ds-select-none ds-rounded-md",
  ],
  {
    variants: {
      variant: {
        soft: "",
        strong: "",
      },
      color: {
        blue: "",
        gray: "",
        green: "",
        "dark-green": "",
        purple: "",
        red: "",
        orange: "",
        yellow: "",
      },
      size: {
        small: "ds-text-[11px] ds-px-[6px] ds-py-1",
        medium: "ds-text-[12px] ds-px-2 ds-py-[5px]",
        large: "ds-text-[13px] ds-px-2.5 ds-py-[6px]",
      },
      removable: {
        true: "",
        false: "",
      },
      disabled: {
        true:  "ds-opacity-50 ds-cursor-not-allowed",
        false: "",
      },
    },
    compoundVariants: [
      // ── soft base colors ─────────────────────────────────────────────────
      {
        variant: "soft",
        color: "blue",
        class: "ds-bg-primary-50 ds-text-primary-500",
      },
      {
        variant: "soft",
        color: "gray",
        class: "ds-bg-neutral-50 ds-text-neutral-700",
      },
      {
        variant: "soft",
        color: "green",
        class: "ds-bg-success-100 ds-text-success-700",
      },
      {
        variant: "soft",
        color: "dark-green",
        class: "ds-bg-success-50 ds-text-success-900",
      },
      {
        variant: "soft",
        color: "purple",
        class: "ds-bg-primary-100 ds-text-primary-800",
      },
      {
        variant: "soft",
        color: "red",
        class: "ds-bg-error-50 ds-text-error-500",
      },
      {
        variant: "soft",
        color: "orange",
        class: "ds-bg-warning-100 ds-text-warning-700",
      },
      {
        variant: "soft",
        color: "yellow",
        class: "ds-bg-warning-50 ds-text-warning-700",
      },
      // ── strong base colors ────────────────────────────────────────────────
      {
        variant: "strong",
        color: "blue",
        class: "ds-bg-primary-500 ds-text-white",
      },
      {
        variant: "strong",
        color: "gray",
        class: "ds-bg-neutral-700 ds-text-white",
      },
      {
        variant: "strong",
        color: "green",
        class: "ds-bg-success-600 ds-text-white",
      },
      {
        variant: "strong",
        color: "dark-green",
        class: "ds-bg-success-900 ds-text-white",
      },
      {
        variant: "strong",
        color: "purple",
        class: "ds-bg-primary-800 ds-text-white",
      },
      {
        variant: "strong",
        color: "red",
        class: "ds-bg-error-500 ds-text-white",
      },
      {
        variant: "strong",
        color: "orange",
        class: "ds-bg-warning-600 ds-text-white",
      },
      {
        variant: "strong",
        color: "yellow",
        class: "ds-bg-warning-800 ds-text-white",
      },
      // ── soft hover (only when removable) ─────────────────────────────────
      {
        variant: "soft",
        color: "blue",
        removable: true,
        class: "hover:ds-bg-primary-100",
      },
      {
        variant: "soft",
        color: "gray",
        removable: true,
        class: "hover:ds-bg-neutral-100",
      },
      {
        variant: "soft",
        color: "green",
        removable: true,
        class: "hover:ds-bg-success-200",
      },
      {
        variant: "soft",
        color: "dark-green",
        removable: true,
        class: "hover:ds-bg-success-100",
      },
      {
        variant: "soft",
        color: "purple",
        removable: true,
        class: "hover:ds-bg-primary-200",
      },
      {
        variant: "soft",
        color: "red",
        removable: true,
        class: "hover:ds-bg-error-100",
      },
      {
        variant: "soft",
        color: "orange",
        removable: true,
        class: "hover:ds-bg-warning-200",
      },
      {
        variant: "soft",
        color: "yellow",
        removable: true,
        class: "hover:ds-bg-warning-100",
      },
      // ── strong hover (only when removable) ───────────────────────────────
      {
        variant: "strong",
        color: "blue",
        removable: true,
        class: "hover:ds-bg-primary-700",
      },
      {
        variant: "strong",
        color: "gray",
        removable: true,
        class: "hover:ds-bg-neutral-600",
      },
      {
        variant: "strong",
        color: "green",
        removable: true,
        class: "hover:ds-bg-success-700",
      },
      {
        variant: "strong",
        color: "dark-green",
        removable: true,
        class: "hover:ds-bg-success-800",
      },
      {
        variant: "strong",
        color: "purple",
        removable: true,
        class: "hover:ds-bg-primary-900",
      },
      {
        variant: "strong",
        color: "red",
        removable: true,
        class: "hover:ds-bg-error-700",
      },
      {
        variant: "strong",
        color: "orange",
        removable: true,
        class: "hover:ds-bg-warning-700",
      },
      {
        variant: "strong",
        color: "yellow",
        removable: true,
        class: "hover:ds-bg-warning-500",
      },
    ],
    defaultVariants: {
      variant: "soft",
      color: "blue",
      size: "medium",
      disabled: false,
    },
  },
);

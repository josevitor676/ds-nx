import { cva } from "class-variance-authority";

export const tooltipContentVariants = cva([
  "ds-px-[10px] ds-py-[8px] ds-rounded-md",
  "ds-bg-primary-900",
  "ds-shadow-sm",
  "ds-z-50 ds-select-none ds-animate-in ds-fade-in-0 ds-zoom-in-95",
]);

export const tooltipTitleVariants = cva(
  "ds-text-[14px] ds-font-medium ds-text-white ds-leading-[1.4] ds-mb-[2px]",
);

export const tooltipDescriptionVariants = cva(
  "ds-text-[12px] ds-font-normal ds-text-white ds-leading-[1.4]",
);

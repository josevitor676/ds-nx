import * as RadixPopover from "@radix-ui/react-popover";
import React from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../Button/Button";
import { popoverVariants } from "./popover.variants";

export interface PopoverProps {
  trigger: React.ReactElement;
  title?: string;
  counter?: string;
  description?: React.ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: RadixPopover.PopoverContentProps["side"];
  align?: RadixPopover.PopoverContentProps["align"];
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Popover = ({
  trigger,
  title,
  counter,
  description,
  primaryLabel = "Texto",
  secondaryLabel = "Texto",
  onPrimary,
  onSecondary,
  open,
  onOpenChange,
  side = "top",
  align = "center",
  size = "md",
  className,
}: PopoverProps) => (
  <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
    <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>

    <RadixPopover.Portal>
      <RadixPopover.Content
        side={side}
        align={align}
        sideOffset={12}
        className={cn(
          popoverVariants({ size }),
          "ds-bg-surface-base ds-rounded ds-p-4 ds-shadow-sm ds-z-50 ds-select-none",
          className,
        )}
      >
        <div className="ds-flex ds-justify-between ds-items-start ds-gap-4 ds-mb-2">
          {title ? (
            <h3 className="ds-text-[16px] ds-font-semibold ds-text-neutral-800">
              {title}
            </h3>
          ) : null}

          {counter ? (
            <span className="ds-text-[12px] ds-text-neutral-500 ds-ml-auto">
              {counter}
            </span>
          ) : null}
        </div>

        {description && (
          <p className="ds-text-[14px] ds-text-neutral-600 ds-leading-[1.4] ds-mb-4">
            {description}
          </p>
        )}

        <div className="ds-h-[1px] ds-bg-neutral-100 ds-mb-4 ds-w-full" />

        <div className="ds-flex ds-justify-between ds-items-center">
          <button
            type="button"
            onClick={onSecondary}
            className="ds-text-[14px] ds-text-neutral-700 ds-bg-transparent ds-py-2 ds-px-2 ds-rounded"
          >
            {secondaryLabel}
          </button>

          <div>
            <Button
              onClick={onPrimary}
              size="sm"
              variant="filled"
              color="primary"
            >
              {primaryLabel}
            </Button>
          </div>
        </div>

        <RadixPopover.Arrow className="ds-fill-white" width={16} height={8} />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  </RadixPopover.Root>
);

Popover.displayName = "Popover";

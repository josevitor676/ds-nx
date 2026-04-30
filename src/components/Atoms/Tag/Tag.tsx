import { type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../../lib/utils";
import { tagVariants } from "./tag.variants";

export interface TagProps extends VariantProps<typeof tagVariants> {
  label: string;
  onRemove?: () => void;
  /** Disables the remove action and marks the tag as non-interactive */
  disabled?: boolean;
  className?: string;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      label,
      variant = "soft",
      color = "blue",
      size = "medium",
      onRemove,
      disabled = false,
      className,
    },
    ref,
  ) => (
    <span
      ref={ref}
      className={cn(
        tagVariants({
          variant,
          color,
          size,
          removable: !!onRemove && !disabled,
          disabled,
        }),
        className,
      )}
    >
      {label}
      {onRemove && (
        // span[role=button] instead of <button> to prevent invalid button-in-button nesting
        // when Tag is placed inside a <button> parent element
        <span
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={`Remover ${label}`}
          aria-disabled={disabled || undefined}
          onClick={(e) => {
            if (disabled) return;
            e.stopPropagation();
            onRemove();
          }}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }
          }}
          className="ds-flex ds-items-center ds-justify-center ds-text-[12px] ds-rounded-full ds-ml-1 ds-cursor-pointer ds-select-none ds-p-0 ds-leading-none ds-text-current ds-opacity-60 hover:ds-opacity-100"
        >
          ✕
        </span>
      )}
    </span>
  ),
);

Tag.displayName = "Tag";

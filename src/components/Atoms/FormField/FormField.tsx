import React from "react";
import { cn } from "../../../lib/utils";

export interface FormFieldProps {
  /** ID forwarded to the label's htmlFor */
  id?: string;
  label?: string;
  labelClassName?: string;
  /** Appends an asterisk after the label */
  mandatory?: boolean;
  helperText?: string;
  helperTextClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      id,
      label,
      labelClassName,
      mandatory = false,
      helperText,
      helperTextClassName,
      className,
      children,
    },
    ref,
  ) => {
    const enrichedChildren = mandatory
      ? (() => {
          const kids = React.Children.toArray(children);
          const firstValidIdx = kids.findIndex((c) => React.isValidElement(c));
          if (firstValidIdx === -1) return children;
          return kids.map((child, i) =>
            i === firstValidIdx
              ? React.cloneElement(
                  child as React.ReactElement<Record<string, unknown>>,
                  { "aria-required": true },
                )
              : child,
          );
        })()
      : children;

    return (
      <div
        ref={ref}
        className={cn("ds-flex ds-flex-col ds-gap-[4px] ds-w-full", className)}
      >
        {label && (
          <div className="ds-flex ds-items-center ds-gap-[2px]">
            <label htmlFor={id} className={labelClassName}>
              {label}
            </label>
            {mandatory && (
              <>
                <span className={labelClassName} aria-hidden="true">
                  *
                </span>
                <span className="ds-sr-only"> (obrigatório)</span>
              </>
            )}
          </div>
        )}

        {enrichedChildren}

        {helperText && <p className={helperTextClassName}>{helperText}</p>}
      </div>
    );
  },
);

FormField.displayName = "FormField";

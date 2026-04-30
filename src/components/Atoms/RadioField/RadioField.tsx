import React from "react";
import { cn } from "../../../lib/utils";
import { radioButtonVariants, radioLabelVariants, radioWrapperVariants } from "./radioField.variants";

export interface RadioFieldProps {
  label?: string;
  value: string;
  selectedValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}


export const RadioField = React.forwardRef<HTMLButtonElement, RadioFieldProps>(
  (
    { label, value, selectedValue, disabled = false, onChange, className },
    ref,
  ) => {
    const isChecked = value === selectedValue;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (disabled) return;
      onChange?.(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onChange?.(value);
      }
    };

    return (
      <label className={cn(radioWrapperVariants({ disabled }), className)}>
        <button
          ref={ref}
          type="button"
          role="radio"
          aria-checked={isChecked}
          aria-disabled={disabled}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={radioButtonVariants({ checked: isChecked })}
        >
          {isChecked && (
            <span className="ds-absolute ds-left-1/2 ds-top-1/2 ds--translate-x-1/2 ds--translate-y-1/2 ds-w-[10px] ds-h-[10px] ds-rounded-full ds-bg-primary-600" />
          )}
        </button>

        {label && (
          <span className={radioLabelVariants()}>{label}</span>
        )}
      </label>
    );
  },
);

RadioField.displayName = "RadioField";

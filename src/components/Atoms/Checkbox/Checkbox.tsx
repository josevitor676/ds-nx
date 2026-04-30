import React from "react";
import { cn } from "../../../lib/utils";
import {
  checkboxBoxVariants,
  checkboxLabelVariants,
  checkboxWrapperVariants,
} from "./checkbox.variants";

export type CheckboxValue = "check" | "uncheck" | "indeterminate";

export interface CheckboxProps {
  disabled?: boolean;
  value?: CheckboxValue;
  label?: string;
  onChange?: (value: CheckboxValue) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const CheckIcon = () => (
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
    <path
      d="M1 4L3.5 6.5L9 1"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndeterminateIcon = () => (
  <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
    <path d="M1 1H9" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);


export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      disabled = false,
      value = "uncheck",
      label,
      onChange,
      className,
      size = "md",
    },
    ref,
  ) => {
    const isDisabled = disabled;
    const isChecked = value === "check";
    const isIndeterminate = value === "indeterminate";
    const isSelected = isChecked || isIndeterminate;

    return (
      <label
        className={cn(checkboxWrapperVariants({ disabled: isDisabled }), className)}
      >
        <button
          ref={ref}
          type="button"
          role="checkbox"
          aria-checked={
            isIndeterminate ? "mixed" : isChecked ? "true" : "false"
          }
          disabled={isDisabled}
          onClick={() =>
            !isDisabled && onChange?.(isSelected ? "uncheck" : "check")
          }
          className={checkboxBoxVariants({ size, selected: isSelected })}
        >
          {isChecked && <CheckIcon />}
          {isIndeterminate && <IndeterminateIcon />}
        </button>

        {label && (
          <span className={checkboxLabelVariants({ disabled: isDisabled })}>
            {label}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

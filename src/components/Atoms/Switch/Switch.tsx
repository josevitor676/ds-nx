import React, { useId } from "react";
import { cn } from "../../../lib/utils";
import {
  switchLabelVariants,
  switchThumbVariants,
  switchTrackVariants,
} from "./switch.variants";

export interface SwitchProps {
  /** Estado marcado/ativo do switch */
  checked?: boolean;
  /** Desabilita interação */
  disabled?: boolean;
  /** Rótulo de texto exibido ao lado do switch */
  label?: string;
  /** Callback disparado quando o valor muda */
  onChange?: (checked: boolean) => void;
  /** id HTML — associa o label ao input */
  id?: string;
  className?: string;
}

export const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
  (
    {
      checked = false,
      disabled = false,
      label,
      onChange,
      id: idProp,
      className,
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = idProp ?? generatedId;

    return (
      <div
        ref={ref}
        className={cn("ds-inline-flex ds-items-center ds-gap-[8px]", className)}
      >
        <button
          type="button"
          id={switchId}
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange?.(!checked)}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onChange?.(!checked);
            }
          }}
          className={cn(
            switchTrackVariants({
              checked: !!checked,
              disabled: !!disabled,
            }),
          )}
        >
          <span
            className={cn(switchThumbVariants({ checked: !!checked }))}
            aria-hidden="true"
          />
        </button>

        {label && (
          <label
            htmlFor={switchId}
            className={cn(switchLabelVariants({ disabled: !!disabled }))}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";

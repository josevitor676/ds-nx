import React, { useId } from 'react';
import { cn } from '../../../lib/utils';
import { FormField } from '../FormField/FormField';
import { inputContainerVariants, inputFieldVariants, inputHelperTextVariants } from './input.variants';

export type InputState = 'default' | 'error' | 'filled' | 'hover';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Estado visual do input (mapeado das variantes do Figma) */
  state?: InputState;
  /** Rótulo exibido acima do campo */
  label?: string;
  /** Texto de apoio abaixo do campo */
  helperText?: string;
  /** Ícone à esquerda */
  leftElement?: React.ReactNode;
  /** Ícone à direita */
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      state = 'default',
      label,
      helperText,
      leftElement,
      rightElement,
      placeholder = 'Digite aqui...',
      disabled,
      id: idProp,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const isDisabled = !!disabled;

    return (
      <FormField
        id={inputId}
        label={label}
        labelClassName="ds-text-[14px] ds-font-regular ds-text-neutral-700 ds-leading-[1.4]"
        helperText={helperText}
        helperTextClassName={inputHelperTextVariants({ state })}
        className={className}
      >
        <div className={inputContainerVariants({ state: isDisabled ? 'disable' : state })}>
          {leftElement && (
            <span className="ds-flex ds-shrink-0 ds-text-neutral-400" aria-hidden>
              {React.isValidElement(leftElement)
                ? React.cloneElement(leftElement as React.ReactElement<{ size?: number; stroke?: number }>, {
                    size: (leftElement as React.ReactElement<{ size?: number }>).props.size ?? 20,
                    stroke: (leftElement as React.ReactElement<{ stroke?: number }>).props.stroke ?? 1.5,
                  })
                : leftElement}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={isDisabled}
            placeholder={placeholder}
            className={cn(inputFieldVariants({ disabled: isDisabled }))}
            {...rest}
          />

          {rightElement && (
            <span className="ds-flex ds-shrink-0 ds-text-neutral-400" aria-hidden>
              {React.isValidElement(rightElement)
                ? React.cloneElement(rightElement as React.ReactElement<{ size?: number; stroke?: number }>, {
                    size: (rightElement as React.ReactElement<{ size?: number }>).props.size ?? 20,
                    stroke: (rightElement as React.ReactElement<{ stroke?: number }>).props.stroke ?? 1.5,
                  })
                : rightElement}
            </span>
          )}
        </div>
      </FormField>
    );
  },
);

Input.displayName = 'Input';

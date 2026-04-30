import React, { useId } from 'react';
import { FormField } from '../FormField/FormField';
import {
  textareaContainerVariants,
  textareaFieldVariants,
  textareaHelperTextVariants,
  textareaLabelVariants,
} from './textarea.variants';

export type TextareaState = 'default' | 'error' | 'filled' | 'hover';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  state?: TextareaState;
  label?: string;
  helperText?: string;
  /** Exibe asterisco de obrigatório ao lado do label */
  mandatory?: boolean;
}


export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      state = 'default',
      label,
      helperText,
      mandatory = false,
      placeholder = 'Digite aqui...',
      disabled,
      id: idProp,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = idProp ?? generatedId;
    const isDisabled = !!disabled;

    return (
      <FormField
        id={textareaId}
        label={label}
        labelClassName={textareaLabelVariants({ state: isDisabled ? 'disable' : state })}
        mandatory={mandatory}
        helperText={helperText}
        helperTextClassName={textareaHelperTextVariants({ state: isDisabled ? 'disable' : state })}
        className={className}
      >
          <div className={textareaContainerVariants({ state: isDisabled ? 'disable' : state })}>
          <textarea
            ref={ref}
            id={textareaId}
            disabled={isDisabled}
            placeholder={placeholder}
            className={textareaFieldVariants({ disabled: isDisabled })}
            {...rest}
          />
        </div>
      </FormField>
    );
  },
);

Textarea.displayName = 'Textarea';

import { type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../../lib/utils';
import { iconButtonVariants } from './iconButton.variants';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactElement;
  isLoading?: boolean;
  'aria-label': string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({
    icon,
    variant,
    colorVariant,
    size,
    isLoading = false,
    disabled,
    className,
    ...rest
  }, ref) => {
    const iconElement = React.isValidElement(icon)
      ? React.cloneElement(
          icon as React.ReactElement<{ width?: number; height?: number; 'aria-hidden'?: boolean }>,
          { width: 20, height: 20, 'aria-hidden': true },
        )
      : icon;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        className={cn(iconButtonVariants({ variant, colorVariant, size }), className)}
        {...rest}
      >
        {isLoading ? (
          <span className="ds-inline-block ds-h-5 ds-w-5 ds-animate-spin ds-rounded-full ds-border-2 ds-border-current ds-border-t-transparent" aria-hidden="true" />
        ) : (
          iconElement
        )}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

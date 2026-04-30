import React from 'react';
import { cn } from '../../../lib/utils';
import { linkButtonVariants } from './linkButton.variants';

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  colorVariant?: 'primary' | 'neutral';
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  disabled?: boolean;
}


export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({
    label,
    colorVariant = 'primary',
    leftIcon,
    rightIcon,
    className,
    disabled = false,
    ...rest
  }, ref) => {
    const { href, onClick, tabIndex, ...otherRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) onClick(e);
    };

    return (
      <a
        ref={ref}
        className={cn(linkButtonVariants({ colorVariant, disabled }), className)}
        href={disabled ? undefined : href}
        onClick={handleClick}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
        {...otherRest}
      >
        {leftIcon && <span className="ds-inline-flex ds-shrink-0" aria-hidden={true}>{leftIcon}</span>}
        {label}
        {rightIcon && <span className="ds-inline-flex ds-shrink-0" aria-hidden={true}>{rightIcon}</span>}
      </a>
    );
  },
);

LinkButton.displayName = 'LinkButton';

import { type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../../lib/utils';
import { dividerVariants } from './divider.variants';

export interface DividerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof dividerVariants> {}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', thickness = 1, color = 600, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(dividerVariants({ orientation, thickness, color }), className)}
      {...props}
      role="separator"
      aria-orientation={orientation ?? 'horizontal'}
    />
  ),
);

Divider.displayName = 'Divider';


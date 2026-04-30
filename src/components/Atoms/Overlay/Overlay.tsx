import React from 'react';
import { cn } from '../../../lib/utils';
import { overlayVariants } from './overlay.variants';

export interface OverlayProps {
  isVisible?: boolean;
  onClick?: () => void;
  zIndex?: number;
  className?: string;
}

export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  ({ isVisible = true, onClick, zIndex = 10, className }, ref) => {
    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        role="presentation"
        onClick={onClick}
        className={cn(overlayVariants(), className)}
        style={{ zIndex }}
      />
    );
  },
);

Overlay.displayName = 'Overlay';

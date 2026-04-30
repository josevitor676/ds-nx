import { type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../../lib/utils";
import {
  tabBadgeVariants,
  tabButtonVariants,
  tabsVariants,
  tabUnderlineVariants,
} from "./tabs.variants";

export type TabItem = {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
};

export interface TabsProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof tabsVariants> {
  tabs: TabItem[];
  activeId?: string;
  onChange?: (id: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      activeId,
      onChange,
      size,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("ds-flex ds-gap-6 ds-items-start", className)}
        {...rest}
        role="tablist"
      >
      {tabs.map((t) => {
        const active = t.id === activeId;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => !t.disabled && onChange?.(t.id)}
            disabled={t.disabled}
            className={cn(
              tabsVariants({ size }),
              tabButtonVariants({ active }),
            )}
          >
            <div className="ds-flex ds-items-center ds-gap-2">
              <span>{t.label}</span>
              {t.badge !== undefined && (
                <span className={tabBadgeVariants({ active })}>
                  {t.badge}
                </span>
              )}
            </div>

            <span className={tabUnderlineVariants({ active })} />
          </button>
        );
      })}
    </div>
    );
  },
);

Tabs.displayName = "Tabs";

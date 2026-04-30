import { IconChevronDown } from "@tabler/icons-react"
import { type VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "../../../lib/utils"
import { Icon } from "../Icon/Icon"
import {
  sideMenuGroupLabelVariants,
  sideMenuItemVariants,
  sideMenuSubItemVariants,
  sideMenuVariants,
} from "./sideMenu.variants"

// ─── Context ──────────────────────────────────────────────────────────────────

interface SideMenuContextValue {
  collapsed: boolean
}

const SideMenuContext = React.createContext<SideMenuContextValue>({
  collapsed: false,
})

const useSideMenu = () => React.useContext(SideMenuContext)

// ─── SideMenu ─────────────────────────────────────────────────────────────────

export interface SideMenuProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "role">, VariantProps<typeof sideMenuVariants> {
  collapsed?: boolean
}

export const SideMenu = React.forwardRef<HTMLElement, SideMenuProps>(
  ({ collapsed = false, className, children, ...props }, ref) => (
    <SideMenuContext.Provider value={{ collapsed }}>
      <nav
        ref={ref}
        aria-label="Side navigation"
        className={cn(sideMenuVariants({ collapsed }), className)}
        {...props}
      >
        {children}
      </nav>
    </SideMenuContext.Provider>
  )
)

SideMenu.displayName = "SideMenu"

// ─── SideMenuGroup ────────────────────────────────────────────────────────────

export interface SideMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

export const SideMenuGroup = React.forwardRef<HTMLDivElement, SideMenuGroupProps>(
  ({ label, className, children, ...props }, ref) => {
    const { collapsed } = useSideMenu()

    return (
      <div ref={ref} className={cn("ds-flex ds-flex-col", className)} {...props}>
        {label && !collapsed && (
          <span className={sideMenuGroupLabelVariants()} aria-hidden="true">
            {label}
          </span>
        )}
        <ul className="ds-flex ds-flex-col ds-gap-0.5 ds-list-none ds-m-0 ds-p-0">{children}</ul>
      </div>
    )
  }
)

SideMenuGroup.displayName = "SideMenuGroup"

// ─── SideMenuItem ─────────────────────────────────────────────────────────────

export interface SideMenuItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "role" | "children"
> {
  label: string
  icon?: React.ReactElement
  active?: boolean
  badge?: string | number
  defaultExpanded?: boolean
  children?: React.ReactNode
}

export const SideMenuItem = React.forwardRef<HTMLButtonElement, SideMenuItemProps>(
  (
    {
      label,
      icon,
      active = false,
      badge,
      disabled,
      className,
      children,
      defaultExpanded = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const { collapsed } = useSideMenu()
    const [expanded, setExpanded] = React.useState(defaultExpanded)
    const hasSubItems = React.Children.count(children) > 0

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (hasSubItems) setExpanded((prev) => !prev)
      onClick?.(e)
    }

    return (
      <li className="ds-flex ds-flex-col ds-gap-0.5">
        <button
          ref={ref}
          type="button"
          aria-current={active ? "page" : undefined}
          aria-expanded={hasSubItems ? expanded : undefined}
          disabled={disabled}
          title={collapsed ? label : undefined}
          className={cn(sideMenuItemVariants({ active, expanded: hasSubItems && expanded, collapsed }), className)}
          onClick={handleClick}
          {...props}
        >
          {icon && (
            <span className="ds-shrink-0 ds-flex ds-items-center ds-justify-center">{icon}</span>
          )}

          {!collapsed && <span className="ds-flex-1 ds-truncate">{label}</span>}

          {!collapsed && badge !== undefined && (
            <span
              className={cn(
                "ds-ml-auto ds-inline-flex ds-items-center ds-justify-center",
                "ds-rounded-full ds-px-2 ds-h-5 ds-min-w-5",
                "ds-text-14 ds-font-semibold",
                active
                  ? "ds-bg-primary-100 ds-text-primary-600"
                  : "ds-bg-neutral-100 ds-text-neutral-600"
              )}
              aria-label={`${badge} notifications`}
            >
              {badge}
            </span>
          )}

          {!collapsed && hasSubItems && (
            <span
              className={cn(
                "ds-shrink-0 ds-transition-transform ds-duration-200",
                expanded && "ds-rotate-180"
              )}
            >
              <Icon icon={IconChevronDown} size="sm" />
            </span>
          )}
        </button>

        {hasSubItems && !collapsed && (
          <ul
            className={cn(
              "ds-overflow-hidden ds-list-none ds-m-0 ds-p-0 ds-flex ds-flex-col ds-gap-0.5",
              "ds-transition-[max-height,opacity] ds-duration-200",
              expanded ? "ds-max-h-[400px] ds-opacity-100" : "ds-max-h-0 ds-opacity-0"
            )}
          >
            {children}
          </ul>
        )}
      </li>
    )
  }
)

SideMenuItem.displayName = "SideMenuItem"

// ─── SideMenuSubItem ──────────────────────────────────────────────────────────

export interface SideMenuSubItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "role"
> {
  label: string
  active?: boolean
}

export const SideMenuSubItem = React.forwardRef<HTMLButtonElement, SideMenuSubItemProps>(
  ({ label, active = false, disabled, className, ...props }, ref) => (
    <li>
      <button
        ref={ref}
        type="button"
        aria-current={active ? "page" : undefined}
        disabled={disabled}
        className={cn(sideMenuSubItemVariants({ active }), className)}
        {...props}
      >
        <span
          className="ds-shrink-0 ds-inline-block ds-w-1 ds-h-1 ds-rounded-full ds-bg-current"
          aria-hidden="true"
        />
        <span className="ds-flex-1 ds-truncate">{label}</span>
      </button>
    </li>
  )
)

SideMenuSubItem.displayName = "SideMenuSubItem"

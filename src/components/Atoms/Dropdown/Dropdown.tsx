import type { Icon as TablerIcon } from "@tabler/icons-react"
import { type VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "../../../lib/utils"
import { Icon } from "../Icon/Icon"
import { dropdownItemVariants, dropdownVariants } from "./dropdown.variants"

// ── DropdownItem ──────────────────────────────────────────────────────────────

export interface DropdownItemProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof dropdownItemVariants> {
  /** Texto exibido no item */
  label: string
  /** Ícone Tabler renderizado antes do label */
  icon?: TablerIcon
  /** Marca o item como selecionado/ativo */
  selected?: boolean
  className?: string
}

export const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ label, icon: IconComp, selected, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        className={cn(dropdownItemVariants({ selected }), className)}
        {...props}
      >
        {IconComp && <Icon icon={IconComp} size="md" className="ds-shrink-0 ds-w-5 ds-h-5" />}
        <span>{label}</span>
      </button>
    )
  }
)

DropdownItem.displayName = "DropdownItem"

// ── Dropdown ──────────────────────────────────────────────────────────────────

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} role="menu" className={cn(dropdownVariants(), className)} {...props}>
        {children}
      </div>
    )
  }
)

Dropdown.displayName = "Dropdown"

import React from "react"
import { cn } from "../../../lib/utils"
import {
  type BreadcrumbState,
  breadcrumbAnchorVariants,
  breadcrumbColorVariants,
  breadcrumbTextVariants,
} from "./breadcrumbItem.variants"

export interface BreadcrumbItemProps {
  label: string
  href?: string
  disabled?: boolean
  className?: string
  iconLeft?: React.ReactNode
  showIcon?: boolean
  showIconRight?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  active?: boolean
}

export const BreadcrumbItem = React.forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  (
    {
      label,
      href,
      disabled = false,
      className,
      iconLeft,
      showIcon = true,
      showIconRight,
      onClick,
      active = false,
    },
    ref
  ) => {
    const isLink = !!href && !disabled
    const isActive = active || !isLink
    const state: BreadcrumbState = disabled ? "disabled" : isActive ? "active" : "link"

    return (
      <a
        ref={ref}
        href={isLink ? href : undefined}
        onClick={(e) => {
          onClick?.(e)
          if (!isLink) e.preventDefault()
        }}
        className={cn(breadcrumbAnchorVariants({ state }), className)}
        aria-current={isActive ? "page" : undefined}
      >
        {showIcon && (
          <span
            className={cn(
              "ds-flex-shrink-0 ds-h-4.5 ds-w-4.5 ds-inline-flex ds-items-center ds-justify-center",
              breadcrumbColorVariants({ state })
            )}
            aria-hidden={true}
          >
            {React.isValidElement(iconLeft)
              ? React.cloneElement(
                  iconLeft as React.ReactElement<{
                    size?: number
                    stroke?: number
                  }>,
                  {
                    size: (iconLeft as React.ReactElement<{ size?: number }>).props.size ?? 18,
                    stroke:
                      (iconLeft as React.ReactElement<{ stroke?: number }>).props.stroke ?? 1.5,
                  }
                )
              : iconLeft}
          </span>
        )}

        <span className={breadcrumbTextVariants({ state })}>{label}</span>

        {(showIconRight ?? state !== "disabled") && (
          <span
            className={cn("ds-flex-shrink-0", breadcrumbColorVariants({ state }))}
            aria-hidden={true}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </a>
    )
  }
)

BreadcrumbItem.displayName = "BreadcrumbItem"

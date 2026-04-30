import type { Icon as TablerIcon } from "@tabler/icons-react"
import { type VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "../../../lib/utils"
import { Icon, type IconProps } from "../Icon/Icon"
import { buttonVariants } from "./button.variants"

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>

const buttonSizeToIconSize: Record<ButtonSize, IconProps["size"]> = {
  sm: "sm",
  md: "sm",
  lg: "md",
}

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  /** Render without the default button variants (useful for custom base components) */
  unstyled?: boolean
  /** Ícone Tabler renderizado antes do label */
  iconStart?: TablerIcon
  /** Ícone Tabler renderizado após o label */
  iconEnd?: TablerIcon
  /** Sobrescreve o tamanho automático dos ícones derivado do `size` do botão */
  iconSize?: IconProps["size"]
  /** Espessura do stroke dos ícones. Padrão: 1.5 */
  iconStroke?: number
  /** Texto do botão — alternativa a children para uso declarativo via args */
  label?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      loading = false,
      variant,
      color,
      size,
      disabled,
      className,
      unstyled = false,
      iconStart,
      iconEnd,
      iconSize,
      iconStroke = 1.5,
      label,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(unstyled ? undefined : buttonVariants({ variant, color, size }), className)}
        {...rest}
      >
        {loading ? (
          <span
            className="ds-inline-block ds-h-4 ds-w-4 ds-animate-spin ds-rounded-full ds-border-2 ds-border-current ds-border-t-transparent"
            aria-hidden="true"
          />
        ) : (
          <>
            {iconStart && (
              <Icon
                icon={iconStart}
                size={iconSize ?? buttonSizeToIconSize[size ?? "md"]}
                stroke={iconStroke}
              />
            )}
            {children ?? label}
            {iconEnd && (
              <Icon
                icon={iconEnd}
                size={iconSize ?? buttonSizeToIconSize[size ?? "md"]}
                stroke={iconStroke}
              />
            )}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

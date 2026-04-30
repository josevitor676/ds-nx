import type { Icon as TablerIcon } from "@tabler/icons-react"
import { IconAlertCircle, IconX } from "@tabler/icons-react"
import { type VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "../../../lib/utils"
import { Button } from "../Button/Button"
import { Icon } from "../Icon/Icon"
import {
  bannerActionButtonVariants,
  bannerActionsVariants,
  bannerCloseButtonVariants,
  bannerContentVariants,
  bannerIconBadgeVariants,
  bannerTextVariants,
  bannerVariants,
} from "./banner.variants"

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, VariantProps<typeof bannerVariants> {
  /** Ícone personalizado exibido no badge esquerdo (padrão: IconAlertCircle) */
  icon?: TablerIcon
  /** Controla a visibilidade do ícone no badge (padrão: true) */
  showIcon?: boolean
  /** Texto do botão de ação opcional. Se omitido, o botão não é renderizado */
  actionLabel?: string
  /** Callback disparado ao clicar no botão de ação */
  onAction?: () => void
  /** Callback disparado ao clicar no botão de fechar. Quando definido, exibe o botão × */
  onClose?: () => void
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      type = "neutral",
      icon: IconProp = IconAlertCircle,
      showIcon = true,
      actionLabel,
      onAction,
      onClose,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} role="alert" className={cn(bannerVariants({ type }), className)} {...props}>
        {/* Área esquerda: badge de ícone + mensagem */}
        <div className={bannerContentVariants()}>
          {showIcon && (
            <span className={cn(bannerIconBadgeVariants({ type }))}>
              <Icon icon={IconProp} size="sm" />
            </span>
          )}
          <p className={cn(bannerTextVariants({ type }))}>{children}</p>
        </div>

        {/* Área direita: botão de ação + botão de fechar */}
        {(actionLabel || onClose) && (
          <div className={bannerActionsVariants()}>
            {actionLabel && (
              <Button unstyled className={bannerActionButtonVariants()} onClick={onAction}>
                {actionLabel}
              </Button>
            )}
            {onClose && (
              <button
                type="button"
                aria-label="Fechar banner"
                onClick={onClose}
                className={bannerCloseButtonVariants()}
              >
                <Icon icon={IconX} size="sm" />
              </button>
            )}
          </div>
        )}
      </div>
    )
  }
)

Banner.displayName = "Banner"

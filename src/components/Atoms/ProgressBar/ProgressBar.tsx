import React from "react"
import { cn } from "../../../lib/utils"
import { IconButton } from "../IconButton/IconButton"
import {
  progressBarLabelVariants,
  progressBarRailVariants,
  progressBarRowVariants,
  progressBarTrackVariants,
  progressBarWrapperVariants,
} from "./progressBar.variants"

export type ProgressBarColor = "primary" | "success" | "error" | "warning"

export interface ProgressBarProps {
  value?: number
  color?: ProgressBarColor
  showLabel?: boolean
  /** Ícone ou botão de ação exibido à direita da barra (ex: botão de deletar) */
  icon?: React.ReactElement
  /** aria-label do IconButton de ação (obrigatório quando icon é fornecido) */
  iconAriaLabel?: string
  className?: string
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { value = 0, color = "primary", showLabel = false, icon, iconAriaLabel = "ação", className },
    ref
  ) => {
    const pct = Math.min(100, Math.max(0, value))

    return (
      <div ref={ref} className={cn(progressBarWrapperVariants(), className)}>
        <div className={progressBarRowVariants()}>
          {showLabel && <div className={progressBarLabelVariants()}>{pct}%</div>}

          <div
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            className={progressBarRailVariants()}
          >
            <div className={progressBarTrackVariants({ color })} style={{ width: `${pct}%` }} />
          </div>

          {icon && (
            <IconButton
              icon={icon}
              aria-label={iconAriaLabel}
              variant="clear"
              colorVariant="neutral"
              size="sm"
            />
          )}
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = "ProgressBar"

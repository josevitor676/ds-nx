import {
  IconAlertCircle,
  IconCircleCheck,
  IconCircleX,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react"
import { type VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "../../../lib/utils"
import { Icon } from "../Icon/Icon"
import type { ToastPosition, ToastType } from "./toast.types"
import {
  toastIconVariants,
  toastSubtitleVariants,
  toastTitleVariants,
  toastVariants,
} from "./toast.variants"

export type { ToastPosition, ToastType }

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id?: string
  title: string
  subTitle?: string
  type?: ToastType
  onClose?: () => void
  className?: string
}

// ── Ícones Tabler por tipo ───────────────────────────────────────────────────

const iconMap = {
  success: IconCircleCheck,
  information: IconInfoCircle,
  warning: IconAlertCircle,
  error: IconCircleX,
} satisfies Record<ToastType, React.ComponentType>

// ── Componente Toast ─────────────────────────────────────────────────────────

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ title, subTitle, type = "information", onClose, className, id }, ref) => (
    <div
      ref={ref}
      role="alert"
      aria-live="polite"
      id={id}
      className={cn(toastVariants({ type }), className)}
    >
      {/* Ícone */}
      <span className={toastIconVariants({ type })}>
        <Icon icon={iconMap[type]} size="md" stroke={2} />
      </span>

      {/* Conteúdo */}
      <div className="ds-flex ds-flex-col ds-gap-[2px] ds-flex-1 ds-min-w-0">
        <p className={toastTitleVariants({ type })}>{title}</p>
        {subTitle && <p className={toastSubtitleVariants({ type })}>{subTitle}</p>}
      </div>

      {/* Botão fechar */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar notificação"
          className="ds-shrink-0 ds-inline-flex ds-items-center ds-justify-center ds-min-w-[24px] ds-min-h-[24px] ds-rounded ds-text-neutral-400 hover:ds-text-neutral-600 ds-transition-colors ds-cursor-pointer"
        >
          <Icon icon={IconX} size="md" stroke={2} />
        </button>
      )}
    </div>
  )
)

Toast.displayName = "Toast"

import * as RadixDialog from "@radix-ui/react-dialog"
import { IconX } from "@tabler/icons-react"
import { type VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "../../../lib/utils"
import { Button } from "../../Atoms/Button/Button"
import { IconButton } from "../../Atoms/IconButton/IconButton"
import { drawerVariants } from "./drawer.variants"

export interface DrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof drawerVariants> {
  /** Controla se o Drawer está aberto */
  open?: boolean
  /** Callback chamado ao fechar o Drawer (clique no overlay, ESC ou botão X) */
  onClose?: () => void
  /** Título exibido no cabeçalho */
  title: string
  /** Conteúdo da área central do Drawer */
  children?: React.ReactNode
  /** Rótulo do botão primário (ação confirmativa) */
  primaryLabel?: string
  /** Rótulo do botão secundário (ação de cancelamento) */
  secondaryLabel?: string
  /** Callback do botão primário */
  onPrimary?: () => void
  /** Callback do botão secundário */
  onSecondary?: () => void
  /** Exibe o rodapé com os botões de ação. Padrão: true */
  showFooter?: boolean
  /** Exibe o botão de fechar (X) no cabeçalho. Padrão: true */
  showCloseButton?: boolean
  className?: string
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      primaryLabel = "Confirmar",
      secondaryLabel = "Cancelar",
      onPrimary,
      onSecondary,
      showFooter = true,
      showCloseButton = true,
      side = "right",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <RadixDialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
        <RadixDialog.Portal>
          <RadixDialog.Overlay className="ds-fixed ds-inset-0 ds-z-50 ds-bg-surface-overlay" />

          <RadixDialog.Content
            ref={ref}
            className={cn(drawerVariants({ side }), className)}
            aria-describedby={undefined}
            data-drawer-side={side ?? "right"}
            {...props}
          >
            {/* Header */}
            <div className="ds-flex ds-items-center ds-gap-4 ds-shrink-0 ds-px-4 ds-py-4">
              <RadixDialog.Title className="ds-m-0 ds-flex-1 ds-text-16 ds-font-semibold ds-leading-20 ds-text-neutral-800">
                {title}
              </RadixDialog.Title>

              {showCloseButton && (
                <RadixDialog.Close asChild>
                  <IconButton
                    aria-label="Fechar drawer"
                    icon={<IconX />}
                    variant="clear"
                    colorVariant="neutral"
                    size="md"
                  />
                </RadixDialog.Close>
              )}
            </div>

            {/* Body */}
            <div className="ds-flex-1 ds-overflow-y-auto ds-px-4 ds-py-4 ds-min-h-0">
              {children}
            </div>

            {/* Footer */}
            {showFooter && (
              <div className="ds-flex ds-flex-col ds-gap-4 ds-shrink-0 ds-px-4 ds-py-4">
                <Button
                  variant="filled"
                  color="primary"
                  size="lg"
                  label={primaryLabel}
                  className="ds-w-full"
                  onClick={() => {
                    onPrimary?.()
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  size="lg"
                  label={secondaryLabel}
                  className="ds-w-full"
                  onClick={() => {
                    onSecondary?.()
                    onClose?.()
                  }}
                />
              </div>
            )}
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    )
  }
)

Drawer.displayName = "Drawer"

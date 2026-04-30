import * as RadixDialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../Atoms/Button/Button";
import { IconButton } from "../../Atoms/IconButton/IconButton";
import { modalVariants } from "./modal.variants";

export interface ModalProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof modalVariants> {
  /** Controla se o modal está aberto */
  open?: boolean;
  /** Callback chamado ao fechar o modal (clique no overlay, ESC ou botão X) */
  onClose?: () => void;
  /** Título exibido no cabeçalho */
  title: string;
  /** Texto de suporte exibido abaixo do título */
  subtitle?: string;
  /** Conteúdo da área central do modal */
  children?: React.ReactNode;
  /** Rótulo do botão de confirmação (ação confirmativa) */
  confirmLabel?: string;
  /** Rótulo do botão de cancelamento (ação de cancelamento) */
  cancelLabel?: string;
  /** Callback do botão de confirmação */
  onConfirm?: () => void;
  /** Callback do botão de cancelamento */
  onCancel?: () => void;
  /** Exibe o botão de fechar (X) no cabeçalho. Padrão: true */
  showCloseButton?: boolean;
  /** Exibe o rodapé com os botões de ação. Padrão: true */
  showFooter?: boolean;
  className?: string;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      subtitle,
      children,
      confirmLabel,
      cancelLabel,
      onConfirm,
      onCancel,
      showCloseButton = true,
      showFooter = true,
      size,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <RadixDialog.Root
        open={open}
        onOpenChange={(isOpen: boolean) => !isOpen && onClose?.()}
      >
        <RadixDialog.Portal>
          <RadixDialog.Overlay className="ds-fixed ds-inset-0 ds-z-50 ds-bg-black/50" />

          <RadixDialog.Content
            ref={ref}
            className={cn(
              "ds-fixed ds-left-1/2 ds-top-1/2 ds-z-50",
              modalVariants({ size }),
              className,
            )}
            style={{ transform: "translate(-50%, -50%)" }}
            {...props}
          >
            <div className="ds-flex ds-flex-col ds-gap-2 ds-p-4">
              <div className="ds-flex ds-items-center ds-gap-4">
                <RadixDialog.Title className="ds-m-0 ds-flex-1 ds-text-base ds-font-semibold ds-text-neutral-800">
                  {title}
                </RadixDialog.Title>

                {showCloseButton && (
                  <RadixDialog.Close asChild>
                    <IconButton
                      aria-label="Fechar modal"
                      icon={<IconX />}
                      variant="clear"
                      colorVariant="neutral"
                      size="md"
                    />
                  </RadixDialog.Close>
                )}
              </div>

              {subtitle && (
                <RadixDialog.Description className="ds-m-0 ds-text-sm ds-font-normal ds-text-neutral-600">
                  {subtitle}
                </RadixDialog.Description>
              )}
            </div>

            {children && (
              <div className="ds-px-4 ds-pb-2 ds-bg-surface-base">
                {children}
              </div>
            )}

            {showFooter && (
              <div className="ds-flex ds-items-center ds-justify-end ds-gap-4 ds-p-4">
                {cancelLabel && (
                  <Button
                    variant="clear"
                    color="neutral"
                    size="lg"
                    onClick={() => {
                      onCancel?.();
                      onClose?.();
                    }}
                    label={cancelLabel}
                  />
                )}
                {confirmLabel && (
                  <Button
                    variant="filled"
                    color="primary"
                    size="lg"
                    onClick={() => {
                      onConfirm?.();
                      onClose?.();
                    }}
                    label={confirmLabel}
                  />
                )}
              </div>
            )}
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    );
  },
);

Modal.displayName = "Modal";

import * as RadixDialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../Atoms/Button/Button";
import { IconButton } from "../../Atoms/IconButton/IconButton";
import { dialogVariants } from "./dialog.variants";

export interface DialogProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof dialogVariants> {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  bodyText?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCloseButton?: boolean;
  showFooter?: boolean;
  icon?: React.ReactElement | null;
  className?: string;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onClose,
      title = "Title",
      bodyText = "Você tem certeza de que deseja continuar com esta ação? Essa operação pode alterar informações importantes do sistema. Caso prossiga, as mudanças serão aplicadas imediatamente e poderão não ser revertidas.",
      confirmLabel = "Sim, continuar",
      cancelLabel = "Cancelar",
      onConfirm,
      onCancel,
      showCloseButton = true,
      showFooter = true,
      type = "web",
      icon = null,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <RadixDialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
        <RadixDialog.Portal>
          <RadixDialog.Overlay className="ds-fixed ds-inset-0 ds-z-50 ds-bg-black/50" />

          <RadixDialog.Content
            ref={ref}
            className={cn(
              "ds-fixed ds-left-1/2 ds-top-1/2 ds-z-50 ds-flex ds-flex-col ds-gap-6 ds-p-4",
              dialogVariants({ type }),
              className,
            )}
            style={{ transform: "translate(-50%, -50%)" }}
            {...props}
          >
            <div className="ds-flex ds-flex-col ds-gap-4 ds-w-full">
              <div className="ds-flex ds-items-center ds-justify-between ds-gap-4 ds-w-full">
                <div className="ds-flex ds-items-center ds-gap-4 ds-flex-1 ds-min-w-0">
                  {icon && <div className="ds-flex ds-items-center ds-justify-center ds-shrink-0">{icon}</div>}
                  <RadixDialog.Title className="ds-m-0 ds-flex-1 ds-text-[18px] ds-leading-[26px] ds-font-semibold ds-text-neutral-800">{title}</RadixDialog.Title>
                </div>

                {showCloseButton && (
                  <RadixDialog.Close asChild>
                    <IconButton aria-label="Fechar dialog" icon={<IconX />} variant="clear" colorVariant="neutral" size="md" />
                  </RadixDialog.Close>
                )}
              </div>

              <RadixDialog.Description className="ds-m-0 ds-text-sm ds-font-normal ds-text-neutral-600">{bodyText}</RadixDialog.Description>
            </div>

            {showFooter && (
              <div className="ds-flex ds-items-center ds-justify-end ds-gap-4 ds-w-full">
                <Button variant="clear" color="neutral" size="lg" onClick={() => { onCancel?.(); onClose?.(); }} label={cancelLabel} />
                <Button variant="filled" color="primary" size="lg" onClick={() => { onConfirm?.(); onClose?.(); }} label={confirmLabel} />
              </div>
            )}
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    );
  },
);

Dialog.displayName = "Dialog";

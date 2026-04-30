import * as RadixTooltip from "@radix-ui/react-tooltip";
import React from "react";
import { cn } from "../../../lib/utils";
import {
  tooltipContentVariants,
  tooltipDescriptionVariants,
  tooltipTitleVariants,
} from "./tooltip.variants";

export interface TooltipProviderProps {
  children: React.ReactNode;
  /** Delay em ms para abrir os tooltips filhos. Padrão: 200 */
  delayDuration?: number;
}

/**
 * Coloque este provider uma única vez, próximo à raiz da aplicação.
 * Todos os <Tooltip> filhos compartilharão o mesmo contexto.
 */
export const TooltipProvider = ({ children, delayDuration = 200 }: TooltipProviderProps) => (
  <RadixTooltip.Provider delayDuration={delayDuration}>
    {children}
  </RadixTooltip.Provider>
);

export type ArrowPosition = "default" | "right-arrow" | "left-arrow" | "top-arrow";

export interface TooltipProps {
  /** Título opcional exibido acima da descrição */
  title?: string;
  /** Texto principal do tooltip */
  description: string;
  /** Posição da seta do tooltip. Padrão: "default" (seta abaixo) */
  arrowPosition?: ArrowPosition;
  children: React.ReactElement;
  /** Delay em ms para abrir o tooltip. Padrão: 200 */
  delayDuration?: number;
  className?: string;
}

const sideMap: Record<ArrowPosition, RadixTooltip.TooltipContentProps["side"]> = {
  "default":     "top",
  "right-arrow": "left",
  "left-arrow":  "right",
  "top-arrow":   "bottom",
};

// Radix TooltipRoot não aceita ref diretamente; ref descartado intencionalmente.
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({
  title,
  description,
  arrowPosition = "default",
  children,
  delayDuration = 200,
  className,
}, _ref) => (
    <RadixTooltip.Root delayDuration={delayDuration}>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>

        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={sideMap[arrowPosition]}
            sideOffset={6}
            className={cn(tooltipContentVariants(), className)}
          >
            {title && (
              <p className={tooltipTitleVariants()}>
                {title}
              </p>
            )}
            <p className={tooltipDescriptionVariants()}>
              {description}
            </p>

            <RadixTooltip.Arrow
              className="ds-fill-primary-900"
              width={10}
              height={5}
            />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
));

Tooltip.displayName = "Tooltip";


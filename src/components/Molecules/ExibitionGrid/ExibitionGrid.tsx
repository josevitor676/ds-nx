import * as RadixPopover from "@radix-ui/react-popover"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { type VariantProps } from "class-variance-authority"
import React, { useState } from "react"
import { cn } from "../../../lib/utils"
import { Icon } from "../../Atoms/Icon/Icon"
import {
  counterCellVariants,
  dropdownItemVariants,
  exibitionGridVariants,
} from "./exibitionGrid.variants"

export interface ExibitionGridProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof exibitionGridVariants> {
  /** Valor atual exibido no seletor (linhas por página) */
  value: number
  /** Total de registros da tabela */
  total: number
  /** Opções disponíveis no dropdown. Padrão: [10, 20, 50, 100] */
  options?: number[]
  /** Callback chamado ao selecionar uma nova opção */
  onChange?: (value: number) => void
}

export const ExibitionGrid = React.forwardRef<HTMLDivElement, ExibitionGridProps>(
  ({ className, value, total, options = [10, 20, 50, 100], onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = (option: number) => {
      onChange?.(option)
      setIsOpen(false)
    }

    const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        handleSelect(options[index])
        return
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault()

        if (options.length === 0) {
          return
        }

        const direction = event.key === "ArrowDown" ? 1 : -1
        const nextIndex = (index + direction + options.length) % options.length
        onChange?.(options[nextIndex])
      }
    }

    return (
      <div ref={ref} className={cn(exibitionGridVariants(), className)} {...props}>
        <span className="ds-text-14 ds-leading-20 ds-font-regular ds-text-neutral-600 ds-whitespace-nowrap">
          Exibindo:
        </span>

        <RadixPopover.Root open={isOpen} onOpenChange={setIsOpen}>
          <RadixPopover.Trigger asChild>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-label={`Exibindo ${value} de ${total} registros. Clique para alterar`}
              className={counterCellVariants({ open: isOpen })}
            >
              <span className="ds-text-14 ds-leading-20 ds-font-medium ds-text-neutral-600 ds-whitespace-nowrap">
                {value}
              </span>
              <Icon
                icon={isOpen ? IconChevronUp : IconChevronDown}
                size="lg"
                strokeWidth={1.5}
                className="ds-text-neutral-600 ds-shrink-0"
                aria-hidden="true"
              />
            </button>
          </RadixPopover.Trigger>

          <RadixPopover.Portal>
            <RadixPopover.Content
              side="bottom"
              align="start"
              sideOffset={6}
              className={cn(
                "ds-flex ds-flex-col ds-min-w-[58px] ds-w-[58px]",
                "ds-bg-white ds-border ds-border-solid ds-border-neutral-100 ds-rounded-sm",
                "ds-px-0.5 ds-py-2 ds-shadow-sm ds-z-50"
              )}
            >
              <ul role="listbox" aria-label="Selecionar quantidade de linhas por página">
                {options.map((option, index) => (
                  <li
                    key={option}
                    role="option"
                    aria-selected={option === value}
                    tabIndex={option === value ? 0 : -1}
                    className={cn(option === value && "ds-bg-neutral-50")}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(option)}
                      onKeyDown={(event) => handleOptionKeyDown(event, index)}
                      className={cn(dropdownItemVariants(), "ds-text-left")}
                      aria-label={`Exibir ${option} linhas por página`}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>

              <RadixPopover.Arrow className="ds-fill-white" width={12} height={6} />
            </RadixPopover.Content>
          </RadixPopover.Portal>
        </RadixPopover.Root>

        <span className="ds-text-14 ds-leading-20 ds-font-regular ds-text-neutral-600 ds-whitespace-nowrap">
          de {total}
        </span>
      </div>
    )
  }
)

ExibitionGrid.displayName = "ExibitionGrid"

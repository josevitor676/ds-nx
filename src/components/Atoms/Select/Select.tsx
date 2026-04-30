import * as RadixSelect from "@radix-ui/react-select"
import { IconCheck, IconChevronDown } from "@tabler/icons-react"
import React, { useId } from "react"
import { cn } from "../../../lib/utils"
import { FormField } from "../FormField/FormField"
import {
  selectContentVariants,
  selectIconVariants,
  selectItemVariants,
  selectTriggerVariants,
  selectValueVariants,
} from "./select.variants"

/** @deprecated O estado 'open' é controlado internamente pelo Radix. Passe apenas 'default' | 'error' | 'filled' | 'hover'. */
export type SelectState = "default" | "error" | "filled" | "hover" | "open"

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  options?: SelectOption[]
  placeholder?: string
  state?: SelectState
  label?: string
  helperText?: string
  onValueChange?: (value: string) => void
  value?: string
  disabled?: boolean
  id?: string
  name?: string
  required?: boolean
  className?: string
  defaultOpen?: boolean
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options = [],
      value,
      placeholder = "Selecione",
      state = "default",
      label,
      helperText,
      id: idProp,
      onValueChange,
      className,
      disabled,
      name,
      required,
      defaultOpen,
    },
    ref
  ) => {
    const generatedId = useId()
    const selectId = idProp ?? generatedId
    const isDisabled = !!disabled
    const isError = state === "error"
    const hasValue = value !== undefined && value !== ""

    return (
      <FormField
        id={selectId}
        label={label}
        labelClassName={cn(
          "ds-text-14 ds-font-regular ds-leading-20",
          isDisabled ? "ds-text-neutral-400" : "ds-text-neutral-600"
        )}
        helperText={helperText}
        helperTextClassName={cn(
          "ds-text-12 ds-font-regular ds-leading-18",
          isError ? "ds-text-error-500" : "ds-text-neutral-600"
        )}
        className={className}
      >
        <RadixSelect.Root
          value={value}
          onValueChange={onValueChange}
          disabled={isDisabled}
          name={name}
          required={required}
          defaultOpen={defaultOpen}
        >
          <RadixSelect.Trigger
            ref={ref}
            id={selectId}
            className={selectTriggerVariants({
              state: isDisabled ? "disable" : isError ? "error" : state,
            })}
          >
            <RadixSelect.Value
              placeholder={placeholder}
              className={selectValueVariants({ filled: hasValue && !isDisabled })}
            />
            <RadixSelect.Icon asChild>
              <span className={selectIconVariants({ disabled: isDisabled })} aria-hidden>
                <IconChevronDown size={20} stroke={1.5} />
              </span>
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              position="popper"
              sideOffset={4}
              className={selectContentVariants()}
            >
              <RadixSelect.Viewport>
                {options.map((opt) => (
                  <RadixSelect.Item
                    key={opt.value}
                    value={opt.value}
                    className={selectItemVariants()}
                  >
                    <RadixSelect.ItemIndicator className="ds-absolute ds-left-[16px] ds-flex ds-items-center ds-justify-center ds-w-[16px] ds-h-[16px] ds-text-primary-500">
                      <IconCheck size={16} stroke={1.5} />
                    </RadixSelect.ItemIndicator>
                    <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </FormField>
    )
  }
)

Select.displayName = "Select"

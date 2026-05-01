import * as RadixPopover from "@radix-ui/react-popover"
import { IconChevronDown } from "@tabler/icons-react"
import React from "react"
import { cn } from "../../../lib/utils"
import { Checkbox } from "../../Atoms/Checkbox/Checkbox"
import { Icon } from "../../Atoms/Icon/Icon"
import { Tag } from "../../Atoms/Tag/Tag"
import {
  multiSelectItemVariants,
  multiSelectListVariants,
  multiSelectTriggerVariants,
} from "./multiSelect.variants"

export interface Option {
  value: string
  label: string
}

export interface MultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: Option[]
  value?: string[]
  onChange?: (values: string[]) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  label?: string
  maxVisibleTags?: number
  mandatory?: boolean
  helpText?: string
  className?: string
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = "Selecione",
      disabled = false,
      error = false,
      label,
      maxVisibleTags = 4,
      mandatory = false,
      helpText,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const labelId = React.useId()
    const helpTextId = React.useId()
    const popupId = React.useId()

    const isSelected = (val: string) => value.includes(val)

    const toggle = (val: string) => {
      if (disabled) return
      const next = isSelected(val) ? value.filter((v) => v !== val) : [...value, val]
      onChange?.(next)
    }

    const visibleTags = value.slice(0, maxVisibleTags)
    const hiddenCount = Math.max(0, value.length - visibleTags.length)

    const triggerState = disabled ? "disabled" : error ? "error" : open ? "open" : "default"

    return (
      <div className="ds-flex ds-flex-col ds-gap-1 ds-w-full">
        {label && (
          <span id={labelId} className="ds-text-sm ds-font-medium ds-text-neutral-700">
            {label}
            {mandatory && (
              <span aria-hidden={true} className="ds-text-error-500">
                {" "}
                *
              </span>
            )}
          </span>
        )}

        <RadixPopover.Root open={open} onOpenChange={(next) => !disabled && setOpen(next)}>
          <RadixPopover.Trigger asChild>
            <div
              ref={ref}
              role="combobox"
              aria-expanded={open}
              aria-disabled={disabled || undefined}
              aria-haspopup="dialog"
              aria-controls={popupId}
              aria-labelledby={label ? labelId : undefined}
              aria-describedby={helpText ? helpTextId : undefined}
              aria-label={label ? undefined : placeholder}
              aria-required={mandatory || undefined}
              aria-invalid={error || undefined}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(event) => {
                if (disabled) return
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  setOpen((prev) => !prev)
                }
                if (event.key === "ArrowDown") {
                  event.preventDefault()
                  setOpen(true)
                }
              }}
              className={cn(multiSelectTriggerVariants({ state: triggerState }), className)}
              {...props}
            >
              <div className="ds-flex ds-items-center ds-gap-2 ds-flex-wrap ds-flex-1 ds-min-w-0">
                {value.length === 0 ? (
                  <span className="ds-text-sm ds-text-neutral-400">{placeholder}</span>
                ) : (
                  <>
                    {visibleTags.map((v) => (
                      <Tag
                        key={v}
                        label={options.find((o) => o.value === v)?.label ?? v}
                        size="small"
                        color="gray"
                        onRemove={disabled ? undefined : () => toggle(v)}
                      />
                    ))}
                    {hiddenCount > 0 && (
                      <span className="ds-text-sm ds-text-neutral-600">+{hiddenCount}</span>
                    )}
                  </>
                )}
              </div>

              <div
                className={cn(
                  "ds-flex ds-items-center ds-shrink-0 ds-ml-2 ds-text-neutral-500 ds-transition-transform ds-duration-200",
                  open && "ds-rotate-180"
                )}
              >
                <Icon icon={IconChevronDown} size="md" />
              </div>
            </div>
          </RadixPopover.Trigger>

          <RadixPopover.Portal>
            <RadixPopover.Content
              id={popupId}
              sideOffset={4}
              align="start"
              style={{ width: "var(--radix-popover-trigger-width)" }}
              className="ds-z-50 ds-bg-surface-base ds-rounded ds-shadow-md ds-border ds-border-solid ds-border-neutral-100 ds-p-1"
            >
              <div
                role="group"
                aria-labelledby={label ? labelId : undefined}
                className={cn(multiSelectListVariants())}
              >
                {options.map((opt) => (
                  <div
                    key={opt.value}
                    className={cn(multiSelectItemVariants())}
                    onClick={(event) => {
                      if (
                        event.target instanceof HTMLElement &&
                        event.target.closest("[data-checkbox-root='true']")
                      ) {
                        return
                      }

                      toggle(opt.value)
                    }}
                  >
                    <div data-checkbox-root="true">
                      <Checkbox
                        label={opt.label}
                        value={isSelected(opt.value) ? "check" : "uncheck"}
                        onChange={() => toggle(opt.value)}
                        disabled={disabled}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </RadixPopover.Content>
          </RadixPopover.Portal>
        </RadixPopover.Root>

        {helpText && (
          <span id={helpTextId} className="ds-text-xs ds-text-neutral-600">
            {helpText}
          </span>
        )}
      </div>
    )
  }
)

MultiSelect.displayName = "MultiSelect"

export default MultiSelect

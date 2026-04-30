import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
} from "@tabler/icons-react"
import React, { useMemo, useState } from "react"
import { cn } from "../../../lib/utils"
import { Icon } from "../Icon/Icon"
import {
  calendarDayVariants,
  calendarPickerButtonVariants,
  calendarPickerItemVariants,
} from "./calendar.variants"

const DEFAULT_WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const DEFAULT_MONTH_SHORT = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
]
const DEFAULT_MONTH_FULL = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function getMonthMatrix(y: number, m: number) {
  const first = new Date(y, m, 1)
  const startDay = first.getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const prevMonthDays = new Date(y, m, 0).getDate()

  const cells: Array<{ date: Date; inMonth: boolean }>[] = []
  let week: Array<{ date: Date; inMonth: boolean }> = []

  for (let i = startDay - 1; i >= 0; i--) {
    week.push({ date: new Date(y, m - 1, prevMonthDays - i), inMonth: false })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    week.push({ date: new Date(y, m, d), inMonth: true })
    if (week.length === 7) {
      cells.push(week)
      week = []
    }
  }

  let nextDay = 1
  while (week.length > 0 && week.length < 7) {
    week.push({ date: new Date(y, m + 1, nextDay++), inMonth: false })
  }
  if (week.length === 7) cells.push(week)

  return cells
}

function isSameDay(a: Date | null, b: Date): boolean {
  if (!a) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export type CalendarView = "days" | "months" | "years"

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  selected?: Date | null
  onSelect?: (date: Date) => void
  /** Month: 0-11 (controlled) */
  month?: number
  /** Year (controlled) */
  year?: number
  onMonthChange?: (month: number) => void
  onYearChange?: (year: number) => void
  /** Override week day labels for i18n. Must have exactly 7 entries starting on Sunday. */
  weekDays?: string[]
  /** Override month short labels for i18n. Must have exactly 12 entries. */
  monthNames?: string[]
  /** Override full month names shown in the month picker list. Must have exactly 12 entries. */
  monthFullNames?: string[]
  /** Initial view (days, months, or years). Defaults to "days". */
  defaultView?: CalendarView
  className?: string
}

// ── Component ─────────────────────────────────────────────────────────────────

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      selected = null,
      onSelect,
      month,
      year,
      onMonthChange,
      onYearChange,
      weekDays = DEFAULT_WEEK_DAYS,
      monthNames = DEFAULT_MONTH_SHORT,
      monthFullNames = DEFAULT_MONTH_FULL,
      defaultView = "days",
      className,
      ...rest
    },
    ref
  ) => {
    const now = new Date()
    const [currentYear, setCurrentYear] = useState<number>(
      typeof year === "number" ? year : now.getFullYear()
    )
    const [currentMonth, setCurrentMonth] = useState<number>(
      typeof month === "number" ? month : now.getMonth()
    )
    const [view, setView] = useState<CalendarView>(defaultView)

    const monthControlled = typeof month === "number"
    const yearControlled = typeof year === "number"

    const displayYear = yearControlled ? (year as number) : currentYear
    const displayMonth = monthControlled ? (month as number) : currentMonth

    const matrix = React.useMemo(
      () => getMonthMatrix(displayYear, displayMonth),
      [displayYear, displayMonth]
    )

    const years = useMemo(
      () => Array.from({ length: 21 }, (_, i) => displayYear - 10 + i),
      [displayYear]
    )

    const changeMonth = (newMonth: number) => {
      let ny = displayYear
      let nm = newMonth
      if (nm < 0) {
        nm = 11
        ny = displayYear - 1
      } else if (nm > 11) {
        nm = 0
        ny = displayYear + 1
      }
      if (!monthControlled) setCurrentMonth(nm)
      if (!yearControlled) setCurrentYear(ny)
      onMonthChange?.(nm)
      if (ny !== displayYear) onYearChange?.(ny)
    }

    const changeYear = (newYear: number) => {
      if (!yearControlled) setCurrentYear(newYear)
      onYearChange?.(newYear)
    }

    const prev = () => changeMonth(displayMonth - 1)
    const next = () => changeMonth(displayMonth + 1)

    const monthBtnState = view === "years" ? "disabled" : view === "months" ? "open" : "idle"
    const yearBtnState = view === "months" ? "disabled" : view === "years" ? "open" : "idle"

    return (
      <div
        ref={ref}
        className={cn(
          "ds-bg-surface-base ds-border ds-border-neutral-100 ds-rounded-md ds-shadow-sm ds-p-4 ds-w-full sm:ds-w-fit",
          (view === "months" || view === "years") && "ds-w-full sm:ds-w-fit ds-overflow-hidden",
          className
        )}
        {...rest}
      >
        {/* ── Header ── */}
        <div className="ds-flex ds-items-center ds-justify-between ds-w-full">
          {/* Left group: prev + month button + next */}
          <div className="ds-flex ds-items-center ds-gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={view !== "days"}
              aria-label="Mês anterior"
              className="ds-flex ds-items-center ds-justify-center ds-h-8 ds-w-8 ds-rounded-sm ds-text-neutral-700 hover:ds-bg-neutral-50 focus-visible:ds-ring-2 focus-visible:ds-ring-primary-500 focus-visible:ds-ring-offset-1 disabled:ds-opacity-30 disabled:ds-pointer-events-none"
            >
              <Icon icon={IconChevronLeft} size="md" />
            </button>

            <button
              type="button"
              aria-label="Selecionar mês"
              aria-expanded={view === "months"}
              onClick={() =>
                monthBtnState !== "disabled" && setView(view === "months" ? "days" : "months")
              }
              className={calendarPickerButtonVariants({ state: monthBtnState })}
            >
              <span className="ds-flex-1 ds-text-left">{monthNames[displayMonth]}</span>
              {view === "months" ? (
                <Icon icon={IconChevronUp} size="sm" />
              ) : (
                <Icon icon={IconChevronDown} size="sm" />
              )}
            </button>

            <button
              type="button"
              onClick={next}
              disabled={view !== "days"}
              aria-label="Próximo mês"
              className="ds-flex ds-items-center ds-justify-center ds-h-8 ds-w-8 ds-rounded-sm ds-text-neutral-700 hover:ds-bg-neutral-50 focus-visible:ds-ring-2 focus-visible:ds-ring-primary-500 focus-visible:ds-ring-offset-1 disabled:ds-opacity-30 disabled:ds-pointer-events-none"
            >
              <Icon icon={IconChevronRight} size="md" />
            </button>
          </div>

          {/* Right: year button */}
          <button
            type="button"
            aria-label="Selecionar ano"
            aria-expanded={view === "years"}
            onClick={() =>
              yearBtnState !== "disabled" && setView(view === "years" ? "days" : "years")
            }
            className={calendarPickerButtonVariants({ state: yearBtnState })}
          >
            <span className="ds-flex-1">{displayYear}</span>
            {view === "years" ? (
              <Icon icon={IconChevronUp} size="sm" />
            ) : (
              <Icon icon={IconChevronDown} size="sm" />
            )}
          </button>
        </div>

        {/* ── Month picker list ── */}
        {view === "months" && (
          <div className="ds-flex ds-flex-col ds-overflow-y-auto ds-h-[283px] ds-pt-4 ds-w-full">
            {monthFullNames.map((name, idx) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  changeMonth(idx)
                  setView("days")
                }}
                className={calendarPickerItemVariants({
                  active: idx === displayMonth,
                })}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {/* ── Year picker list ── */}
        {view === "years" && (
          <div className="ds-flex ds-flex-col ds-overflow-y-auto ds-h-[283px] ds-pt-4 ds-w-full">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => {
                  changeYear(y)
                  setView("days")
                }}
                className={calendarPickerItemVariants({
                  active: y === displayYear,
                })}
              >
                {y}
              </button>
            ))}
          </div>
        )}

        {/* ── Day grid ── */}
        {view === "days" && (
          <div className="ds-flex ds-flex-col ds-items-center ds-pt-4">
            {/* Week day headers */}
            <div className="ds-flex ds-items-center ds-gap-[1px] ds-pb-1 ds-w-full">
              {weekDays.map((d) => (
                <div
                  key={d}
                  className="ds-flex-1 ds-flex ds-items-center ds-justify-center ds-text-12 ds-text-neutral-500"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day rows */}
            <div className="ds-flex ds-flex-col ds-gap-[1px] ds-w-full">
              {matrix.map((week) => (
                <div
                  key={week[0].date.toISOString()}
                  className="ds-flex ds-items-center ds-justify-between ds-w-full"
                >
                  {week.map(({ date, inMonth }) => {
                    const isSelected = isSameDay(selected, date)
                    const isDim = !inMonth

                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => onSelect?.(date)}
                        className={calendarDayVariants({
                          state: isSelected ? "selected" : isDim ? "dim" : "default",
                        })}
                      >
                        {date.getDate()}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

Calendar.displayName = "Calendar"

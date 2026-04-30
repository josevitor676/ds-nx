import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react"
import React, { useMemo, useState } from "react"
import { cn } from "../../../lib/utils"
import { Icon } from "../Icon/Icon"
import {
  drDayVariants,
  drPickerButtonVariants,
  drPickerItemVariants,
} from "./datePickerRange.variants"

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

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

type DayState = "default" | "dim" | "in-range" | "start" | "end" | "start-end"
type PickerView = "days" | "left-months" | "right-months"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DatePickerRangeProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  startDate?: Date | null
  endDate?: Date | null
  onRangeChange?: (start: Date | null, end: Date | null) => void
  /** Left calendar initial month (0-11, controlled) */
  month?: number
  /** Left calendar initial year (controlled) */
  year?: number
  onMonthChange?: (month: number) => void
  onYearChange?: (year: number) => void
  weekDays?: string[]
  monthNames?: string[]
  monthFullNames?: string[]
  className?: string
}

// ── Component ─────────────────────────────────────────────────────────────────

export const DatePickerRange = React.forwardRef<HTMLDivElement, DatePickerRangeProps>(
  (
    {
      startDate = null,
      endDate = null,
      onRangeChange,
      month,
      year,
      onMonthChange,
      onYearChange,
      weekDays = DEFAULT_WEEK_DAYS,
      monthNames = DEFAULT_MONTH_SHORT,
      monthFullNames = DEFAULT_MONTH_FULL,
      className,
      ...rest
    },
    ref
  ) => {
    const now = new Date()
    const [internalMonth, setInternalMonth] = useState(
      typeof month === "number" ? month : now.getMonth()
    )
    const [internalYear, setInternalYear] = useState(
      typeof year === "number" ? year : now.getFullYear()
    )
    const [view, setView] = useState<PickerView>("days")
    const [hoverDate, setHoverDate] = useState<Date | null>(null)
    const [phase, setPhase] = useState<"start" | "end">("start")

    const isMonthControlled = typeof month === "number"
    const isYearControlled = typeof year === "number"

    const leftMonth = isMonthControlled ? (month as number) : internalMonth
    const leftYear = isYearControlled ? (year as number) : internalYear

    // Right calendar always shows the next month
    const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1
    const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear

    const leftMatrix = useMemo(() => getMonthMatrix(leftYear, leftMonth), [leftYear, leftMonth])
    const rightMatrix = useMemo(
      () => getMonthMatrix(rightYear, rightMonth),
      [rightYear, rightMonth]
    )

    const navigate = (delta: number) => {
      let nm = leftMonth + delta
      let ny = leftYear
      if (nm < 0) {
        nm = 11
        ny--
      } else if (nm > 11) {
        nm = 0
        ny++
      }
      if (!isMonthControlled) setInternalMonth(nm)
      if (!isYearControlled) setInternalYear(ny)
      onMonthChange?.(nm)
      if (ny !== leftYear) onYearChange?.(ny)
    }

    const setLeftMonth = (m: number) => {
      if (!isMonthControlled) setInternalMonth(m)
      onMonthChange?.(m)
      setView("days")
    }

    const setRightMonthByIndex = (m: number) => {
      // Adjust left month so that right month = m
      const nm = m === 0 ? 11 : m - 1
      const ny = m === 0 ? leftYear - 1 : leftYear
      if (!isMonthControlled) setInternalMonth(nm)
      if (!isYearControlled) setInternalYear(ny)
      onMonthChange?.(nm)
      if (ny !== leftYear) onYearChange?.(ny)
      setView("days")
    }

    const handleDayClick = (date: Date) => {
      if (phase === "start") {
        onRangeChange?.(date, null)
        setPhase("end")
        setHoverDate(null)
      } else {
        if (!startDate || date < startDate) {
          onRangeChange?.(date, startDate)
        } else {
          onRangeChange?.(startDate, date)
        }
        setPhase("start")
        setHoverDate(null)
      }
    }

    const getDayState = (date: Date, inMonth: boolean): DayState => {
      if (!inMonth) return "dim"

      const s = startDate
      const e = phase === "end" && !endDate ? hoverDate : endDate

      const lo = s && e ? (s <= e ? s : e) : s
      const hi = s && e ? (s <= e ? e : s) : null

      if (isSameDay(date, lo) && isSameDay(date, hi)) return "start-end"
      if (isSameDay(date, lo)) return "start"
      if (isSameDay(date, hi)) return "end"
      if (lo && hi && date > lo && date < hi) return "in-range"
      return "default"
    }

    const leftBtnState =
      view === "right-months" ? "disabled" : view === "left-months" ? "open" : "idle"
    const rightBtnState =
      view === "left-months" ? "disabled" : view === "right-months" ? "open" : "idle"

    const navBtnClass =
      "ds-flex ds-items-center ds-justify-center ds-h-8 ds-w-8 ds-rounded-sm ds-text-neutral-700 hover:ds-bg-neutral-50 focus-visible:ds-outline-none focus-visible:ds-ring-2 focus-visible:ds-ring-primary-500 focus-visible:ds-ring-offset-1"

    const renderWeekHeader = () => (
      <div className="ds-flex ds-items-center ds-gap-[1px] ds-pb-1 ds-w-full">
        {weekDays.map((d) => (
          <div
            key={d}
            className="ds-flex-1 ds-flex ds-items-center ds-justify-center ds-text-xs ds-text-neutral-500"
          >
            {d}
          </div>
        ))}
      </div>
    )

    const renderDayGrid = (matrix: ReturnType<typeof getMonthMatrix>) => (
      <div className="ds-flex ds-flex-col ds-pt-4 ds-w-full">
        {renderWeekHeader()}
        <div className="ds-flex ds-flex-col ds-gap-[1px] ds-w-full">
          {matrix.map((week) => (
            <div
              key={week[0].date.toISOString()}
              className="ds-flex ds-items-center ds-justify-between ds-w-full"
            >
              {week.map(({ date, inMonth }) => (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => handleDayClick(date)}
                  onMouseEnter={() => phase === "end" && setHoverDate(date)}
                  onMouseLeave={() => phase === "end" && setHoverDate(null)}
                  className={drDayVariants({ state: getDayState(date, inMonth) })}
                >
                  {date.getDate()}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    )

    const renderMonthPicker = (currentMonth: number, onSelect: (m: number) => void) => (
      <div className="ds-flex ds-flex-col ds-overflow-y-auto ds-h-64 ds-pt-4 ds-w-full">
        {monthFullNames.map((name, idx) => (
          <button
            key={name}
            type="button"
            onClick={() => onSelect(idx)}
            className={drPickerItemVariants({ active: idx === currentMonth })}
          >
            {name}
          </button>
        ))}
      </div>
    )

    return (
      <div
        ref={ref}
        className={cn(
          "ds-bg-surface-base ds-border ds-border-neutral-200 ds-rounded-md ds-shadow-sm ds-p-4 ds-w-full sm:ds-w-fit",
          className
        )}
        {...rest}
      >
        {/* ── Header ── */}
        <div className="ds-flex ds-flex-col sm:ds-flex-row sm:ds-items-center sm:ds-justify-between ds-gap-2">
          {/* Left: prev-year, prev-month, left month button */}
          <div className="ds-flex ds-items-center ds-gap-2">
            <button
              type="button"
              onClick={() => navigate(-12)}
              aria-label="Ano anterior"
              className={navBtnClass}
            >
              <Icon icon={IconChevronsLeft} size="md" />
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Mês anterior"
              className={navBtnClass}
            >
              <Icon icon={IconChevronLeft} size="md" />
            </button>
            <button
              type="button"
              aria-label="Selecionar mês esquerdo"
              aria-expanded={view === "left-months"}
              onClick={() =>
                leftBtnState !== "disabled" &&
                setView(view === "left-months" ? "days" : "left-months")
              }
              className={drPickerButtonVariants({ state: leftBtnState })}
            >
              <span className="ds-flex-1 ds-text-left ds-whitespace-nowrap">
                {monthNames[leftMonth]} {leftYear}
              </span>
              {view === "left-months" ? (
                <Icon icon={IconChevronUp} size="sm" />
              ) : (
                <Icon icon={IconChevronDown} size="sm" />
              )}
            </button>
          </div>

          {/* Right: right month button, next-month, next-year */}
          <div className="ds-flex ds-items-center ds-gap-2">
            <button
              type="button"
              aria-label="Selecionar mês direito"
              aria-expanded={view === "right-months"}
              onClick={() =>
                rightBtnState !== "disabled" &&
                setView(view === "right-months" ? "days" : "right-months")
              }
              className={drPickerButtonVariants({ state: rightBtnState })}
            >
              <span className="ds-flex-1 ds-text-left ds-whitespace-nowrap">
                {monthNames[rightMonth]} {rightYear}
              </span>
              {view === "right-months" ? (
                <Icon icon={IconChevronUp} size="sm" />
              ) : (
                <Icon icon={IconChevronDown} size="sm" />
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              aria-label="Próximo mês"
              className={navBtnClass}
            >
              <Icon icon={IconChevronRight} size="md" />
            </button>
            <button
              type="button"
              onClick={() => navigate(12)}
              aria-label="Próximo ano"
              className={navBtnClass}
            >
              <Icon icon={IconChevronsRight} size="md" />
            </button>
          </div>
        </div>

        {/* ── Calendars ── */}
        <div className="ds-flex ds-flex-col sm:ds-flex-row ds-gap-4 sm:ds-gap-20">
          {/* Left panel */}
          <div className="ds-w-full sm:ds-w-72">
            {view === "left-months"
              ? renderMonthPicker(leftMonth, setLeftMonth)
              : renderDayGrid(leftMatrix)}
          </div>

          {/* Right panel */}
          <div className="ds-w-full sm:ds-w-72">
            {view === "right-months"
              ? renderMonthPicker(rightMonth, setRightMonthByIndex)
              : renderDayGrid(rightMatrix)}
          </div>
        </div>
      </div>
    )
  }
)

DatePickerRange.displayName = "DatePickerRange"

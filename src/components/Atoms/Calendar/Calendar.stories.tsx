import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import type { CalendarProps } from "./Calendar"
import { Calendar } from "./Calendar"

const WithSelectionDemo = (args: Partial<CalendarProps>) => {
  const [selected, setSelected] = useState<Date | null>(new Date())
  return (
    <Calendar {...(args as CalendarProps)} selected={selected} onSelect={(d) => setSelected(d)} />
  )
}

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    defaultView: {
      control: "select",
      options: ["days", "months", "years"],
      description: "View inicial do calendário",
    },
    selected: { control: false },
    onSelect: { action: "onSelect" },
    onMonthChange: { action: "onMonthChange" },
    onYearChange: { action: "onYearChange" },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

// ── type=default ──────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "type=default",
  args: {},
}

export const WithSelection: Story = {
  name: "Default — Com seleção",
  render: (args) => <WithSelectionDemo {...args} />,
}

export const February2026: Story = {
  name: "Default — Fevereiro 2026",
  render: (args) => <Calendar {...(args as CalendarProps)} month={1} year={2026} />,
}

// ── type=month ────────────────────────────────────────────────────────────────

export const MonthPickerOpen: Story = {
  name: "type=month",
  args: {
    defaultView: "months",
    month: 1,
    year: 2026,
  },
}

// ── type=year ─────────────────────────────────────────────────────────────────

export const YearPickerOpen: Story = {
  name: "type=year",
  args: {
    defaultView: "years",
    month: 1,
    year: 2026,
  },
}

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ExibitionGrid } from "./ExibitionGrid"

const meta: Meta<typeof ExibitionGrid> = {
  title: "Components/ExibitionGrid",
  component: ExibitionGrid,
  argTypes: {
    value: { control: "number" },
    total: { control: "number" },
    options: { control: false },
    onChange: { action: "changed" },
  },
}

export default meta
type Story = StoryObj<typeof ExibitionGrid>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? 10)
    return <ExibitionGrid {...args} value={value} onChange={setValue} />
  },
  args: {
    value: 10,
    total: 50,
  },
}

export const CustomOptions: Story = {
  args: {
    value: 20,
    total: 200,
    options: [10, 20, 50, 100],
  },
}

export const LargeTotal: Story = {
  name: "Total Grande",
  args: {
    value: 50,
    total: 1000,
    options: [10, 20, 50, 100],
  },
}

export const Interactive: Story = {
  name: "Interativo",
  render: () => {
    const [value, setValue] = useState(10)
    return (
      <ExibitionGrid value={value} total={100} options={[10, 20, 50, 100]} onChange={setValue} />
    )
  },
}

export const Open: Story = {
  name: "Dropdown Aberto",
  render: () => {
    const [value, setValue] = useState(10)
    return (
      <div className="ds-pb-40">
        <ExibitionGrid value={value} total={50} options={[10, 20, 50, 100]} onChange={setValue} />
      </div>
    )
  },
}

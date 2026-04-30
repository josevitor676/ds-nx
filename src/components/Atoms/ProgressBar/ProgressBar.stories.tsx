import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { Button } from "../Button/Button"
import { ProgressBar } from "./ProgressBar"

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    color: { control: "select", options: ["primary", "success", "error", "warning"] },
    showLabel: { control: "boolean" },
    icon: { control: false },
  },
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = { args: { value: 60, color: "primary" } }
export const WithLabel: Story = { args: { value: 75, color: "primary", showLabel: true } }
export const Success: Story = { args: { value: 100, color: "success", showLabel: true } }
export const Error: Story = { args: { value: 30, color: "error", showLabel: true } }
export const WithIcon: Story = {
  args: { value: 60, color: "primary", showLabel: true, icon: <IconTrash size={16} /> },
}
export const AllColors: Story = {
  render: () => (
    <div className="ds-flex ds-flex-col ds-gap-3 ds-w-64">
      <ProgressBar value={70} color="primary" showLabel icon={<IconTrash size={16} />} />
      <ProgressBar value={100} color="success" showLabel icon={<IconTrash size={16} />} />
      <ProgressBar value={30} color="error" showLabel icon={<IconTrash size={16} />} />
      <ProgressBar value={50} color="warning" showLabel icon={<IconTrash size={16} />} />
    </div>
  ),
}

const ProgressExample = () => {
  const [value, setValue] = useState(25)

  return (
    <div>
      <div className="ds-space-y-4">
        <ProgressBar value={value} showLabel color="primary" />

        <div className="ds-flex ds-gap-3">
          <Button variant="outlined" onClick={() => setValue((v) => Math.max(0, v - 10))}>
            -10
          </Button>
          <Button variant="filled" onClick={() => setValue((v) => Math.min(100, v + 10))}>
            +10
          </Button>
          <Button variant="clear" onClick={() => setValue(0)}>
            Zerar
          </Button>
        </div>
      </div>

      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded">
        <h3 className="ds-text-base ds-font-semibold ds-mb-2">Progresso atual: {value}%</h3>
        <p className="ds-text-sm ds-text-neutral-700">
          Use os botões para alterar o valor da barra.
        </p>
      </div>
    </div>
  )
}

export const Example: Story = {
  render: () => <ProgressExample />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { Button } from '../Button/Button';

function ProgressExample() {
  const [value, setValue] = useState(25);
  return (
    <div>
      <ProgressBar value={value} showLabel color="primary" />
      <Button label="-10" variant="outlined" onClick={() => setValue((v) => Math.max(0, v - 10))} />
      <Button label="+10" variant="filled" onClick={() => setValue((v) => Math.min(100, v + 10))} />
      <Button label="Zerar" variant="clear" onClick={() => setValue(0)} />
    </div>
  );
}

export default ProgressExample;`,
      },
    },
  },
}

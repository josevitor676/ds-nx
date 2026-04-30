import type { Meta, StoryObj } from "@storybook/react-vite"
import { PieChart } from "./PieChart"

const meta: Meta<typeof PieChart> = {
  title: "Components/Charts/PieChart",
  component: PieChart,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showLegend: { control: "boolean" },
    showTooltip: { control: "boolean" },
    innerRadius: { control: "number" },
    outerRadius: { control: "number" },
    data: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof PieChart>

const sampleData = [
  { name: "Categoria A", value: 400 },
  { name: "Categoria B", value: 300 },
  { name: "Categoria C", value: 300 },
  { name: "Categoria D", value: 200 },
  { name: "Categoria E", value: 150 },
  { name: "Categoria F", value: 100 },
  { name: "Categoria G", value: 80 },
]

export const Default: Story = {
  name: "Padrão",
  args: {
    data: sampleData,
    showTooltip: true,
    size: "md",
  },
}

export const WithLegend: Story = {
  name: "Com legenda",
  args: {
    data: sampleData,
    showLegend: true,
    showTooltip: true,
    size: "md",
  },
}

export const Donut: Story = {
  name: "Rosca",
  args: {
    data: sampleData,
    innerRadius: 60,
    showTooltip: true,
    size: "md",
  },
}

export const DonutWithLegend: Story = {
  name: "Rosca com legenda",
  args: {
    data: sampleData,
    innerRadius: 60,
    showLegend: true,
    showTooltip: true,
    size: "lg",
  },
}

export const CustomColors: Story = {
  name: "Cores customizadas",
  args: {
    data: [
      { name: "Principal", value: 400, color: "var(--ds-color-primary-500)" },
      { name: "Sucesso", value: 300, color: "var(--ds-color-success-400)" },
      { name: "Alerta", value: 200, color: "var(--ds-color-warning-500)" },
      { name: "Erro", value: 100, color: "var(--ds-color-error-400)" },
    ],
    showLegend: true,
    showTooltip: true,
    size: "md",
  },
}

export const Small: Story = {
  name: "Pequeno",
  args: {
    data: sampleData,
    size: "sm",
  },
}

export const Large: Story = {
  name: "Grande",
  args: {
    data: sampleData,
    size: "lg",
  },
}

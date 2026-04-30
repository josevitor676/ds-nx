import type { Meta, StoryObj } from "@storybook/react-vite"
import { BarChart } from "./BarChart"

const meta: Meta<typeof BarChart> = {
  title: "Components/Charts/BarChart",
  component: BarChart,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    showTooltip: { control: "boolean" },
    data: { control: false },
    bars: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof BarChart>

const sampleData = [
  { name: "Jan", vendas: 400, despesas: 240 },
  { name: "Fev", vendas: 300, despesas: 139 },
  { name: "Mar", vendas: 600, despesas: 380 },
  { name: "Abr", vendas: 800, despesas: 430 },
  { name: "Mai", vendas: 500, despesas: 290 },
  { name: "Jun", vendas: 900, despesas: 500 },
]

const multiSeriesData = [
  { name: "Jan", vendas: 400, despesas: 240, lucro: 160, meta: 350, investimento: 200 },
  { name: "Fev", vendas: 300, despesas: 139, lucro: 161, meta: 320, investimento: 180 },
  { name: "Mar", vendas: 600, despesas: 380, lucro: 220, meta: 550, investimento: 300 },
  { name: "Abr", vendas: 800, despesas: 430, lucro: 370, meta: 750, investimento: 400 },
  { name: "Mai", vendas: 500, despesas: 290, lucro: 210, meta: 480, investimento: 260 },
  { name: "Jun", vendas: 900, despesas: 500, lucro: 400, meta: 850, investimento: 450 },
  { name: "Jul", vendas: 700, despesas: 350, lucro: 350, meta: 650, investimento: 350 },
  { name: "Ago", vendas: 650, despesas: 300, lucro: 350, meta: 600, investimento: 300 },
  { name: "Set", vendas: 750, despesas: 400, lucro: 350, meta: 700, investimento: 350 },
  { name: "Out", vendas: 850, despesas: 450, lucro: 400, meta: 800, investimento: 400 },
  { name: "Nov", vendas: 800, despesas: 420, lucro: 380, meta: 750, investimento: 380 },
  { name: "Dez", vendas: 950, despesas: 500, lucro: 450, meta: 900, investimento: 450 },
]

export const Padrao: Story = {
  name: "Padrão",
  args: {
    data: sampleData,
    bars: [{ dataKey: "vendas", label: "Vendas" }],
    xAxisKey: "name",
    showGrid: true,
    showTooltip: true,
    size: "md",
  },
}

export const MultipleBars: Story = {
  name: "Múltiplas séries",
  args: {
    data: sampleData,
    bars: [
      { dataKey: "vendas", label: "Vendas" },
      { dataKey: "despesas", label: "Despesas" },
    ],
    xAxisKey: "name",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    size: "md",
  },
}

export const WithoutGrid: Story = {
  name: "Sem grade",
  args: {
    data: sampleData,
    bars: [{ dataKey: "vendas", label: "Vendas" }],
    xAxisKey: "name",
    showGrid: false,
    showTooltip: true,
    size: "md",
  },
}

export const Small: Story = {
  name: "Pequeno",
  args: {
    data: sampleData,
    bars: [{ dataKey: "vendas", label: "Vendas" }],
    xAxisKey: "name",
    size: "sm",
  },
}

export const Large: Story = {
  name: "Grande",
  args: {
    data: sampleData,
    bars: [{ dataKey: "vendas", label: "Vendas" }],
    xAxisKey: "name",
    size: "lg",
  },
}

export const CustomHeight: Story = {
  name: "Altura customizada",
  args: {
    data: sampleData,
    bars: [{ dataKey: "vendas", label: "Vendas" }],
    xAxisKey: "name",
    height: 400,
  },
}

export const FourSeries: Story = {
  name: "Quatro séries",
  args: {
    data: multiSeriesData,
    bars: [
      { dataKey: "vendas", label: "Vendas" },
      { dataKey: "despesas", label: "Despesas" },
      { dataKey: "lucro", label: "Lucro" },
      { dataKey: "meta", label: "Meta" },
    ],
    xAxisKey: "name",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    size: "md",
  },
}

export const FiveSeries: Story = {
  name: "Cinco séries",
  args: {
    data: multiSeriesData,
    bars: [
      { dataKey: "vendas", label: "Vendas" },
      { dataKey: "despesas", label: "Despesas" },
      { dataKey: "lucro", label: "Lucro" },
      { dataKey: "meta", label: "Meta" },
      { dataKey: "investimento", label: "Investimento" },
    ],
    xAxisKey: "name",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    size: "lg",
  },
}

export const WithScroll: Story = {
  name: "Com scroll horizontal",
  args: {
    data: multiSeriesData,
    bars: [
      { dataKey: "vendas", label: "Vendas" },
      { dataKey: "despesas", label: "Despesas" },
      { dataKey: "lucro", label: "Lucro" },
      { dataKey: "meta", label: "Meta" },
    ],
    xAxisKey: "name",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    size: "md",
  },
  render: (args) => (
    <div className="ds-overflow-x-auto ds-border ds-border-neutral-100 ds-rounded-sm ds-p-4">
      <div className="ds-min-w-[900px]">
        <BarChart {...args} />
      </div>
    </div>
  ),
}

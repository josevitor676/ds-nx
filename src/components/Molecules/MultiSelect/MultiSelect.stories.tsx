import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { MultiSelect } from "./MultiSelect"

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placeholder: {
      description: "Texto exibido quando nenhuma opção está selecionada.",
      control: "text",
      table: { defaultValue: { summary: "Selecione" } },
    },
    maxVisibleTags: {
      description: "Número máximo de tags visíveis no trigger. Excedentes são agrupados em `+N`.",
      control: "number",
      table: { defaultValue: { summary: "4" } },
    },
    disabled: {
      description: "Desabilita o componente, bloqueando interações.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    error: {
      description: "Aplica estado de erro com borda vermelha.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    mandatory: {
      description: "Indica campo obrigatório com asterisco (*) ao lado do label.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    label: {
      description: "Rótulo exibido acima do campo.",
      control: "text",
    },
    helpText: {
      description: "Texto auxiliar exibido abaixo do campo.",
      control: "text",
    },
  },
}

export default meta
type Story = StoryObj<typeof MultiSelect>

const opcoes = Array.from({ length: 10 }).map((_, i) => ({
  value: String(i + 1),
  label: `Opção ${i + 1}`,
}))

export const Default: Story = {
  render: () => {
    const [vals, setVals] = useState<string[]>([])
    return <MultiSelect label="Categoria" options={opcoes} value={vals} onChange={setVals} />
  },
}

export const WithSelection: Story = {
  name: "Com seleção",
  render: () => {
    const [vals, setVals] = useState<string[]>(["1", "2"])
    return <MultiSelect label="Categoria" options={opcoes} value={vals} onChange={setVals} />
  },
}

export const ManySelected: Story = {
  name: "Muitas seleções (+N)",
  render: () => {
    const [vals, setVals] = useState<string[]>(["1", "2", "3", "4", "5", "6"])
    return (
      <MultiSelect
        label="Categoria"
        options={opcoes}
        value={vals}
        onChange={setVals}
        maxVisibleTags={4}
      />
    )
  },
}

export const Mandatory: Story = {
  name: "Obrigatório",
  render: () => {
    const [vals, setVals] = useState<string[]>([])
    return (
      <MultiSelect label="Categoria" options={opcoes} value={vals} onChange={setVals} mandatory />
    )
  },
}

export const WithHelpText: Story = {
  name: "Com texto de ajuda",
  render: () => {
    const [vals, setVals] = useState<string[]>([])
    return (
      <MultiSelect
        label="Categoria"
        options={opcoes}
        value={vals}
        onChange={setVals}
        helpText="Selecione uma ou mais opções."
      />
    )
  },
}

export const WithError: Story = {
  name: "Estado de erro",
  render: () => {
    const [vals, setVals] = useState<string[]>([])
    return (
      <MultiSelect
        label="Categoria"
        options={opcoes}
        value={vals}
        onChange={setVals}
        error
        helpText="Selecione ao menos uma opção."
      />
    )
  },
}

export const Disabled: Story = {
  render: () => <MultiSelect label="Categoria" options={opcoes} value={["1", "2"]} disabled />,
}

const FiltroExample = () => {
  const categorias = [
    { value: "eletronicos", label: "Eletrônicos" },
    { value: "vestuario", label: "Vestuário" },
    { value: "alimentos", label: "Alimentos" },
    { value: "moveis", label: "Móveis" },
    { value: "esportes", label: "Esportes" },
  ]
  const regioes = [
    { value: "sul", label: "Sul" },
    { value: "sudeste", label: "Sudeste" },
    { value: "norte", label: "Norte" },
    { value: "nordeste", label: "Nordeste" },
    { value: "centro-oeste", label: "Centro-Oeste" },
  ]

  const [cats, setCats] = useState<string[]>([])
  const [regs, setRegs] = useState<string[]>([])

  return (
    <div className="ds-w-[600px]">
      <div className="ds-flex ds-gap-4 ds-items-end ds-flex-wrap">
        <div className="ds-flex-1 ds-min-w-50">
          <MultiSelect
            label="Categorias"
            options={categorias}
            value={cats}
            onChange={setCats}
            placeholder="Todas as categorias"
            helpText="Filtre por uma ou mais categorias."
          />
        </div>
        <div className="ds-flex-1 ds-min-w-50">
          <MultiSelect
            label="Regiões"
            options={regioes}
            value={regs}
            onChange={setRegs}
            placeholder="Todas as regiões"
          />
        </div>
      </div>

      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded-sm">
        <h3 className="ds-text-16 ds-font-semibold ds-mb-3 ds-text-neutral-700">Filtros ativos</h3>
        <div className="ds-flex ds-flex-col ds-gap-2 ds-text-14">
          <div className="ds-flex ds-gap-2">
            <span className="ds-text-neutral-400 ds-w-24">Categorias:</span>
            <span className="ds-text-neutral-600 ds-font-medium">
              {cats.length
                ? cats.map((v) => categorias.find((c) => c.value === v)?.label).join(", ")
                : "—"}
            </span>
          </div>
          <div className="ds-flex ds-gap-2">
            <span className="ds-text-neutral-400 ds-w-24">Regiões:</span>
            <span className="ds-text-neutral-600 ds-font-medium">
              {regs.length
                ? regs.map((v) => regioes.find((r) => r.value === v)?.label).join(", ")
                : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Example: Story = {
  render: () => <FiltroExample />,
  parameters: {
    docs: {
      source: {
        code: `import { useState } from 'react';
import { MultiSelect } from '@ds/components';

const categorias = [
  { value: 'eletronicos', label: 'Eletrônicos' },
  { value: 'vestuario', label: 'Vestuário' },
];

function FiltroExample() {
  const [cats, setCats] = useState<string[]>([]);

  return (
    <MultiSelect
      label="Categorias"
      options={categorias}
      value={cats}
      onChange={setCats}
      placeholder="Todas as categorias"
      helpText="Filtre por uma ou mais categorias."
    />
  );
}`,
      },
    },
  },
}

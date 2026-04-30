import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Select } from "./Select"

const OPTIONS = [
  { label: "Opção 1", value: "1" },
  { label: "Opção 2", value: "2" },
  { label: "Opção 3", value: "3" },
]

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    state: {
      description: "Estado visual do campo.",
      control: "select",
      options: ["default", "hover", "filled", "error", "open"],
      table: {
        type: { summary: "'default' | 'hover' | 'filled' | 'error' | 'open'" },
        defaultValue: { summary: "default" },
      },
    },
    options: {
      description: "Lista de opções disponíveis para seleção.",
      table: { type: { summary: "SelectOption[]" }, defaultValue: { summary: "[]" } },
    },
    placeholder: {
      description: "Texto exibido quando nenhuma opção está selecionada.",
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: "Selecione" } },
    },
    label: {
      description: "Rótulo exibido acima do campo.",
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: "undefined" } },
    },
    helperText: {
      description:
        "Texto auxiliar exibido abaixo do campo. Use para mensagens de erro ou instrução.",
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: "undefined" } },
    },
    value: {
      description: "Valor selecionado (controlado).",
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: "undefined" } },
    },
    onValueChange: {
      description: "Callback chamado com o valor da opção quando o usuário faz uma seleção.",
      table: { type: { summary: "(value: string) => void" } },
    },
    disabled: {
      description: "Desabilita o campo e aplica estilos de estado inativo.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
O **Single Select** permite que os usuários escolham uma única opção de uma lista pré-definida. É a solução ideal para formulários onde o espaço é limitado e a lista de opções é extensa.

---

### ✅ Quando usar

- **Seleção Única em Listas Longas** — quando você tem entre 5 e 50 opções (ex: selecionar um Estado ou uma Categoria).
- **Economia de Espaço** — quando usar um **Radio Group** ocuparia muito espaço vertical na tela.
- **Filtros de Tabela** — para filtrar dados por um critério específico (ex: Status: "Ativo", "Inativo").

### ❌ Quando não usar

- **Poucas Opções (< 4)** — se houver apenas 2 ou 3 opções, o **Radio Group** é mais eficiente, pois exige um clique a menos do usuário.
- **Múltiplas Escolhas** — se o usuário puder marcar mais de um item, use o **Multi-select**.
- **Seleção de Data** — para datas, utilize um **Date Picker** dedicado para garantir a formatação correta.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

// — Estados individuais —
export const Default: Story = {
  args: { label: "Label", options: OPTIONS, placeholder: "Selecione", state: "default" },
  parameters: { docs: { description: { story: "Estado padrão, sem interação." } } },
}
export const Hover: Story = {
  args: { label: "Label", options: OPTIONS, placeholder: "Selecione", state: "hover" },
  parameters: {
    docs: { description: { story: "Estado com cursor sobre o campo — borda em `neutral-600`." } },
  },
}
export const Filled: Story = {
  args: { label: "Label", options: OPTIONS, value: "1", state: "filled" },
  parameters: {
    docs: {
      description: { story: "Estado preenchido — o valor selecionado é exibido em `font-medium`." },
    },
  },
}
export const Open: Story = {
  args: { label: "Label", options: OPTIONS, placeholder: "Selecione", state: "open" },
  parameters: {
    docs: {
      description: {
        story: "Estado com o dropdown aberto — borda em `neutral-600` e chevron rotacionado.",
      },
    },
  },
}
export const Error: Story = {
  args: {
    label: "Label",
    options: OPTIONS,
    placeholder: "Selecione",
    state: "error",
    helperText: "Campo obrigatório.",
  },
  parameters: {
    docs: {
      description: { story: "Estado de erro — borda em `error-500` e mensagem auxiliar de apoio." },
    },
  },
}
export const Disabled: Story = {
  args: { label: "Label", options: OPTIONS, placeholder: "Selecione", disabled: true },
  parameters: {
    docs: {
      description: { story: "Estado desabilitado — sem interação e fundo em `neutral-100`." },
    },
  },
}

// — Exemplo interativo —
const SelectExample = () => {
  const [categoria, setCategoria] = useState("")
  const [tamanho, setTamanho] = useState("")
  const [cor, setCor] = useState("")

  const TAMANHOS = [
    { label: "Pequeno", value: "p" },
    { label: "Médio", value: "m" },
    { label: "Grande", value: "g" },
  ]
  const CORES = [
    { label: "Azul", value: "azul" },
    { label: "Vermelho", value: "vermelho" },
    { label: "Verde", value: "verde" },
  ]

  const preview = [
    { label: "Categoria", value: OPTIONS.find((o) => o.value === categoria)?.label ?? "—" },
    { label: "Tamanho", value: TAMANHOS.find((o) => o.value === tamanho)?.label ?? "—" },
    { label: "Cor", value: CORES.find((o) => o.value === cor)?.label ?? "—" },
  ]

  return (
    <div>
      <nav className="ds-flex ds-gap-4 ds-items-end ds-flex-wrap">
        <div className="ds-w-[180px]">
          <Select
            label="Categoria"
            options={OPTIONS}
            value={categoria}
            onValueChange={(v) => setCategoria(v)}
            state={categoria ? "filled" : "default"}
          />
        </div>
        <div className="ds-w-[180px]">
          <Select
            label="Tamanho"
            options={TAMANHOS}
            value={tamanho}
            onValueChange={(v) => setTamanho(v)}
            state={tamanho ? "filled" : "default"}
          />
        </div>
        <div className="ds-w-[180px]">
          <Select
            label="Cor"
            options={CORES}
            value={cor}
            onValueChange={(v) => setCor(v)}
            state={cor ? "filled" : "default"}
          />
        </div>
      </nav>

      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded-[4px]">
        <h3 className="ds-text-[16px] ds-font-semibold ds-mb-3 ds-text-neutral-700">Seleções</h3>
        <div className="ds-flex ds-flex-col ds-gap-[8px]">
          {preview.map((item) => (
            <div key={item.label} className="ds-flex ds-gap-[8px] ds-text-[14px]">
              <span className="ds-text-neutral-400 ds-w-[80px]">{item.label}:</span>
              <span className="ds-text-neutral-600 ds-font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const Example: Story = {
  render: () => <SelectExample />,
  parameters: {
    docs: {
      description: {
        story: "Exemplo controlado com múltiplos selects independentes.",
      },
      source: {
        code: `import React, { useState } from 'react';
import { Select } from './Select';

function SelectExample() {
  const [categoria, setCategoria] = useState('');

  return (
    <div>
      <Select
        label="Categoria"
        options={[
          { label: 'Opção 1', value: '1' },
          { label: 'Opção 2', value: '2' },
          { label: 'Opção 3', value: '3' },
        ]}
        value={categoria}
        onChange={(v) => setCategoria(v)}
        state={categoria ? 'filled' : 'default'}
      />

      <p>Selecionado: {categoria || '—'}</p>
    </div>
  );
}`,
      },
    },
  },
}

import type { Meta, StoryObj } from "@storybook/react-vite"
import React from "react"
import { ProgressBar } from "../../Atoms/ProgressBar/ProgressBar"
import { Switch } from "../../Atoms/Switch/Switch"
import { Tag } from "../../Atoms/Tag/Tag"
import { DataTable, type DataTableColumn, type SortDirection } from "./DataTable"

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  argTypes: {
    columns: {
      description:
        "Definição das colunas. Cada coluna aceita `key`, `header`, `sortable`, `filterable`, `filterActive`, `onFilter`, `width` e `render`.",
      table: { type: { summary: "DataTableColumn[]" } },
      control: false,
    },
    data: {
      description:
        "Array de objetos com os dados das linhas. As chaves devem corresponder aos `key` das colunas.",
      table: { type: { summary: "Record<string, unknown>[]" } },
      control: false,
    },
    striped: {
      description: "Alterna a cor de fundo das linhas ímpares (zebra striping).",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    selectable: {
      description:
        "Adiciona uma coluna de checkboxes para seleção individual e em massa. O estado é controlado externamente via `selectedRows` e `onRowSelect`.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    selectedRows: {
      description: "Índices das linhas atualmente selecionadas (modo controlado).",
      table: { type: { summary: "number[]" }, defaultValue: { summary: "[]" } },
      control: false,
    },
    onRowSelect: {
      description:
        "Callback chamado com os índices selecionados quando o usuário altera a seleção.",
      table: { type: { summary: "(selectedIndices: number[]) => void" } },
    },
    sortColumn: {
      description:
        "Chave da coluna ativamente ordenada (modo controlado). Quando fornecido, o componente não gerencia o estado de ordenação internamente.",
      table: { type: { summary: "string" } },
      control: false,
    },
    sortDirection: {
      description: "Direção da ordenação ativa (modo controlado).",
      control: "select",
      options: ["asc", "desc", null],
      table: { type: { summary: "'asc' | 'desc' | null" }, defaultValue: { summary: "null" } },
    },
    onSort: {
      description:
        "Callback chamado com a chave da coluna e a nova direção quando o usuário clica no botão de ordenação.",
      table: { type: { summary: "(columnKey: string, direction: SortDirection) => void" } },
    },
    emptyState: {
      description: "Conteúdo exibido quando `data` está vazio.",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: '"Nenhum dado encontrado."' },
      },
      control: false,
    },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
O **DataTable** é o componente de tabela de dados do DS. Suporta ordenação, filtragem, seleção de linhas, zebra striping e renderização customizada de células via prop \`render\`.

---

### ✅ Quando usar

- **Listagem de registros** — quando o usuário precisa visualizar, comparar e interagir com múltiplos itens estruturados (ex: lista de usuários, pedidos, produtos).
- **Dados com ações** — use \`render\` para adicionar Tags, Switches, ProgressBars ou botões diretamente nas células.
- **Ordenação e filtro** — quando o usuário precisa reorganizar ou localizar registros na tabela.
- **Seleção em massa** — use \`selectable\` para permitir que o usuário selecione e execute ações em múltiplas linhas.

### ❌ Quando não usar

- **Dados simples (< 3 colunas)** — prefira uma lista ou cards para conjuntos de dados pequenos e pouco estruturados.
- **Formulários inline** — a DataTable não foi projetada para edição de células. Use um formulário dedicado.
- **Dados hierárquicos** — para estruturas em árvore, use um componente de tree view.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DataTable>

// ─── Sample data ──────────────────────────────────────────────────────────────

const people: Record<string, unknown>[] = [
  {
    name: "Ana Costa",
    role: "Designer",
    department: "Produto",
    status: "Ativo",
    progress: 75,
    active: true,
  },
  {
    name: "Bruno Lima",
    role: "Engenheiro",
    department: "Tecnologia",
    status: "Ativo",
    progress: 50,
    active: true,
  },
  {
    name: "Carla Souza",
    role: "Analista",
    department: "Financeiro",
    status: "Inativo",
    progress: 30,
    active: false,
  },
  {
    name: "Daniel Melo",
    role: "Gerente",
    department: "Produto",
    status: "Ativo",
    progress: 90,
    active: true,
  },
  {
    name: "Elisa Rocha",
    role: "Designer",
    department: "Marketing",
    status: "Inativo",
    progress: 20,
    active: false,
  },
]

const simpleColumns: DataTableColumn[] = [
  { key: "name", header: "Nome", sortable: true },
  { key: "role", header: "Cargo", sortable: true },
  { key: "department", header: "Departamento", sortable: true },
  { key: "status", header: "Status" },
]

const richColumns: DataTableColumn[] = [
  { key: "name", header: "Nome", sortable: true },
  { key: "role", header: "Cargo" },
  {
    key: "status",
    header: "Status",
    render: (value) => (
      <Tag
        label={String(value)}
        variant="soft"
        color={value === "Ativo" ? "green" : "red"}
        size="small"
      />
    ),
  },
  {
    key: "progress",
    header: "Progresso",
    width: "150px",
    render: (value) => <ProgressBar value={Number(value)} color="primary" />,
  },
  {
    key: "active",
    header: "Habilitado",
    width: "120px",
    render: (value) => <Switch checked={Boolean(value)} />,
  },
]

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { columns: simpleColumns, data: people },
  parameters: {
    docs: {
      description: {
        story:
          "Tabela simples com colunas de texto e ordenação uncontrolled — o componente gerencia o estado de sort internamente.",
      },
    },
  },
}

export const Striped: Story = {
  args: { columns: simpleColumns, data: people, striped: true },
  parameters: {
    docs: {
      description: {
        story:
          "Zebra striping — linhas ímpares recebem fundo `neutral-25` para facilitar a leitura em tabelas longas.",
      },
    },
  },
}

export const Sortable: Story = {
  args: { columns: simpleColumns, data: people, striped: true },
  parameters: {
    docs: {
      description: {
        story:
          "Ordenação controlada. O estado de `sortColumn` e `sortDirection` é gerenciado externamente — útil quando a ordenação aciona uma chamada à API.",
      },
      source: {
        code: `import { useState } from 'react';
import { DataTable, type SortDirection } from '@/components';

function SortableTable() {
  const [sortCol, setSortCol] = useState('');
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  return (
    <DataTable
      columns={columns}
      data={data}
      sortColumn={sortCol}
      sortDirection={sortDir}
      onSort={(key, dir) => {
        setSortCol(dir !== null ? key : '');
        setSortDir(dir);
      }}
    />
  );
}`,
      },
    },
  },
  render: (args) => {
    const [sortCol, setSortCol] = React.useState<string>("")
    const [sortDir, setSortDir] = React.useState<SortDirection>(null)

    return (
      <DataTable
        {...args}
        sortColumn={sortCol}
        sortDirection={sortDir}
        onSort={(key, dir) => {
          setSortCol(dir !== null ? key : "")
          setSortDir(dir)
        }}
      />
    )
  },
}

export const Selectable: Story = {
  args: { columns: simpleColumns, data: people, striped: true, selectable: true },
  parameters: {
    docs: {
      description: {
        story:
          "Seleção de linhas controlada. A prop `selectable` adiciona a coluna de checkboxes. O estado é gerenciado externamente via `selectedRows` e `onRowSelect`.",
      },
      source: {
        code: `import { useState } from 'react';
import { DataTable } from '@/components';

function SelectableTable() {
  const [selected, setSelected] = useState<number[]>([]);

  return (
    <DataTable
      columns={columns}
      data={data}
      selectable
      selectedRows={selected}
      onRowSelect={setSelected}
    />
  );
}`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<number[]>([])

    return <DataTable {...args} selectedRows={selected} onRowSelect={setSelected} />
  },
}

export const WithCustomCells: Story = {
  args: { columns: richColumns, data: people, striped: true },
  parameters: {
    docs: {
      description: {
        story:
          "Células customizadas via prop `render` na definição de cada coluna. Recebe o valor bruto, o objeto da linha e o índice — permitindo renderizar qualquer componente do DS.",
      },
      source: {
        code: `import { Tag, ProgressBar, Switch } from '@/components';
import type { DataTableColumn } from '@/components';

const columns: DataTableColumn[] = [
  { key: 'name', header: 'Nome', sortable: true },
  {
    key: 'status',
    header: 'Status',
    render: (value) => (
      <Tag
        label={String(value)}
        variant="soft"
        color={value === 'Ativo' ? 'success' : 'error'}
        size="small"
      />
    ),
  },
  {
    key: 'progress',
    header: 'Progresso',
    width: '150px',
    render: (value) => <ProgressBar value={Number(value)} color="primary" />,
  },
  {
    key: 'active',
    header: 'Habilitado',
    width: '120px',
    render: (value) => <Switch checked={Boolean(value)} />,
  },
];`,
      },
    },
  },
}

const filterableColumns: DataTableColumn[] = [
  { key: "name", header: "Nome", sortable: true, filterable: true },
  { key: "role", header: "Cargo", sortable: true, filterable: true },
  { key: "department", header: "Departamento", sortable: true, filterable: true },
  { key: "status", header: "Status", filterable: true },
]

export const Filterable: Story = {
  args: { columns: filterableColumns, data: people, striped: true },
  parameters: {
    docs: {
      description: {
        story:
          "Colunas com botão de filtro. O estado `filterActive` e o callback `onFilter` são definidos por coluna — o componente apenas sinaliza a intenção, a lógica de filtragem é externa.",
      },
      source: {
        code: `import { useState } from 'react';
import { DataTable } from '@/components';

const columns = [
  { key: 'name', header: 'Nome', sortable: true, filterable: true },
  { key: 'status', header: 'Status', filterable: true },
];

function FilterableTable() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <DataTable
      columns={columns.map((col) => ({
        ...col,
        filterActive: activeFilter === col.key,
        onFilter: () => setActiveFilter((prev) => (prev === col.key ? null : col.key)),
      }))}
      data={data}
    />
  );
}`,
      },
    },
  },
  render: (args) => {
    const [activeFilter, setActiveFilter] = React.useState<string | null>(null)

    return (
      <DataTable
        {...args}
        columns={filterableColumns.map((col) => ({
          ...col,
          filterActive: activeFilter === col.key,
          onFilter: () => setActiveFilter((prev) => (prev === col.key ? null : col.key)),
        }))}
      />
    )
  },
}

export const Empty: Story = {
  args: {
    columns: simpleColumns,
    data: [],
    emptyState: "Nenhum registro encontrado para os filtros aplicados.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Estado vazio — exibido quando `data` é um array vazio. Use `emptyState` para customizar a mensagem.",
      },
    },
  },
}

export const FullFeatured: Story = {
  args: { columns: richColumns, data: people, striped: true, selectable: true },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo completo com células customizadas, zebra striping e seleção de linhas simultâneos.",
      },
      source: {
        code: `import { useState } from 'react';
import { DataTable, Tag, ProgressBar, Switch } from '@/components';

function FullTable() {
  const [selected, setSelected] = useState<number[]>([]);

  return (
    <DataTable
      columns={columns}
      data={data}
      striped
      selectable
      selectedRows={selected}
      onRowSelect={setSelected}
      aria-label="Tabela de colaboradores"
    />
  );
}`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<number[]>([])

    return (
      <DataTable
        {...args}
        selectedRows={selected}
        onRowSelect={setSelected}
        aria-label="Tabela de colaboradores"
      />
    )
  },
}

export const MobileCards: Story = {
  args: { columns: richColumns, data: people, striped: true, mobileCards: true },
  parameters: {
    layout: "padded",
    viewport: { defaultViewport: "mobile1" },
    docs: {
      description: {
        story:
          "Com `mobileCards` ativado (padrão), abaixo do breakpoint `md` (768 px) cada linha é renderizada como um card empilhado, exibindo o rótulo da coluna ao lado esquerdo e o valor à direita. Acima de `md` o layout de tabela é restaurado automaticamente.",
      },
    },
  },
}

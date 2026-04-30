import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,

  argTypes: {
    current: {
      description: "Página atualmente ativa.",
      control: "number",
      table: { type: { summary: "number" }, defaultValue: { summary: "1" } },
    },
    total: {
      description: "Total de páginas disponíveis.",
      control: "number",
      table: { type: { summary: "number" }, defaultValue: { summary: "1" } },
    },
    editable: {
      description: 'Exibe um input numérico no lugar dos botões de página — variante mobile ("1 de 50").',
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    showArrows: {
      description: "Exibe os botões de navegação anterior/próxima.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    onPageChange: {
      description: "Callback disparado com o número da página ao navegar.",
      table: { type: { summary: "(page: number) => void" } },
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
O **Pagination** divide conteúdo em páginas separadas para otimizar o carregamento e facilitar a leitura. Oferece controles para navegar página a página ou saltar para uma página específica.

---

### ✅ Quando usar

- **Grandes conjuntos de dados** — quando a tabela possui mais itens do que o ideal para exibição única (geralmente acima de 10–20 linhas).
- **Otimização de performance** — para evitar carregar milhares de registros de uma vez no navegador.
- **Controle de navegação** — quando o usuário precisa de um ponto de referência fixo (ex: "estou na página 5") para retornar a um dado posteriormente.

### ❌ Quando não usar

- **Poucos dados** — se o total de itens for pequeno o suficiente para não exigir rolagem excessiva.
- **Scroll infinito** — se a experiência for baseada em descoberta contínua (como redes sociais), prefira scroll infinito.
- **Tabelas de comparação estática** — onde todos os dados precisam estar visíveis lado a lado para análise imediata.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const DefaultExample = () => {
  const [page, setPage] = useState(1);
  return <Pagination current={page} total={3} onPageChange={setPage} />;
};

const MoreRightExample = () => {
  const [page, setPage] = useState(1);
  return <Pagination current={page} total={10} onPageChange={setPage} />;
};

const MoreLeftExample = () => {
  const [page, setPage] = useState(10);
  return <Pagination current={page} total={10} onPageChange={setPage} />;
};

const BothSideMoreExample = () => {
  const [page, setPage] = useState(7);
  return <Pagination current={page} total={20} onPageChange={setPage} />;
};

const EditableExample = () => {
  const [page, setPage] = useState(1);
  return <Pagination current={page} total={50} onPageChange={setPage} editable />;
};

const WithoutArrowsExample = () => {
  const [page, setPage] = useState(1);
  return <Pagination current={page} total={5} onPageChange={setPage} showArrows={false} />;
};

const FullExample = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const total = 47;
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="ds-flex ds-flex-col ds-gap-4 ds-items-center">
      <p className="ds-text-sm ds-text-neutral-500">
        Exibindo itens {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} de {total}
      </p>
      <Pagination current={page} total={totalPages} onPageChange={setPage} />
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultExample />,
  parameters: {
    docs: { description: { story: "Paginação simples com até 5 páginas — sem reticências." } },
  },
};

export const MoreRight: Story = {
  render: () => <MoreRightExample />,
  parameters: {
    docs: { description: { story: "Reticências à direita — usuário está no início da navegação." } },
  },
};

export const MoreLeft: Story = {
  render: () => <MoreLeftExample />,
  parameters: {
    docs: { description: { story: "Reticências à esquerda — usuário está no final da navegação." } },
  },
};

export const BothSideMore: Story = {
  render: () => <BothSideMoreExample />,
  parameters: {
    docs: { description: { story: "Reticências dos dois lados — usuário está no meio da navegação." } },
  },
};

export const Editable: Story = {
  render: () => <EditableExample />,
  parameters: {
    docs: { description: { story: 'Variante mobile — exibe um input numérico com o total de páginas ("1 de 50"). Confirme com Enter ou ao perder o foco.' } },
  },
};

export const WithoutArrows: Story = {
  render: () => <WithoutArrowsExample />,
  parameters: {
    docs: { description: { story: "Sem os botões de navegação anterior/próxima." } },
  },
};

export const Example: Story = {
  render: () => <FullExample />,
  parameters: {
    docs: {
      description: {
        story: "Exemplo real conectado a um conjunto de dados paginado.",
      },
      source: {
        code: `import { useState } from 'react';
import { Pagination } from '@/components';

function TabelaPaginada() {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const total = 47;
  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      <p>
        Exibindo itens {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} de {total}
      </p>
      <Pagination current={page} total={totalPages} onPageChange={setPage} />
    </div>
  );
}`,
      },
    },
  },
};

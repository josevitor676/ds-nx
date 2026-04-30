import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { DatePickerRangeProps } from "./DatePickerRange";
import { DatePickerRange } from "./DatePickerRange";

const meta: Meta<typeof DatePickerRange> = {
  title: "Components/DatePickerRange",
  component: DatePickerRange,
  parameters: { layout: "centered" },
  argTypes: {
    startDate: {
      description: "Data de início do range selecionado.",
      control: false,
      table: { type: { summary: "Date | null" }, defaultValue: { summary: "null" } },
    },
    endDate: {
      description: "Data de fim do range selecionado.",
      control: false,
      table: { type: { summary: "Date | null" }, defaultValue: { summary: "null" } },
    },
    onRangeChange: {
      description:
        "Callback chamado a cada clique. Recebe `(start, end)` — no primeiro clique `end` é `null`; no segundo, ambas as datas são preenchidas.",
      table: { type: { summary: "(start: Date | null, end: Date | null) => void" } },
    },
    month: {
      description:
        "Mês inicial do calendário esquerdo (0–11). Quando fornecido, o componente passa a ser controlado.",
      control: { type: "number", min: 0, max: 11 },
      table: { type: { summary: "number" }, defaultValue: { summary: "mês atual" } },
    },
    year: {
      description:
        "Ano inicial do calendário esquerdo. Quando fornecido junto com `month`, o componente é controlado.",
      control: { type: "number" },
      table: { type: { summary: "number" }, defaultValue: { summary: "ano atual" } },
    },
    onMonthChange: {
      description: "Chamado com o novo mês (0–11) quando o usuário navega ou seleciona no month picker.",
      table: { type: { summary: "(month: number) => void" } },
    },
    onYearChange: {
      description: "Chamado com o novo ano quando a navegação cruza uma virada de ano.",
      table: { type: { summary: "(year: number) => void" } },
    },
    weekDays: {
      description: "Labels dos dias da semana. Array de 7 itens começando no Domingo.",
      control: false,
      table: {
        type: { summary: "string[]" },
        defaultValue: { summary: '["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"]' },
      },
    },
    monthNames: {
      description: "Nomes curtos dos meses exibidos no botão do header. Array de 12 itens.",
      control: false,
      table: {
        type: { summary: "string[]" },
        defaultValue: { summary: '["Jan","Fev",...,"Dez"]' },
      },
    },
    monthFullNames: {
      description: "Nomes completos dos meses exibidos na lista do month picker. Array de 12 itens.",
      control: false,
      table: {
        type: { summary: "string[]" },
        defaultValue: { summary: '["Janeiro","Fevereiro",...,"Dezembro"]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerRange>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { month: 1, year: 2026 },
  parameters: {
    docs: {
      description: {
        story: "Estado padrão sem nenhum range selecionado.",
      },
    },
  },
};

export const WithPreselectedRange: Story = {
  args: {
    month: 1,
    year: 2026,
    startDate: new Date(2026, 1, 10),
    endDate: new Date(2026, 1, 25),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Range pré-selecionado via props `startDate` e `endDate`. Dias entre as datas recebem o estado `in-range` (fundo `primary-25`); as extremidades recebem `start` e `end` (fundo `primary-500`).",
      },
    },
  },
};

export const CrossMonthRange: Story = {
  args: {
    month: 1,
    year: 2026,
    startDate: new Date(2026, 1, 20),
    endDate: new Date(2026, 2, 10),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Range que cruza os dois meses exibidos. O highlight `in-range` continua de forma contínua entre os dois calendários.",
      },
    },
  },
};

const InteractiveDemo = (args: Partial<DatePickerRangeProps>) => {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  return (
    <div className="ds-flex ds-flex-col ds-gap-4 ds-items-center">
      <DatePickerRange
        {...(args as DatePickerRangeProps)}
        startDate={start}
        endDate={end}
        onRangeChange={(s, e) => {
          setStart(s);
          setEnd(e);
        }}
      />
      <p className="ds-text-sm ds-text-neutral-500">
        <span className="ds-font-medium">Início:</span>{" "}
        {start ? start.toLocaleDateString("pt-BR") : "—"}
        {"  ·  "}
        <span className="ds-font-medium">Fim:</span>{" "}
        {end ? end.toLocaleDateString("pt-BR") : "—"}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => <InteractiveDemo {...args} />,
  args: { month: 1, year: 2026 },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstração controlada pelo estado local. O primeiro clique define o início; o segundo, o fim. Passe o mouse sobre os dias entre os cliques para visualizar o preview do range.",
      },
      source: {
        code: `import { useState } from 'react';
import { DatePickerRange } from '@design-system';

function FiltroPorPeriodo() {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  return (
    <DatePickerRange
      startDate={start}
      endDate={end}
      onRangeChange={(s, e) => {
        setStart(s);
        setEnd(e);
      }}
    />
  );
}`,
      },
    },
  },
};

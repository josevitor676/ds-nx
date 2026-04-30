import type { Meta, StoryObj } from "@storybook/react-vite"
import * as TablerIcons from "@tabler/icons-react"
import { Button } from "../Button/Button"
import { Icon } from "./Icon"

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: { layout: "centered" },
  argTypes: {
    icon: {
      description: "Componente importado de `@tabler/icons-react`.",
      control: false,
      table: { type: { summary: "TablerIcon" } },
    },
    size: {
      description: "Tamanho semântico do ícone.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
      },
    },
    stroke: {
      description:
        "Espessura do traço. Padrão Tabler: `2`. O DS adota `1.5` nos componentes para visual mais leve.",
      control: { type: "number", min: 0.5, max: 3, step: 0.5 },
      table: { defaultValue: { summary: "2" } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  tags: ["!sidebar"],
  args: {
    icon: TablerIcons.IconMail,
    size: "md",
    stroke: 2,
  },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div
          key={size}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          <Icon icon={TablerIcons.IconMail} size={size} />
          <code style={{ fontSize: "11px", color: "#7C8096" }}>
            {size} — {size === "sm" ? 16 : size === "md" ? 20 : 24}px
          </code>
        </div>
      ))}
    </div>
  ),
}

// ─── Strokes ──────────────────────────────────────────────────────────────────

export const Strokes: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
      {[1, 1.5, 2, 2.5].map((stroke) => (
        <div
          key={stroke}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          <Icon icon={TablerIcons.IconHome} size="lg" stroke={stroke} />
          <code style={{ fontSize: "11px", color: "#7C8096" }}>stroke={stroke}</code>
        </div>
      ))}
    </div>
  ),
}

// ─── With Button ──────────────────────────────────────────────────────────────

export const WithButton: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <code style={{ fontSize: "11px", color: "#7C8096" }}>
          iconStart / iconEnd — passe a referência do componente
        </code>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <Button variant="filled" color="primary" iconStart={TablerIcons.IconMail}>
            E-mail
          </Button>
          <Button variant="filled" color="primary" iconEnd={TablerIcons.IconArrowRight}>
            Próximo
          </Button>
          <Button
            variant="outlined"
            color="primary"
            iconStart={TablerIcons.IconPlus}
            iconEnd={TablerIcons.IconArrowRight}
          >
            Adicionar
          </Button>
          <Button variant="clear" color="error" iconStart={TablerIcons.IconTrash}>
            Excluir
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <code style={{ fontSize: "11px", color: "#7C8096" }}>
          iconStroke — controla a espessura (padrão: 1.5)
        </code>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <Button variant="filled" color="primary" iconStart={TablerIcons.IconMail} iconStroke={1}>
            E-mail
          </Button>
          <Button
            variant="filled"
            color="primary"
            iconStart={TablerIcons.IconMail}
            iconStroke={1.5}
          >
            E-mail
          </Button>
          <Button variant="filled" color="primary" iconStart={TablerIcons.IconMail} iconStroke={2}>
            E-mail
          </Button>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <code style={{ fontSize: "10px", color: "#7C8096", width: "80px", textAlign: "center" }}>
            stroke=1
          </code>
          <code style={{ fontSize: "10px", color: "#7C8096", width: "80px", textAlign: "center" }}>
            stroke=1.5
          </code>
          <code style={{ fontSize: "10px", color: "#7C8096", width: "80px", textAlign: "center" }}>
            stroke=2
          </code>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <code style={{ fontSize: "11px", color: "#7C8096" }}>
          iconSize — sobrescreve o tamanho automático
        </code>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <Button variant="filled" color="primary" size="sm" iconStart={TablerIcons.IconMail}>
            E-mail
          </Button>
          <Button
            variant="filled"
            color="primary"
            size="sm"
            iconStart={TablerIcons.IconMail}
            iconSize="lg"
          >
            E-mail
          </Button>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <code style={{ fontSize: "10px", color: "#7C8096", width: "80px", textAlign: "center" }}>
            automático
          </code>
          <code style={{ fontSize: "10px", color: "#7C8096", width: "80px", textAlign: "center" }}>
            iconSize=lg
          </code>
        </div>
      </div>
    </div>
  ),
}

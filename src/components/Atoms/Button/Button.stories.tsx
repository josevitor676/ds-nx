import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconArrowRight, IconMail, IconPlus, IconTrash } from "@tabler/icons-react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    children: {
      description: "Conteúdo do botão. Aceita texto, ícones ou qualquer elemento React.",
      control: "text",
      table: { type: { summary: "React.ReactNode" } },
    },
    variant: {
      description: "Estilo visual do botão.",
      control: "select",
      options: ["filled", "outlined", "clear"],
      table: {
        type: { summary: '"filled" | "outlined" | "clear"' },
        defaultValue: { summary: "filled" },
      },
    },
    color: {
      description: "Cor semântica aplicada ao botão.",
      control: "select",
      options: ["primary", "error", "neutral"],
      table: {
        type: { summary: '"primary" | "error" | "neutral"' },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      description: "Altura do botão.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "md" },
      },
    },
    loading: {
      description: "Exibe spinner e desabilita o botão. Use durante operações assíncronas.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "Desabilita o botão nativamente via atributo HTML.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    unstyled: {
      description: "Remove todas as classes de variante. Útil para criar bases customizadas.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    iconStart: {
      description: "Ícone Tabler renderizado antes do texto.",
      control: false,
      table: { type: { summary: "TablerIcon" } },
    },
    iconEnd: {
      description: "Ícone Tabler renderizado após o texto.",
      control: false,
      table: { type: { summary: "TablerIcon" } },
    },
    iconSize: {
      description: "Sobrescreve o tamanho automático dos ícones derivado do `size` do botão.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: "derivado de size" },
      },
    },
    iconStroke: {
      description: "Espessura do stroke dos ícones.",
      control: { type: "number", min: 0.5, max: 3, step: 0.25 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1.5" },
      },
    },
    onClick: {
      description: "Callback disparado ao clicar no botão.",
      action: "clicked",
      table: { type: { summary: "(event: React.MouseEvent<HTMLButtonElement>) => void" } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ─── Default (Playground) ────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    children: "Texto",
    variant: "filled",
    color: "primary",
    size: "md",
  },
}

// ─── Variants ────────────────────────────────────────────────────────────────

export const Variants: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(["filled", "outlined", "clear"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant={variant} color="primary">
            Primary
          </Button>
          <Button variant={variant} color="error">
            Error
          </Button>
          <Button variant={variant} color="neutral">
            Neutral
          </Button>
          <Button variant={variant} color="primary" disabled>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
}

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div
          key={size}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <Button variant="filled" color="primary" size={size}>
            {size === "sm" ? "Small" : size === "md" ? "Medium" : "Large"}
          </Button>
          <span style={{ fontSize: 11, color: "#7C8096" }}>
            {size} — {size === "sm" ? "28px" : size === "md" ? "32px" : "40px"}
          </span>
        </div>
      ))}
    </div>
  ),
}

// ─── States ──────────────────────────────────────────────────────────────────

export const States: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button variant="filled" color="primary" loading>
        Salvando
      </Button>
      <Button variant="filled" color="primary" disabled>
        Desabilitado
      </Button>
      <Button variant="outlined" color="primary" disabled>
        Desabilitado
      </Button>
      <Button variant="clear" color="primary" disabled>
        Desabilitado
      </Button>
    </div>
  ),
}

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button variant="filled" color="primary" iconStart={IconMail}>
          E-mail
        </Button>
        <Button variant="filled" color="primary" iconEnd={IconArrowRight}>
          Próximo
        </Button>
        <Button variant="outlined" color="primary" iconStart={IconPlus} iconEnd={IconArrowRight}>
          Adicionar
        </Button>
        <Button variant="clear" color="error" iconStart={IconTrash}>
          Excluir
        </Button>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button variant="filled" color="primary" iconStart={IconMail} iconStroke={1}>
          stroke 1
        </Button>
        <Button variant="filled" color="primary" iconStart={IconMail} iconStroke={1.5}>
          stroke 1.5
        </Button>
        <Button variant="filled" color="primary" iconStart={IconMail} iconStroke={2}>
          stroke 2
        </Button>
        <Button variant="filled" color="primary" iconStart={IconMail} iconSize="lg">
          iconSize lg
        </Button>
      </div>
    </div>
  ),
}

// ─── Best Practices ───────────────────────────────────────────────────────────

export const BestPractices: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#16a34a",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          ✅ Correto
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <p style={{ fontSize: 13, color: "#374151", margin: "0 0 8px" }}>
              Use textos curtos e diretos que descrevam a ação
            </p>
            <Button variant="filled" color="primary">
              Salvar alterações
            </Button>
          </div>
          <div>
            <p style={{ fontSize: 13, color: "#374151", margin: "0 0 8px" }}>
              Mantenha hierarquia: filled → outlined → clear
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="filled" color="primary">
                Confirmar
              </Button>
              <Button variant="outlined" color="neutral">
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#dc2626",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          ❌ Evitar
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <p style={{ fontSize: 13, color: "#374151", margin: "0 0 8px" }}>
              Evite textos genéricos que não indicam a ação
            </p>
            <Button variant="filled" color="neutral">
              Clique aqui
            </Button>
          </div>
          <div>
            <p style={{ fontSize: 13, color: "#374151", margin: "0 0 8px" }}>
              Evite múltiplos botões filled na mesma área
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="filled" color="primary">
                Salvar
              </Button>
              <Button variant="filled" color="primary">
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

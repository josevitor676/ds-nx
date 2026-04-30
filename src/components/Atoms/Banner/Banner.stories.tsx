import type { Meta, StoryObj } from "@storybook/react-vite"
import { Banner } from "./Banner"

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  argTypes: {
    type: {
      description: "Tipo semântico do banner — define cores de fundo, borda e texto.",
      control: "select",
      options: ["neutral", "warning", "success", "error", "info"],
      table: {
        type: { summary: '"neutral" | "warning" | "success" | "error" | "info"' },
        defaultValue: { summary: "neutral" },
      },
    },
    showIcon: {
      description: "Exibe o badge com ícone de alerta à esquerda da mensagem.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    actionLabel: {
      description: "Texto do botão de ação. Quando omitido, o botão não é renderizado.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    onAction: { action: "action-clicked" },
    onClose: { action: "close-clicked" },
    icon: { control: false },
    children: {
      description: "Conteúdo da mensagem exibida no banner.",
      control: "text",
    },
  },
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof Banner>

const defaultMessage =
  "Confirmo que os dados informados estão corretos e autorizo a criação desta solicitação de transferência entre filiais."

export const Default: Story = {
  args: {
    type: "neutral",
    children: defaultMessage,
    actionLabel: "Texto",
    onClose: () => {},
  },
}

export const Neutral: Story = {
  args: {
    type: "neutral",
    children: defaultMessage,
    actionLabel: "Texto",
    onClose: () => {},
  },
}

export const Warning: Story = {
  args: {
    type: "warning",
    children: defaultMessage,
    actionLabel: "Texto",
    onClose: () => {},
  },
}

export const Success: Story = {
  args: {
    type: "success",
    children: defaultMessage,
    actionLabel: "Texto",
    onClose: () => {},
  },
}

export const Error: Story = {
  args: {
    type: "error",
    children: defaultMessage,
    actionLabel: "Texto",
    onClose: () => {},
  },
}

export const Info: Story = {
  args: {
    type: "info",
    children: defaultMessage,
    actionLabel: "Texto",
    onClose: () => {},
  },
}

export const SemIcone: Story = {
  args: {
    type: "info",
    showIcon: false,
    children: defaultMessage,
    actionLabel: "Texto",
  },
}

export const SemBotoes: Story = {
  args: {
    type: "success",
    children: defaultMessage,
  },
}

export const TodosTipos: Story = {
  render: () => (
    <div className="ds-flex ds-flex-col ds-gap-3" style={{ maxWidth: "617px" }}>
      {(["neutral", "warning", "success", "error", "info"] as const).map((type) => (
        <Banner key={type} type={type} actionLabel="Texto" onClose={() => {}}>
          {defaultMessage}
        </Banner>
      ))}
    </div>
  ),
}

import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconFile, IconFolder, IconHome, IconSettings } from "@tabler/icons-react"
import React, { useState } from "react"
import { BreadcrumbItem } from "./BreadcrumbItem"

const meta: Meta<typeof BreadcrumbItem> = {
  title: "Components/BreadcrumbItem",
  component: BreadcrumbItem,
  parameters: { layout: "centered" },
  argTypes: {
    showIconRight: {
      description:
        "Controla a visibilidade do chevron à direita. `undefined` (padrão) oculta o chevron apenas no estado `disabled`. `true` força exibição sempre; `false` oculta sempre.",
      control: "boolean",
      table: {
        type: { summary: "boolean | undefined" },
        defaultValue: { summary: "undefined" },
      },
    },
    showIcon: {
      description: "Exibe o ícone à esquerda (iconLeft) quando `true` (padrão).",
      control: "boolean",
      table: { defaultValue: { summary: "true" } },
    },
  },
}

export default meta
type Story = StoryObj<typeof BreadcrumbItem>

export const Default: Story = {
  args: { label: "Início", href: "#", iconLeft: <IconHome />, showIcon: true },
}

export const Active: Story = {
  args: {
    label: "Categoria",
    active: true,
    iconLeft: <IconFolder />,
    showIcon: true,
  },
}

export const Disabled: Story = {
  args: {
    label: "Desabilitado",
    href: "#",
    disabled: true,
    iconLeft: <IconSettings />,
    showIcon: true,
  },
}

export const ChevronHidden: Story = {
  args: {
    label: "Sem chevron",
    href: "#",
    iconLeft: <IconHome />,
    showIcon: true,
    showIconRight: false,
  },
}

export const ChevronForced: Story = {
  args: {
    label: "Desabilitado c/ chevron",
    href: "#",
    disabled: true,
    iconLeft: <IconSettings />,
    showIcon: true,
    showIconRight: true,
  },
}

const NavigationComponent = () => {
  const [screen, setScreen] = useState("Tela 1")

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    setScreen(target)
  }

  return (
    <div>
      <nav className="ds-flex ds-gap-3 ds-items-center">
        <BreadcrumbItem
          label="Início"
          href="#"
          onClick={(e) => handleClick(e, "Tela 1")}
          active={screen === "Tela 1"}
          iconLeft={<IconHome />}
        />
        <BreadcrumbItem
          label="Categoria"
          href="#"
          onClick={(e) => handleClick(e, "Tela 2")}
          active={screen === "Tela 2"}
          iconLeft={<IconFolder />}
        />
        <BreadcrumbItem
          label="Documento"
          href="#"
          onClick={(e) => handleClick(e, "Tela 3")}
          active={screen === "Tela 3"}
          iconLeft={<IconFile />}
        />
      </nav>

      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded-md">
        <h3 className="ds-text-4 ds-font-semibold ds-mb-2">Conteúdo da {screen}</h3>
        <p className="ds-text-sm ds-text-neutral-600">Aqui vai o conteúdo simulado da {screen}.</p>
      </div>
    </div>
  )
}

export const Navigation: Story = {
  render: () => <NavigationComponent />,
}

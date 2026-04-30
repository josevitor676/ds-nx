import type { Meta, StoryObj } from "@storybook/react-vite"
import React, { useState } from "react"
import { Button } from "../../Atoms/Button/Button"
import { Modal } from "./Modal"

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Largura do modal",
    },
    open: { control: "boolean" },
    title: { control: "text" },
    subtitle: { control: "text" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
    showCloseButton: { control: "boolean" },
    showFooter: { control: "boolean" },
    onClose: { action: "onClose" },
    onConfirm: { action: "onConfirm" },
    onCancel: { action: "onCancel" },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

// ── Helpers ───────────────────────────────────────────────────────────────────

const ModalWithTrigger = (
  props: Omit<React.ComponentProps<typeof Modal>, "open" | "onClose"> & {
    triggerLabel?: string
  }
) => {
  const { triggerLabel = "Abrir Modal", ...rest } = props
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)} label={triggerLabel} />
      <Modal {...rest} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: "Modal title",
    subtitle: "Texto de suporte para sub",
    confirmLabel: "Confirmar",
    cancelLabel: "Cancelar",
    size: "md",
    showCloseButton: true,
    showFooter: true,
  },
  render: (args) => <ModalWithTrigger {...args} />,
}

// ── Tamanhos ──────────────────────────────────────────────────────────────────

export const SizeSm: Story = {
  name: "size=sm",
  render: () => (
    <ModalWithTrigger
      size="sm"
      triggerLabel="Abrir Modal SM"
      title="Modal pequeno"
      subtitle="Largura de 480px"
      confirmLabel="Confirmar"
      cancelLabel="Cancelar"
    />
  ),
}

export const SizeMd: Story = {
  name: "size=md",
  render: () => (
    <ModalWithTrigger
      size="md"
      triggerLabel="Abrir Modal MD"
      title="Modal médio"
      subtitle="Largura de 589px (padrão)"
      confirmLabel="Confirmar"
      cancelLabel="Cancelar"
    />
  ),
}

export const SizeLg: Story = {
  name: "size=lg",
  render: () => (
    <ModalWithTrigger
      size="lg"
      triggerLabel="Abrir Modal LG"
      title="Modal grande"
      subtitle="Largura de 720px"
      confirmLabel="Confirmar"
      cancelLabel="Cancelar"
    />
  ),
}

// ── Variantes ─────────────────────────────────────────────────────────────────

export const WithContent: Story = {
  name: "Com conteúdo (children)",
  render: () => (
    <ModalWithTrigger
      triggerLabel="Abrir com conteúdo"
      title="Adicionar usuário"
      subtitle="Preencha os dados abaixo para criar um novo usuário."
      confirmLabel="Salvar"
      cancelLabel="Cancelar"
    >
      <div className="ds-flex ds-flex-col ds-gap-3 ds-py-2">
        <p className="ds-text-sm ds-text-neutral-700">
          Conteúdo customizado do modal pode ser inserido aqui como filhos (children).
        </p>
      </div>
    </ModalWithTrigger>
  ),
}

export const WithoutSubtitle: Story = {
  name: "Sem subtítulo",
  render: () => (
    <ModalWithTrigger
      triggerLabel="Abrir sem subtítulo"
      title="Confirmar exclusão"
      confirmLabel="Excluir"
      cancelLabel="Cancelar"
    />
  ),
}

export const WithoutFooter: Story = {
  name: "Sem rodapé",
  render: () => (
    <ModalWithTrigger
      triggerLabel="Abrir sem rodapé"
      title="Informações"
      subtitle="Este modal não possui botões de ação no rodapé."
      showFooter={false}
    />
  ),
}

export const WithoutCloseButton: Story = {
  name: "Sem botão fechar",
  render: () => (
    <ModalWithTrigger
      triggerLabel="Abrir sem X"
      title="Ação obrigatória"
      subtitle="Este modal deve ser fechado pelos botões do rodapé."
      confirmLabel="Continuar"
      cancelLabel="Cancelar"
      showCloseButton={false}
    />
  ),
}

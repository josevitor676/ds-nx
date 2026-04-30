import type { Meta, StoryObj } from "@storybook/react-vite"
import React, { useState } from "react"
import { Button } from "../../Atoms/Button/Button"
import { Dialog } from "./Dialog"

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  argTypes: {
    type: { control: "select", options: ["web", "mobile"], description: "Tipo/layout do dialog" },
    open: { control: "boolean" },
    title: { control: "text" },
    bodyText: { control: "text" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
    onClose: { action: "onClose" },
    onConfirm: { action: "onConfirm" },
    onCancel: { action: "onCancel" },
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

const DialogWithTrigger = (
  props: Omit<React.ComponentProps<typeof Dialog>, "open" | "onClose"> & { triggerLabel?: string }
) => {
  const { triggerLabel = "Abrir Dialog", ...rest } = props
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)} label={triggerLabel} />
      <Dialog {...rest} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export const Default: Story = {
  args: {
    title: "Title",
    bodyText:
      "Você tem certeza de que deseja continuar com esta ação? Essa operação pode alterar informações importantes do sistema. Caso prossiga, as mudanças serão aplicadas imediatamente e poderão não ser revertidas.",
    confirmLabel: "Sim, continuar",
    cancelLabel: "Cancelar",
    type: "web",
  },
  render: (args) => <DialogWithTrigger {...args} />,
}

export const Web: Story = {
  name: "type=web",
  render: () => <DialogWithTrigger triggerLabel="Abrir (web)" title="Title" type="web" />,
}

export const Mobile: Story = {
  name: "type=mobile",
  render: () => <DialogWithTrigger triggerLabel="Abrir (mobile)" title="Title" type="mobile" />,
}

export const WithoutFooter: Story = {
  name: "Sem rodapé",
  render: () => (
    <DialogWithTrigger triggerLabel="Abrir" title="Informação" type="web" showFooter={false} />
  ),
}

export const DestructiveAction: Story = {
  name: "Ação destrutiva",
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button
          variant="filled"
          color="error"
          label="Excluir projeto"
          onClick={() => setOpen(true)}
        />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Excluir projeto"
          bodyText="Esta ação é permanente e não pode ser desfeita. Tem certeza que deseja continuar?"
          confirmLabel="Excluir"
          cancelLabel="Cancelar"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          type="web"
        />
      </>
    )
  },
}

import type { Meta, StoryObj } from "@storybook/react-vite"
import React from "react"
import { Button } from "../../Atoms/Button/Button"
import { Select } from "../../Atoms/Select/Select"
import { Drawer } from "./Drawer"

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  argTypes: {
    side: {
      control: "select",
      options: ["right", "left"],
    },
    open: { control: "boolean" },
    showFooter: { control: "boolean" },
    showCloseButton: { control: "boolean" },
    onClose: { action: "onClose" },
    onPrimary: { action: "onPrimary" },
    onSecondary: { action: "onSecondary" },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button label="Abrir Drawer" onClick={() => setOpen(true)} />
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        />
      </>
    )
  },
  args: {
    title: "Título",
    primaryLabel: "Confirmar",
    secondaryLabel: "Cancelar",
    side: "right",
    showFooter: true,
    showCloseButton: true,
  },
}

export const WithContent: Story = {
  name: "Com conteúdo",
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button label="Abrir Drawer com Conteúdo" onClick={() => setOpen(true)} />
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        >
          <div className="ds-flex ds-flex-col ds-gap-6">
            {["Filtro 1", "Filtro 2", "Filtro 3", "Filtro 4", "Filtro 5"].map((label) => (
              <Select key={label} label={label} placeholder="Selecione" options={[]} />
            ))}
          </div>
        </Drawer>
      </>
    )
  },
  args: {
    title: "Filtros Avançados",
    primaryLabel: "Aplicar filtros",
    secondaryLabel: "Limpar filtros",
    side: "right",
    showFooter: true,
    showCloseButton: true,
  },
}

export const WithoutFooter: Story = {
  name: "Sem rodapé",
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button label="Abrir Drawer sem Rodapé" onClick={() => setOpen(true)} />
        <Drawer {...args} open={open} onClose={() => setOpen(false)} />
      </>
    )
  },
  args: {
    title: "Título",
    showFooter: false,
    showCloseButton: true,
    side: "right",
  },
}

export const LeftSide: Story = {
  name: "Lado esquerdo",
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button label="Abrir Drawer à Esquerda" onClick={() => setOpen(true)} />
        <Drawer
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onPrimary={() => setOpen(false)}
          onSecondary={() => setOpen(false)}
        />
      </>
    )
  },
  args: {
    title: "Título",
    primaryLabel: "Confirmar",
    secondaryLabel: "Cancelar",
    side: "left",
    showFooter: true,
    showCloseButton: true,
  },
}

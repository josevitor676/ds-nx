import * as RadixPopover from "@radix-ui/react-popover"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  IconEdit,
  IconLogout,
  IconSettings,
  IconShare2,
  IconTrash,
  IconUser,
} from "@tabler/icons-react"
import { Button } from "../Button/Button"
import { Dropdown, DropdownItem } from "./Dropdown"

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    className: { control: false },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownItem icon={IconShare2} label="texto teste" />
      <DropdownItem icon={IconShare2} label="texto teste" />
      <DropdownItem icon={IconShare2} label="texto teste" />
      <DropdownItem icon={IconShare2} label="texto teste" />
      <DropdownItem icon={IconShare2} label="texto teste" />
      <DropdownItem icon={IconShare2} label="texto teste" />
    </Dropdown>
  ),
}

export const WithSelectedItem: Story = {
  render: () => (
    <Dropdown>
      <DropdownItem icon={IconShare2} label="texto teste" />
      <DropdownItem icon={IconShare2} label="texto teste" selected />
      <DropdownItem icon={IconShare2} label="texto teste" />
    </Dropdown>
  ),
}

export const WithoutIcons: Story = {
  render: () => (
    <Dropdown>
      <DropdownItem label="Editar" />
      <DropdownItem label="Compartilhar" />
      <DropdownItem label="Excluir" />
    </Dropdown>
  ),
}

export const WithCustomIcons: Story = {
  render: () => (
    <Dropdown>
      <DropdownItem icon={IconUser} label="Perfil" />
      <DropdownItem icon={IconSettings} label="Configurações" />
      <DropdownItem icon={IconEdit} label="Editar" />
      <DropdownItem icon={IconTrash} label="Excluir" />
      <DropdownItem icon={IconLogout} label="Sair" />
    </Dropdown>
  ),
}

export const ItemStates: Story = {
  render: () => (
    <div className="ds-flex ds-gap-4 ds-items-start">
      <div>
        <p className="ds-text-12 ds-text-neutral-500 ds-mb-2 ds-font-medium">Default</p>
        <Dropdown>
          <DropdownItem icon={IconShare2} label="texto teste" />
        </Dropdown>
      </div>
      <div>
        <p className="ds-text-12 ds-text-neutral-500 ds-mb-2 ds-font-medium">Hover</p>
        <Dropdown>
          <DropdownItem icon={IconShare2} label="texto teste" className="ds-bg-neutral-50" />
        </Dropdown>
      </div>
      <div>
        <p className="ds-text-12 ds-text-neutral-500 ds-mb-2 ds-font-medium">Selecionado</p>
        <Dropdown>
          <DropdownItem icon={IconShare2} label="texto teste" selected />
        </Dropdown>
      </div>
      <div>
        <p className="ds-text-12 ds-text-neutral-500 ds-mb-2 ds-font-medium">Desabilitado</p>
        <Dropdown>
          <DropdownItem icon={IconShare2} label="texto teste" disabled />
        </Dropdown>
      </div>
    </div>
  ),
}

export const WithButtonTrigger: Story = {
  render: () => (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        <Button size="sm" variant="outlined">
          Abrir menu
        </Button>
      </RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          side="bottom"
          align="start"
          sideOffset={8}
          className="ds-p-0 ds-bg-transparent ds-shadow-none"
        >
          <Dropdown>
            <DropdownItem icon={IconShare2} label="texto teste" />
            <DropdownItem icon={IconShare2} label="texto teste" />
            <DropdownItem icon={IconShare2} label="texto teste" />
          </Dropdown>
          <RadixPopover.Arrow className="ds-fill-white" width={16} height={8} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  ),
}

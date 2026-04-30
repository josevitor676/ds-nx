import type { Meta, StoryObj } from "@storybook/react-vite"
import { FormField } from "./FormField"

const meta = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    mandatory: { control: "boolean" },
    labelClassName: { control: false },
    helperTextClassName: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

const FieldPlaceholder = () => (
  <div className="ds-h-[40px] ds-rounded ds-border ds-border-neutral-300 ds-bg-white ds-px-[12px] ds-flex ds-items-center">
    <span className="ds-text-[14px] ds-text-neutral-400">Conteúdo do campo</span>
  </div>
)

export const Default: Story = {
  args: {
    label: "Label",
    children: <FieldPlaceholder />,
  },
}

export const WithHelperText: Story = {
  args: {
    label: "Email",
    helperText: "Insira um e-mail válido.",
    children: <FieldPlaceholder />,
  },
}

export const Mandatory: Story = {
  args: {
    label: "Campo obrigatório",
    mandatory: true,
    helperText: "Este campo é obrigatório.",
    children: <FieldPlaceholder />,
  },
}

export const SemLabel: Story = {
  name: "Sem Label",
  args: {
    helperText: "Texto auxiliar sem label.",
    children: <FieldPlaceholder />,
  },
}

export const ErrorState: Story = {
  name: "Com erro",
  args: {
    label: "Senha",
    mandatory: true,
    helperText: "A senha deve ter no mínimo 8 caracteres.",
    labelClassName: "ds-text-[14px] ds-font-medium ds-text-neutral-700",
    helperTextClassName: "ds-text-[12px] ds-text-error-500",
    children: (
      <div className="ds-h-[40px] ds-rounded ds-border ds-border-error-500 ds-bg-white ds-px-[12px] ds-flex ds-items-center">
        <span className="ds-text-[14px] ds-text-neutral-400">••••••••</span>
      </div>
    ),
  },
}

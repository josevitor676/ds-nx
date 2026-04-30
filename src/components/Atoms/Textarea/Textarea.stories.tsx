import type { Meta, StoryObj } from "@storybook/react-vite"
import React, { useState } from "react"
import { Textarea } from "./Textarea"

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    state: { control: "select", options: ["default", "hover", "filled", "error"] },
  },
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: { label: "Descrição", placeholder: "Digite aqui...", state: "default" },
}
export const Mandatory: Story = {
  args: { label: "Motivo", mandatory: true, placeholder: "Digite aqui...", state: "default" },
}
export const Error: Story = {
  args: { label: "Descrição", state: "error", helperText: "Campo obrigatório." },
}
export const Disabled: Story = { args: { label: "Descrição", disabled: true } }

export const AllStates: Story = {
  render: () => (
    <div className="ds-flex ds-flex-col ds-gap-6 ds-w-[320px]">
      <Textarea label="Padrão" state="default" placeholder="Digite aqui..." />
      <Textarea label="Hover" state="hover" placeholder="Digite aqui..." />
      <Textarea label="Preenchido" state="filled" placeholder="Texto preenchido..." />
      <Textarea
        label="Erro"
        state="error"
        placeholder="Digite aqui..."
        helperText="Campo obrigatório."
      />
      <Textarea label="Desabilitado" disabled placeholder="Digite aqui..." />
    </div>
  ),
}

export const WithHelperText: Story = {
  args: { label: "Descrição", helperText: "Texto auxiliar", placeholder: "Digite aqui..." },
}

export const Filled: Story = {
  args: {
    label: "Descrição",
    state: "filled",
    value: "Texto preenchido",
    placeholder: "Digite aqui...",
  },
}

const FeedbackForm = () => {
  const [value, setValue] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim().length < 10) {
      setErrorMsg("Escreva pelo menos 10 caracteres.")
      return
    }
    setErrorMsg("")
    setSubmitted(true)
  }

  const handleReset = () => {
    setValue("")
    setSubmitted(false)
    setErrorMsg("")
  }

  const state: "default" | "error" | "filled" = submitted
    ? "filled"
    : errorMsg
      ? "error"
      : "default"

  return (
    <div className="ds-w-[360px]">
      <h3 className="ds-text-[16px] ds-font-semibold ds-mb-4 ds-text-neutral-800">
        Deixe seu feedback
      </h3>

      {submitted ? (
        <div className="ds-p-4 ds-rounded ds-border ds-border-success-200 ds-bg-success-50 ds-text-[14px] ds-text-success-700">
          Obrigado pelo seu feedback! ✓
          <button
            type="button"
            onClick={handleReset}
            className="ds-ml-3 ds-underline ds-text-[12px] ds-text-neutral-600"
          >
            Novo feedback
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="ds-flex ds-flex-col ds-gap-4">
          <Textarea
            label="Comentário"
            mandatory
            state={state}
            value={value}
            placeholder="Conte-nos sua experiência..."
            helperText={errorMsg || `${value.length} / 300 caracteres`}
            onChange={(e) => {
              setValue(e.target.value.slice(0, 300))
              if (errorMsg) setErrorMsg("")
            }}
          />

          <div className="ds-flex ds-gap-2 ds-justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="ds-px-4 ds-py-2 ds-text-[14px] ds-rounded ds-border ds-border-neutral-200 ds-text-neutral-600 hover:ds-bg-neutral-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="ds-px-4 ds-py-2 ds-text-[14px] ds-rounded ds-bg-primary-500 ds-text-white hover:ds-bg-primary-700"
            >
              Enviar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export const FeedbackFormStory: Story = {
  name: "Formulário de Feedback",
  render: () => <FeedbackForm />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { Textarea } from './Textarea';

function FeedbackForm() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length < 10) {
      setErrorMsg('Escreva pelo menos 10 caracteres.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const state = submitted ? 'filled' : errorMsg ? 'error' : 'default';

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        label="Comentário"
        mandatory
        state={state}
        value={value}
        placeholder="Conte-nos sua experiência..."
        helperText={errorMsg || \`\${value.length} / 300 caracteres\`}
        onChange={(e) => setValue(e.target.value.slice(0, 300))}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FeedbackForm;`,
      },
    },
  },
}

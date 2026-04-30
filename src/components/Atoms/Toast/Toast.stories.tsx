import type { Meta, StoryObj } from "@storybook/react-vite"
import React from "react"
import { Toast } from "./Toast"
import type { ToastPosition } from "./toast.types"
import { ToastProvider } from "./ToastProvider"
import { useToast } from "./useToast"

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      description: "Variante visual e semântica do toast.",
      control: "select",
      options: ["success", "information", "warning", "error"],
      table: {
        type: { summary: '"success" | "information" | "warning" | "error"' },
        defaultValue: { summary: "information" },
      },
    },
    title: {
      description: "Texto principal do toast.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    subTitle: {
      description: "Texto secundário opcional.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    onClose: {
      description: "Callback do botão fechar. Quando informado, exibe o botão.",
      control: false,
      table: { type: { summary: "() => void" } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

// ── Default (Playground) ─────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: "Título do toast",
    subTitle: "Descrição complementar da notificação.",
    type: "information",
  },
}

// ── Types ────────────────────────────────────────────────────────────────────

export const Types: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div className="ds-flex ds-flex-col ds-gap-3">
      <Toast
        title="Operação concluída"
        subTitle="Os dados foram salvos com sucesso."
        type="success"
      />
      <Toast
        title="Informação"
        subTitle="Verifique os detalhes antes de continuar."
        type="information"
      />
      <Toast title="Atenção" subTitle="Revise os campos antes de prosseguir." type="warning" />
      <Toast title="Erro" subTitle="Não foi possível completar a operação." type="error" />
    </div>
  ),
}

// ── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div className="ds-flex ds-flex-col ds-gap-3">
      <Toast title="Somente título" type="success" />
      <Toast title="Com subtítulo" subTitle="Informação complementar." type="information" />
      <Toast
        title="Com botão fechar"
        subTitle="O usuário pode dispensar manualmente."
        type="warning"
        onClose={() => {}}
      />
    </div>
  ),
}

// ── Interativo ───────────────────────────────────────────────────────────────

const InteractiveDemo = ({
  position = "top-right",
  duration = 3000,
}: {
  position?: ToastPosition
  duration?: number
}) => {
  const { toast } = useToast()

  return (
    <div className="ds-flex ds-flex-col ds-gap-[8px]">
      {(["success", "information", "warning", "error"] as const).map((type) => (
        <button
          key={type}
          type="button"
          onClick={() =>
            toast({
              title: `Toast ${type}`,
              subTitle: "Descrição complementar.",
              type,
              duration,
              position,
            })
          }
          className="ds-px-[14px] ds-py-[8px] ds-rounded ds-border ds-border-neutral-200 ds-text-[14px] ds-font-medium ds-cursor-pointer hover:ds-bg-neutral-50 ds-transition-colors ds-capitalize"
        >
          Disparar {type}
        </button>
      ))}
    </div>
  )
}

export const Interativo: StoryObj = {
  render: () => (
    <ToastProvider defaultPosition="top-right" defaultDuration={3000}>
      <InteractiveDemo />
    </ToastProvider>
  ),
}

// Usado apenas no MDX para exibir source code correto
export const InterativoDocs: StoryObj = {
  tags: ["!sidebar"],
  render: () => (
    <ToastProvider defaultPosition="top-right" defaultDuration={3000}>
      <InteractiveDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { ToastProvider, useToast } from '@gazin/design-system';

function Demo() {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
      <button onClick={() => toast({ title: 'Sucesso', subTitle: 'Operação concluída.', type: 'success' })}>
        Disparar sucesso
      </button>
      <button onClick={() => toast({ title: 'Informação', subTitle: 'Verifique os detalhes.', type: 'information' })}>
        Disparar informação
      </button>
      <button onClick={() => toast({ title: 'Atenção', subTitle: 'Revise os campos.', type: 'warning' })}>
        Disparar aviso
      </button>
      <button onClick={() => toast({ title: 'Erro', subTitle: 'Algo deu errado.', type: 'error' })}>
        Disparar erro
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider defaultPosition="top-right" defaultDuration={3000}>
      <Demo />
    </ToastProvider>
  );
}`,
      },
    },
  },
}

// ── Posição Customizada ───────────────────────────────────────────────────────

const positions: ToastPosition[] = [
  "top-right",
  "top-left",
  "top-center",
  "bottom-right",
  "bottom-left",
  "bottom-center",
]

function PosicaoCustomizadaDemo() {
  const [position, setPosition] = React.useState<ToastPosition>("top-right")
  const [duration, setDuration] = React.useState(3000)

  return (
    <ToastProvider defaultPosition={position} defaultDuration={duration}>
      <div className="ds-flex ds-flex-col ds-gap-[12px]">
        <div className="ds-flex ds-gap-[8px] ds-flex-wrap">
          {positions.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPosition(p)}
              className={[
                "ds-px-[10px] ds-py-[6px] ds-rounded ds-border ds-text-[12px] ds-cursor-pointer ds-transition-colors",
                position === p
                  ? "ds-bg-primary-500 ds-text-white ds-border-primary-500"
                  : "ds-border-neutral-200 hover:ds-bg-neutral-50",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="ds-flex ds-items-center ds-gap-[8px]">
          <span className="ds-text-[12px] ds-text-neutral-600">Duração (ms):</span>
          {[1500, 3000, 5000, 0].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={[
                "ds-px-[10px] ds-py-[6px] ds-rounded ds-border ds-text-[12px] ds-cursor-pointer ds-transition-colors",
                duration === d
                  ? "ds-bg-primary-500 ds-text-white ds-border-primary-500"
                  : "ds-border-neutral-200 hover:ds-bg-neutral-50",
              ].join(" ")}
            >
              {d === 0 ? "∞" : `${d}ms`}
            </button>
          ))}
        </div>
        <InteractiveDemo position={position} duration={duration} />
      </div>
    </ToastProvider>
  )
}

export const PosicaoCustomizada: StoryObj = {
  render: () => <PosicaoCustomizadaDemo />,
}

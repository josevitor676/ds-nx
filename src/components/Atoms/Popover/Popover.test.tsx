import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Button } from "../Button/Button"
import { Popover } from "./Popover"

/**
 * Popover Component Tests
 */
describe("Popover", () => {
  it("renderiza o trigger sem abrir o popover", () => {
    // O trigger deve ser visível mesmo com popover fechado
    render(<Popover trigger={<Button>Abrir</Button>} description="Conteúdo" />)
    expect(screen.getByRole("button", { name: "Abrir" })).toBeInTheDocument()
  })

  it("abre o popover ao clicar no trigger (open=true)", () => {
    // Forçar abertura deve exibir o conteúdo do popover
    render(
      <Popover
        trigger={<Button>Abrir</Button>}
        title="Título do Popover"
        description="Descrição aqui"
        open
      />
    )
    expect(screen.getByText("Título do Popover")).toBeInTheDocument()
    expect(screen.getByText("Descrição aqui")).toBeInTheDocument()
  })

  it("exibe botões primário e secundário quando aberto", () => {
    // Botões de ação devem aparecer no popover aberto
    render(
      <Popover
        trigger={<Button>Abrir</Button>}
        primaryLabel="Confirmar"
        secondaryLabel="Cancelar"
        open
      />
    )
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument()
  })

  it("chama onPrimary ao clicar no botão primário", async () => {
    // Clique no botão primário deve disparar callback
    const user = userEvent.setup()
    const onPrimary = vi.fn()
    render(
      <Popover
        trigger={<Button>Abrir</Button>}
        primaryLabel="Confirmar"
        onPrimary={onPrimary}
        open
      />
    )
    await user.click(screen.getByRole("button", { name: "Confirmar" }))
    expect(onPrimary).toHaveBeenCalled()
  })

  it("chama onSecondary ao clicar no botão secundário", async () => {
    // Clique no botão secundário deve disparar callback
    const user = userEvent.setup()
    const onSecondary = vi.fn()
    render(
      <Popover
        trigger={<Button>Abrir</Button>}
        secondaryLabel="Cancelar"
        onSecondary={onSecondary}
        open
      />
    )
    await user.click(screen.getByRole("button", { name: "Cancelar" }))
    expect(onSecondary).toHaveBeenCalled()
  })

  it("chama onOpenChange ao interagir com o trigger", async () => {
    // Clicar no trigger deve notificar mudança de estado
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Popover
        trigger={<Button>Toggle</Button>}
        description="Conteúdo"
        onOpenChange={onOpenChange}
      />
    )
    await user.click(screen.getByRole("button", { name: "Toggle" }))
    expect(onOpenChange).toHaveBeenCalled()
  })

  it("exibe contador quando counter é fornecido", () => {
    // O contador deve aparecer no cabeçalho do popover
    render(<Popover trigger={<Button>Abrir</Button>} counter="3/10" open />)
    expect(screen.getByText("3/10")).toBeInTheDocument()
  })
})

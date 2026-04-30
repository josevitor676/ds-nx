import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Button } from "../Button/Button"
import { Tooltip, TooltipProvider } from "./Tooltip"

/**
 * Tooltip Component Tests
 */
describe("Tooltip", () => {
  it("renderiza o elemento trigger sem exibir o tooltip", () => {
    // O conteúdo do trigger deve estar sempre visível
    render(
      <TooltipProvider>
        <Tooltip description="Dica útil">
          <Button>Hover aqui</Button>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByRole("button", { name: "Hover aqui" })).toBeInTheDocument()
  })

  it("exibe a descrição ao fazer hover no trigger", async () => {
    // O conteúdo do tooltip deve aparecer após hover (via role=tooltip)
    const user = userEvent.setup()
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip description="Descrição visível">
          <Button>Trigger</Button>
        </Tooltip>
      </TooltipProvider>
    )
    await user.hover(screen.getByRole("button", { name: "Trigger" }))
    // Radix duplica o texto em span[role=tooltip] — usar findAllByText
    const matches = await screen.findAllByText("Descrição visível")
    expect(matches.length).toBeGreaterThan(0)
  })

  it("exibe o title quando fornecido", async () => {
    // Título do tooltip deve aparecer junto à descrição
    const user = userEvent.setup()
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip title="Título do Tooltip" description="Descrição">
          <Button>Info</Button>
        </Tooltip>
      </TooltipProvider>
    )
    await user.hover(screen.getByRole("button", { name: "Info" }))
    const titleMatches = await screen.findAllByText("Título do Tooltip")
    expect(titleMatches.length).toBeGreaterThan(0)
  })

  it("não exibe tooltip antes do hover", () => {
    // Antes da interação, o conteúdo do tooltip não deve existir no DOM
    render(
      <TooltipProvider>
        <Tooltip description="Oculto">
          <Button>Sem hover</Button>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.queryByText("Oculto")).not.toBeInTheDocument()
  })

  it("TooltipProvider renderiza seus filhos corretamente", () => {
    // O provider não deve interferir na renderização dos filhos
    render(
      <TooltipProvider>
        <span data-testid="filho">Filho</span>
      </TooltipProvider>
    )
    expect(screen.getByTestId("filho")).toBeInTheDocument()
  })

  it("trigger aparece após hover com descrição acessível via role=tooltip", async () => {
    // Radix renderiza o conteúdo do tooltip em span[role=tooltip]
    const user = userEvent.setup()
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip description="Conteúdo acessível">
          <Button>Trigger</Button>
        </Tooltip>
      </TooltipProvider>
    )
    await user.hover(screen.getByRole("button", { name: "Trigger" }))
    const tooltips = await screen.findAllByRole("tooltip")
    expect(tooltips.length).toBeGreaterThan(0)
  })
})

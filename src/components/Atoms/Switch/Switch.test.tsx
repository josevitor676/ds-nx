import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Switch } from "./Switch"

/**
 * Switch Component Tests
 */
describe("Switch", () => {
  it("renderiza com role='switch'", () => {
    // O componente deve ser identificável como switch
    render(<Switch />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("tem aria-checked=false por padrão", () => {
    // Estado inicial deve ser desligado
    render(<Switch />)
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false")
  })

  it("tem aria-checked=true quando checked=true", () => {
    // Switch ligado deve ter marcação correta
    render(<Switch checked />)
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true")
  })

  it("chama onChange ao ser clicado", async () => {
    // Clique deve disparar callback com o novo estado
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Switch onChange={onChange} />)
    await user.click(screen.getByRole("switch"))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it("não dispara onChange quando desabilitado", async () => {
    // Switch desabilitado não deve reagir a cliques
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Switch disabled onChange={onChange} />)
    await user.click(screen.getByRole("switch"))
    expect(onChange).not.toHaveBeenCalled()
  })

  it("renderiza o label quando fornecido", () => {
    // Texto do label deve ser visível ao lado do switch
    render(<Switch label="Modo escuro" />)
    expect(screen.getByText("Modo escuro")).toBeInTheDocument()
  })

  it("encaminha ref para o wrapper raiz", () => {
    // A ref deve apontar para o <div> wrapper do Switch
    const ref = React.createRef<HTMLDivElement>()
    render(<Switch ref={ref} />)
    expect(ref.current).toBeInTheDocument()
  })
})

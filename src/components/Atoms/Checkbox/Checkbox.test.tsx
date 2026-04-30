import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Checkbox } from "./Checkbox"

/**
 * Checkbox Component Tests
 */
describe("Checkbox", () => {
  it("renderiza o label informado", () => {
    // O texto do label deve ser visível ao lado do checkbox
    render(<Checkbox label="Aceito os termos" value="uncheck" />)
    expect(screen.getByText("Aceito os termos")).toBeInTheDocument()
  })

  it("renderiza estado 'uncheck' por padrão", () => {
    // Estado inicial sem marcação deve ter aria-checked=false
    render(<Checkbox label="Item" value="uncheck" />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveAttribute("aria-checked", "false")
  })

  it("renderiza estado 'check' corretamente", () => {
    // Estado marcado deve ter aria-checked=true
    render(<Checkbox label="Item" value="check" />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveAttribute("aria-checked", "true")
  })

  it("renderiza estado 'indeterminate' corretamente", () => {
    // Estado indeterminado deve ter aria-checked=mixed
    render(<Checkbox label="Item" value="indeterminate" />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveAttribute("aria-checked", "mixed")
  })

  it("chama onChange ao ser clicado", async () => {
    // O callback deve ser disparado ao interagir com o checkbox
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Clicável" value="uncheck" onChange={onChange} />)
    await user.click(screen.getByRole("checkbox"))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it("fica desabilitado quando disabled=true", async () => {
    // Checkbox desabilitado não deve reagir a cliques
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Bloqueado" value="uncheck" disabled onChange={onChange} />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeDisabled()
    await user.click(checkbox)
    expect(onChange).not.toHaveBeenCalled()
  })

  it("encaminha ref para o elemento button", () => {
    // A ref deve referenciar o elemento <button> do checkbox
    const ref = React.createRef<HTMLButtonElement>()
    render(<Checkbox label="Ref" value="uncheck" ref={ref} />)
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("BUTTON")
  })
})

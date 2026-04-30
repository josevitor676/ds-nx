import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { RadioField } from "./RadioField"

/**
 * RadioField Component Tests
 */
describe("RadioField", () => {
  it("renderiza o radio com label", () => {
    // O label deve estar visível ao lado do radio
    render(<RadioField label="Opção A" value="a" />)
    expect(screen.getByText("Opção A")).toBeInTheDocument()
    expect(screen.getByRole("radio")).toBeInTheDocument()
  })

  it("fica marcado quando value === selectedValue", () => {
    // Radio selecionado deve ter aria-checked=true
    render(<RadioField label="Sim" value="sim" selectedValue="sim" />)
    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "true")
  })

  it("fica desmarcado quando value !== selectedValue", () => {
    // Radio não selecionado deve ter aria-checked=false
    render(<RadioField label="Não" value="nao" selectedValue="sim" />)
    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "false")
  })

  it("chama onChange com o value correto ao clicar", async () => {
    // Ao clicar, o callback recebe o value do radio
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<RadioField label="Opção B" value="b" onChange={onChange} />)
    await user.click(screen.getByRole("radio"))
    expect(onChange).toHaveBeenCalledWith("b")
  })

  it("fica desabilitado quando disabled=true", async () => {
    // Radio desabilitado não deve disparar onChange
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<RadioField label="Bloqueado" value="x" disabled onChange={onChange} />)
    const radio = screen.getByRole("radio")
    expect(radio).toBeDisabled()
    await user.click(radio)
    expect(onChange).not.toHaveBeenCalled()
  })

  it("encaminha ref para o elemento button", () => {
    // A ref deve apontar para o <button> com role radio
    const ref = React.createRef<HTMLButtonElement>()
    render(<RadioField label="Ref" value="r" ref={ref} />)
    expect(ref.current?.tagName).toBe("BUTTON")
  })

  it("aceita eventos de teclado (Space/Enter)", async () => {
    // Deve ser possível acionar o radio com teclado
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<RadioField label="Teclado" value="t" onChange={onChange} />)
    const radio = screen.getByRole("radio")
    radio.focus()
    await user.keyboard(" ")
    expect(onChange).toHaveBeenCalledWith("t")
  })
})

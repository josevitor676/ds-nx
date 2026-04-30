import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it } from "vitest"
import { Textarea } from "./Textarea"

/**
 * Textarea Component Tests
 */
describe("Textarea", () => {
  it("renderiza o campo textarea", () => {
    // O elemento textbox deve estar presente no DOM
    render(<Textarea />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("exibe o label quando fornecido", () => {
    // O label deve aparecer acima do textarea
    render(<Textarea label="Observações" />)
    expect(screen.getByText("Observações")).toBeInTheDocument()
  })

  it("exibe helperText quando fornecido", () => {
    // Texto de ajuda deve ser visível abaixo do campo
    render(<Textarea helperText="Máximo 500 caracteres" />)
    expect(screen.getByText("Máximo 500 caracteres")).toBeInTheDocument()
  })

  it("exibe asterisco quando mandatory=true", () => {
    // Campo obrigatório deve ter indicador visual
    render(<Textarea label="Descrição" mandatory />)
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("exibe placeholder padrão", () => {
    // O placeholder deve ser 'Digite aqui...' por padrão
    render(<Textarea />)
    expect(screen.getByPlaceholderText("Digite aqui...")).toBeInTheDocument()
  })

  it("fica desabilitado quando disabled=true", async () => {
    // Textarea desabilitado não deve aceitar digitação
    const user = userEvent.setup()
    render(<Textarea disabled />)
    const ta = screen.getByRole("textbox")
    expect(ta).toBeDisabled()
    await user.type(ta, "texto")
    expect(ta).toHaveValue("")
  })

  it("encaminha ref para o elemento textarea", () => {
    // A ref deve apontar para o <textarea> nativo
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} />)
    expect(ref.current?.tagName).toBe("TEXTAREA")
  })
})

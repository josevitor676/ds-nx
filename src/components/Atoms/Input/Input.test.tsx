import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it } from "vitest"
import { Input } from "./Input"

/**
 * Input Component Tests
 */
describe("Input", () => {
  it("renderiza o campo de input", () => {
    // O input deve estar acessível no DOM
    render(<Input />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("exibe o label quando informado", () => {
    // O label deve aparecer associado ao campo
    render(<Input label="Nome" />)
    expect(screen.getByText("Nome")).toBeInTheDocument()
  })

  it("exibe o helperText abaixo do campo", () => {
    // Texto auxiliar deve ser visível abaixo do input
    render(<Input helperText="Informe seu nome completo" />)
    expect(screen.getByText("Informe seu nome completo")).toBeInTheDocument()
  })

  it("exibe placeholder padrão", () => {
    // Placeholder padrão deve ser 'Digite aqui...'
    render(<Input />)
    expect(screen.getByPlaceholderText("Digite aqui...")).toBeInTheDocument()
  })

  it("fica desabilitado quando disabled=true", async () => {
    // Input desabilitado não deve aceitar digitação
    const user = userEvent.setup()
    render(<Input disabled />)
    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
    await user.type(input, "texto")
    expect(input).toHaveValue("")
  })

  it("encaminha ref para o elemento input", () => {
    // A ref deve referenciar o elemento <input> nativo
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("INPUT")
  })

  it("repassa atributos HTML como data-testid e placeholder", () => {
    // Atributos extras devem chegar ao input nativo
    render(<Input data-testid="input-teste" placeholder="Busque aqui" />)
    const input = screen.getByTestId("input-teste")
    expect(input).toHaveAttribute("placeholder", "Busque aqui")
  })
})

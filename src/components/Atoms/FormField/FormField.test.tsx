import { render, screen } from "@testing-library/react"
import React from "react"
import { describe, expect, it } from "vitest"
import { FormField } from "./FormField"

/**
 * FormField Component Tests
 */
describe("FormField", () => {
  it("renderiza o label informado", () => {
    // O texto do label deve ser visível no campo
    render(
      <FormField label="Nome completo">
        <input />
      </FormField>
    )
    expect(screen.getByText("Nome completo")).toBeInTheDocument()
  })

  it("renderiza o helperText abaixo do campo", () => {
    // Texto de ajuda deve aparecer abaixo do input
    render(
      <FormField helperText="Informe seu nome">
        <input />
      </FormField>
    )
    expect(screen.getByText("Informe seu nome")).toBeInTheDocument()
  })

  it("exibe asterisco e texto 'obrigatório' quando mandatory=true", () => {
    // Campo obrigatório deve ter indicador visual e texto acessível
    render(
      <FormField label="Email" mandatory>
        <input />
      </FormField>
    )
    expect(screen.getByText("*")).toBeInTheDocument()
    expect(screen.getByText("(obrigatório)")).toBeInTheDocument()
  })

  it("associa label ao input através de htmlFor/id", () => {
    // O clique no label deve focar no input correto
    render(
      <FormField id="campo-nome" label="Nome">
        <input id="campo-nome" />
      </FormField>
    )
    const label = screen.getByText("Nome")
    expect(label.closest("label") ?? label).toHaveAttribute("for", "campo-nome")
  })

  it("injeta aria-required no filho quando mandatory=true", () => {
    // O elemento filho deve receber aria-required=true automaticamente
    render(
      <FormField mandatory>
        <input />
      </FormField>
    )
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-required", "true")
  })

  it("encaminha ref para o elemento raiz", () => {
    // A ref deve referenciar o <div> wrapper do FormField
    const ref = React.createRef<HTMLDivElement>()
    render(
      <FormField ref={ref}>
        <input />
      </FormField>
    )
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("DIV")
  })

  it("renderiza children sem label ou helperText", () => {
    // Uso mínimo — apenas children — deve funcionar sem erros
    render(
      <FormField>
        <input data-testid="field-input" />
      </FormField>
    )
    expect(screen.getByTestId("field-input")).toBeInTheDocument()
  })
})

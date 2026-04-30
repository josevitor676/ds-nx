import { render, screen } from "@testing-library/react"
import React from "react"
import { describe, expect, it } from "vitest"
import { Divider } from "./Divider"

/**
 * Divider Component Tests
 */
describe("Divider", () => {
  it("renderiza com role='separator'", () => {
    // O divisor deve ser semanticamente identificável como separador
    render(<Divider />)
    expect(screen.getByRole("separator")).toBeInTheDocument()
  })

  it("tem orientação horizontal por padrão", () => {
    // Orientação padrão deve ser horizontal
    render(<Divider />)
    const sep = screen.getByRole("separator")
    expect(sep).toHaveAttribute("aria-orientation", "horizontal")
  })

  it("aplica orientação vertical quando informado", () => {
    // Orientação vertical deve ser repassada via aria-orientation
    render(<Divider orientation="vertical" />)
    const sep = screen.getByRole("separator")
    expect(sep).toHaveAttribute("aria-orientation", "vertical")
  })

  it("encaminha ref para o elemento raiz", () => {
    // A ref deve referenciar o <div> do divisor
    const ref = React.createRef<HTMLDivElement>()
    render(<Divider ref={ref} />)
    expect(ref.current).toBeInTheDocument()
  })

  it("aplica className customizado", () => {
    // Classes extras devem ser adicionadas ao elemento
    const { container } = render(<Divider className="meu-divider" />)
    expect(container.firstChild).toHaveClass("meu-divider")
  })

  it("repassa atributos HTML adicionais", () => {
    // data-testid e outros atributos devem ser repassados ao elemento
    render(<Divider data-testid="divider-custom" />)
    expect(screen.getByTestId("divider-custom")).toBeInTheDocument()
  })
})

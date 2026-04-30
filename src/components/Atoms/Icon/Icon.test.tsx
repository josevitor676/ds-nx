import { IconSearch, IconStar } from "@tabler/icons-react"
import { render } from "@testing-library/react"
import React from "react"
import { describe, expect, it } from "vitest"
import { Icon } from "./Icon"

/**
 * Icon Component Tests
 */
describe("Icon", () => {
  it("renderiza um SVG para o ícone informado", () => {
    // O componente deve renderizar o ícone como SVG
    const { container } = render(<Icon icon={IconSearch} />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("aplica aria-hidden para ocultar do leitor de tela", () => {
    // Ícones decorativos devem ser ocultos para acessibilidade
    const { container } = render(<Icon icon={IconStar} />)
    const svg = container.querySelector("svg")
    expect(svg).toHaveAttribute("aria-hidden", "true")
  })

  it("aplica tamanho 16px para size='sm'", () => {
    // Tamanho semântico sm deve gerar width/height de 16
    const { container } = render(<Icon icon={IconSearch} size="sm" />)
    const svg = container.querySelector("svg")
    expect(svg).toHaveAttribute("width", "16")
  })

  it("aplica tamanho 20px para size='md' (padrão)", () => {
    // Tamanho padrão md deve gerar width/height de 20
    const { container } = render(<Icon icon={IconSearch} size="md" />)
    const svg = container.querySelector("svg")
    expect(svg).toHaveAttribute("width", "20")
  })

  it("aplica tamanho 24px para size='lg'", () => {
    // Tamanho semântico lg deve gerar width/height de 24
    const { container } = render(<Icon icon={IconSearch} size="lg" />)
    const svg = container.querySelector("svg")
    expect(svg).toHaveAttribute("width", "24")
  })

  it("encaminha ref para o elemento SVG", () => {
    // A ref deve apontar para o elemento <svg> do ícone
    const ref = React.createRef<SVGSVGElement>()
    const { container } = render(<Icon icon={IconSearch} ref={ref} />)
    expect(ref.current).toBe(container.querySelector("svg"))
  })
})

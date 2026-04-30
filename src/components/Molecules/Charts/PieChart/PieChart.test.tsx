import { render } from "@testing-library/react"
import React from "react"
import { describe, expect, it } from "vitest"
import { PieChart } from "./PieChart"

const sampleData = [
  { name: "Categoria A", value: 400 },
  { name: "Categoria B", value: 300 },
  { name: "Categoria C", value: 200 },
]

describe("PieChart", () => {
  it("renderiza o container do gráfico", () => {
    // O wrapper div deve estar présente no DOM
    const { container } = render(<PieChart data={sampleData} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("aceita className customizada no container", () => {
    // A prop className deve ser adicionada ao elemento raiz
    const { container } = render(<PieChart data={sampleData} className="custom-pie" />)
    expect(container.firstChild).toHaveClass("custom-pie")
  })

  it("aplica altura customizada via prop height", () => {
    // O estilo inline height deve sobrescrever o tamanho do variant
    const { container } = render(<PieChart data={sampleData} height={300} />)
    expect(container.firstChild).toHaveStyle({ height: "300px" })
  })

  it("aplica a variante de tamanho sm via prop size", () => {
    // A classe CVA do tamanho sm deve estar no container
    const { container } = render(<PieChart data={sampleData} size="sm" />)
    expect(container.firstChild).toHaveClass("ds-h-40")
  })

  it("aplica a variante de tamanho lg via prop size", () => {
    // A classe CVA do tamanho lg deve estar no container
    const { container } = render(<PieChart data={sampleData} size="lg" />)
    expect(container.firstChild).toHaveClass("ds-h-80")
  })

  it("renderiza gráfico de rosca com innerRadius", () => {
    // A prop innerRadius deve ser aceita sem erros
    expect(() => render(<PieChart data={sampleData} innerRadius={60} />)).not.toThrow()
  })

  it("encaminha ref para o elemento div raiz", () => {
    // A ref deve apontar para o <div> container do gráfico
    const ref = React.createRef<HTMLDivElement>()
    render(<PieChart ref={ref} data={sampleData} />)
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("DIV")
  })

  it("renderiza sem dados sem lançar erro", () => {
    // Array de dados vazio não deve causar crash
    expect(() => render(<PieChart data={[]} />)).not.toThrow()
  })
})

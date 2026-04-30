import { render } from "@testing-library/react"
import React from "react"
import { describe, expect, it } from "vitest"
import { BarChart } from "./BarChart"

const sampleData = [
  { name: "Jan", vendas: 400 },
  { name: "Fev", vendas: 300 },
  { name: "Mar", vendas: 600 },
]

const sampleBars = [{ dataKey: "vendas", label: "Vendas" }]

describe("BarChart", () => {
  it("renderiza o container do gráfico", () => {
    // O wrapper div deve estar présente no DOM
    const { container } = render(<BarChart data={sampleData} bars={sampleBars} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("aceita className customizada no container", () => {
    // A prop className deve ser adicionada ao elemento raiz
    const { container } = render(
      <BarChart data={sampleData} bars={sampleBars} className="custom-chart" />
    )
    expect(container.firstChild).toHaveClass("custom-chart")
  })

  it("aplica altura customizada via prop height", () => {
    // O estilo inline height deve sobrescrever o tamanho do variant
    const { container } = render(<BarChart data={sampleData} bars={sampleBars} height={400} />)
    expect(container.firstChild).toHaveStyle({ height: "400px" })
  })

  it("renderiza múltiplas séries de barras", () => {
    // Barras com diferentes dataKeys devem ser incluídas no DOM
    const multipleBars = [
      { dataKey: "vendas", label: "Vendas" },
      { dataKey: "despesas", label: "Despesas" },
    ]
    const dataWithTwo = [{ name: "Jan", vendas: 400, despesas: 200 }]
    const { container } = render(<BarChart data={dataWithTwo} bars={multipleBars} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("aplica a variante de tamanho sm via prop size", () => {
    // A classe CVA do tamanho sm deve estar no container
    const { container } = render(<BarChart data={sampleData} bars={sampleBars} size="sm" />)
    expect(container.firstChild).toHaveClass("ds-h-40")
  })

  it("aplica a variante de tamanho lg via prop size", () => {
    // A classe CVA do tamanho lg deve estar no container
    const { container } = render(<BarChart data={sampleData} bars={sampleBars} size="lg" />)
    expect(container.firstChild).toHaveClass("ds-h-80")
  })

  it("encaminha ref para o elemento div raiz", () => {
    // A ref deve apontar para o <div> container do gráfico
    const ref = React.createRef<HTMLDivElement>()
    render(<BarChart ref={ref} data={sampleData} bars={sampleBars} />)
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("DIV")
  })

  it("renderiza sem dados sem lançar erro", () => {
    // Array de dados vazio não deve causar crash
    expect(() => render(<BarChart data={[]} bars={sampleBars} />)).not.toThrow()
  })
})

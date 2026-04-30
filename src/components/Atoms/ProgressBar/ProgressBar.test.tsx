import { IconTrash } from "@tabler/icons-react"
import { render, screen } from "@testing-library/react"
import React from "react"
import { describe, expect, it } from "vitest"
import { ProgressBar } from "./ProgressBar"

/**
 * ProgressBar Component Tests
 */
describe("ProgressBar", () => {
  it("renderiza com role='progressbar'", () => {
    // O elemento deve ser semanticamente identificável como barra de progresso
    render(<ProgressBar value={50} />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("define aria-valuenow com o valor informado", () => {
    // O valor atual deve ser exposto via atributo ARIA
    render(<ProgressBar value={75} />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75")
  })

  it("define aria-valuemin=0 e aria-valuemax=100", () => {
    // Mínimo e máximo padrões devem estar presentes
    render(<ProgressBar value={30} />)
    const pb = screen.getByRole("progressbar")
    expect(pb).toHaveAttribute("aria-valuemin", "0")
    expect(pb).toHaveAttribute("aria-valuemax", "100")
  })

  it("exibe o label de porcentagem quando showLabel=true", () => {
    // O valor em % deve ser exibido visualmente
    render(<ProgressBar value={42} showLabel />)
    expect(screen.getByText("42%")).toBeInTheDocument()
  })

  it("clampeia valor acima de 100 para 100", () => {
    // Valores fora do limite devem ser normalizados
    render(<ProgressBar value={150} />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100")
  })

  it("renderiza botão de ação quando icon é fornecido", () => {
    // Ícone de ação deve aparecer ao lado da barra
    render(<ProgressBar value={50} icon={<IconTrash />} iconAriaLabel="Remover" />)
    expect(screen.getByRole("button", { name: "Remover" })).toBeInTheDocument()
  })

  it("encaminha ref para o elemento raiz", () => {
    // A ref deve apontar para o wrapper <div> da barra
    const ref = React.createRef<HTMLDivElement>()
    render(<ProgressBar value={50} ref={ref} />)
    expect(ref.current).toBeInTheDocument()
  })
})

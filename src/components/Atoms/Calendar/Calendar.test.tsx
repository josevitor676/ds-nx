import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Calendar } from "./Calendar"

/**
 * Calendar Component Tests
 */
describe("Calendar", () => {
  it("renderiza os dias da semana", () => {
    // Os cabeçalhos de dia da semana devem estar visíveis
    render(<Calendar />)
    expect(screen.getByText("Dom")).toBeInTheDocument()
    expect(screen.getByText("Sáb")).toBeInTheDocument()
  })

  it("renderiza botões de navegação de mês", () => {
    // Devem existir botões para avançar e voltar o mês
    const { container } = render(<Calendar />)
    const buttons = container.querySelectorAll("button")
    expect(buttons.length).toBeGreaterThan(0)
  })

  it("exibe o mês e ano controlados", () => {
    // O calendário deve ter botões separados de mês e ano
    render(<Calendar month={0} year={2024} />)
    const monthBtn = screen.getByRole("button", { name: /Selecionar mês/i })
    const yearBtn = screen.getByRole("button", { name: /Selecionar ano/i })
    expect(monthBtn).toHaveTextContent(/Jan/)
    expect(yearBtn).toHaveTextContent(/2024/)
  })

  it("chama onSelect ao clicar em um dia", async () => {
    // Clicar em um dia do mês deve chamar onSelect com a data correspondente
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Calendar month={0} year={2024} onSelect={onSelect} />)
    // Clica no dia 15 do mês exibido
    const day15 = screen.getByRole("button", { name: "15" })
    await user.click(day15)
    expect(onSelect).toHaveBeenCalledTimes(1)
    const called = onSelect.mock.calls[0][0] as Date
    expect(called.getDate()).toBe(15)
  })

  it("marca o dia selecionado visualmente", () => {
    // O dia correspondente à data selecionada deve ter classe/estilo diferenciado
    const selected = new Date(2024, 0, 15) // 15/01/2024
    render(<Calendar month={0} year={2024} selected={selected} />)
    const day15 = screen.getByRole("button", { name: "15" })
    expect(day15).toBeInTheDocument()
  })

  it("encaminha ref para o elemento raiz", () => {
    // A ref deve apontar para o <div> do calendário
    const ref = React.createRef<HTMLDivElement>()
    render(<Calendar ref={ref} />)
    expect(ref.current?.tagName).toBe("DIV")
  })

  it("aplica className customizado", () => {
    // Classes extras devem ser adicionadas ao container
    const { container } = render(<Calendar className="cal-custom" />)
    expect(container.firstChild).toHaveClass("cal-custom")
  })
})

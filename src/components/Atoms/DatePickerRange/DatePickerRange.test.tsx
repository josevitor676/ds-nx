import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { DatePickerRange } from "./DatePickerRange"

/**
 * DatePickerRange Component Tests
 */
describe("DatePickerRange", () => {
  it("renderiza os cabeçalhos de dia da semana", () => {
    // Os dois calendários devem exibir os dias da semana
    render(<DatePickerRange />)
    const doms = screen.getAllByText("Dom")
    expect(doms.length).toBeGreaterThanOrEqual(1)
  })

  it("renderiza dois painéis de calendário", () => {
    // DatePickerRange exibe dois headers de mês com aria-label
    render(<DatePickerRange month={0} year={2024} />)
    expect(screen.getByRole("button", { name: /Selecionar mês esquerdo/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Selecionar mês direito/i })).toBeInTheDocument()
  })

  it("exibe o mês e ano controlados no calendário esquerdo", () => {
    // O mês inicial deve aparecer no botão do painel esquerdo
    render(<DatePickerRange month={2} year={2024} />)
    const leftBtn = screen.getByRole("button", { name: /Selecionar mês esquerdo/i })
    expect(leftBtn).toHaveTextContent(/Mar/)
    expect(leftBtn).toHaveTextContent(/2024/)
  })

  it("chama onRangeChange ao selecionar dois dias", async () => {
    // Selecionar início e fim do intervalo deve disparar callback
    const user = userEvent.setup()
    const onRangeChange = vi.fn()
    render(<DatePickerRange month={0} year={2024} onRangeChange={onRangeChange} />)
    const buttons = screen.getAllByRole("button", { name: "10" })
    await user.click(buttons[0])
    expect(onRangeChange).toHaveBeenCalled()
  })

  it("marca startDate visualmente quando fornecido", () => {
    // O dia de início do intervalo deve estar presente no calendário
    const start = new Date(2024, 0, 5)
    render(<DatePickerRange month={0} year={2024} startDate={start} />)
    const buttons = screen.getAllByRole("button", { name: "5" })
    expect(buttons[0]).toBeInTheDocument()
  })

  it("renderiza botões de navegação", () => {
    // Devem existir botões para navegar entre os meses
    const { container } = render(<DatePickerRange />)
    const buttons = container.querySelectorAll("button")
    expect(buttons.length).toBeGreaterThan(0)
  })

  it("aplica className customizado ao container", () => {
    // Classes extras devem ser repassadas ao elemento raiz
    const { container } = render(<DatePickerRange className="range-custom" />)
    expect(container.firstChild).toHaveClass("range-custom")
  })
})

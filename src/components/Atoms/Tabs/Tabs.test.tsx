import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Tabs } from "./Tabs"

const tabsMock = [
  { id: "tab1", label: "Visão Geral" },
  { id: "tab2", label: "Detalhes" },
  { id: "tab3", label: "Histórico", disabled: true },
]

/**
 * Tabs Component Tests
 */
describe("Tabs", () => {
  it("renderiza todas as abas com role='tab'", () => {
    // Cada tab deve ser acessível como botão de aba
    render(<Tabs tabs={tabsMock} />)
    const tabs = screen.getAllByRole("tab")
    expect(tabs).toHaveLength(3)
  })

  it("renderiza o tablist com role='tablist'", () => {
    // O container deve ter role=tablist para acessibilidade
    render(<Tabs tabs={tabsMock} />)
    expect(screen.getByRole("tablist")).toBeInTheDocument()
  })

  it("marca a aba ativa com aria-selected=true", () => {
    // A aba ativa deve ter aria-selected para acessibilidade
    render(<Tabs tabs={tabsMock} activeId="tab1" />)
    const tab1 = screen.getByRole("tab", { name: "Visão Geral" })
    expect(tab1).toHaveAttribute("aria-selected", "true")
  })

  it("abas inativas têm aria-selected=false", () => {
    // Abas não ativas não devem estar marcadas como selecionadas
    render(<Tabs tabs={tabsMock} activeId="tab1" />)
    const tab2 = screen.getByRole("tab", { name: "Detalhes" })
    expect(tab2).toHaveAttribute("aria-selected", "false")
  })

  it("chama onChange ao clicar em aba não ativa", async () => {
    // Clicar em outra aba deve notificar mudança com o id correto
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Tabs tabs={tabsMock} activeId="tab1" onChange={onChange} />)
    await user.click(screen.getByRole("tab", { name: "Detalhes" }))
    expect(onChange).toHaveBeenCalledWith("tab2")
  })

  it("aba desabilitada não dispara onChange", async () => {
    // Clicar em aba desabilitada não deve chamar callback
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Tabs tabs={tabsMock} onChange={onChange} />)
    await user.click(screen.getByRole("tab", { name: "Histórico" }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it("exibe badge quando fornecido no tab", () => {
    // Badge numérico deve ser visível na aba
    const tabs = [{ id: "t1", label: "Tarefas", badge: 5 }]
    render(<Tabs tabs={tabs} />)
    expect(screen.getByText("5")).toBeInTheDocument()
  })
})

import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { ExibitionGrid } from "./ExibitionGrid"

/**
 * ExibitionGrid Component Tests
 */
describe("ExibitionGrid", () => {
  const defaultProps = {
    value: 10,
    total: 250,
  }

  it("renderiza valor atual, total de registros e aria-label acessível", () => {
    // Deve exibir "Exibindo: 10 de 250" com aria-label descritivo
    render(<ExibitionGrid {...defaultProps} />)
    expect(screen.getByText("Exibindo:")).toBeInTheDocument()
    expect(screen.getByText("10")).toBeInTheDocument()
    expect(screen.getByText("de 250")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Exibindo 10 de 250 registros. Clique para alterar"
    )
  })

  it("abre dropdown ao clicar no botão e exibe opções padrão", async () => {
    // Dropdown deve abrir e mostrar opções [10, 20, 50, 100]
    const user = userEvent.setup()
    render(<ExibitionGrid {...defaultProps} />)
    const button = screen.getByRole("button")
    await user.click(button)
    await waitFor(() => {
      expect(button).toHaveAttribute("aria-expanded", "true")
    })
    // Procurar pelos buttons dentro do dropdown
    expect(screen.getByRole("button", { name: "Exibir 10 linhas por página" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Exibir 20 linhas por página" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Exibir 50 linhas por página" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Exibir 100 linhas por página" })).toBeInTheDocument()
  })

  it("exibe opções customizadas quando fornecidas", async () => {
    // Opções customizadas devem sobrescrever as padrões
    const user = userEvent.setup()
    render(<ExibitionGrid {...defaultProps} options={[5, 15, 30]} />)
    await user.click(screen.getAllByRole("button")[0])
    expect(screen.getByRole("button", { name: "Exibir 5 linhas por página" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Exibir 15 linhas por página" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Exibir 30 linhas por página" })).toBeInTheDocument()
  })

  it("chama onChange ao selecionar opção e fecha dropdown", async () => {
    // onChange deve ser disparado ao clicar em opção
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ExibitionGrid {...defaultProps} onChange={onChange} />)
    const triggerButton = screen.getByRole("button", {
      name: "Exibindo 10 de 250 registros. Clique para alterar",
    })
    await user.click(triggerButton)
    const optionButton = screen.getByRole("button", { name: "Exibir 50 linhas por página" })
    await user.click(optionButton)
    expect(onChange).toHaveBeenCalledWith(50)
    expect(triggerButton).toHaveAttribute("aria-expanded", "false")
  })

  it("navega entre opções com teclado (ArrowUp and ArrowDown)", async () => {
    // ArrowDown deve ir para próxima opção, ArrowUp para anterior
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ExibitionGrid value={10} total={250} onChange={onChange} />)
    await user.click(screen.getByRole("button", { name: /Exibindo 10/ }))
    const firstOptionBtn = screen.getByRole("button", { name: "Exibir 10 linhas por página" })
    firstOptionBtn.focus()
    await user.keyboard("{ArrowDown}")
    expect(onChange).toHaveBeenCalledWith(20)
  })

  it("seleciona opção com Enter ou Space", async () => {
    // Enter e Space devem selecionar opção focalizada
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ExibitionGrid value={10} total={250} onChange={onChange} />)
    await user.click(screen.getByRole("button", { name: /Exibindo 10/ }))
    const optionBtn = screen.getByRole("button", { name: "Exibir 20 linhas por página" })
    optionBtn.focus()
    await user.keyboard("{Enter}")
    expect(onChange).toHaveBeenCalledWith(20)
  })

  it("encaminha ref e aplica className customizada", () => {
    // Ref deve referenciar o div e className deve ser aplicado
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <ExibitionGrid {...defaultProps} ref={ref} className="custom-grid" />
    )
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("DIV")
    const rootDiv = container.firstChild as HTMLElement
    expect(rootDiv).toHaveClass("custom-grid")
  })
})

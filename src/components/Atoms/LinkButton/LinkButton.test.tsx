import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { LinkButton } from "./LinkButton"

/**
 * LinkButton Component Tests
 */
describe("LinkButton", () => {
  it("renderiza o label como link", () => {
    // O componente deve renderizar um elemento âncora com o texto correto
    render(<LinkButton label="Ver mais" />)
    expect(screen.getByText("Ver mais")).toBeInTheDocument()
    expect(screen.getByText("Ver mais").tagName).toBe("A")
  })

  it("renderiza com href quando fornecido", () => {
    // O link deve navegar para a URL informada — <a> com href tem role 'link'
    render(<LinkButton label="Docs" href="/docs" />)
    const link = screen.getByRole("link", { name: "Docs" })
    expect(link).toHaveAttribute("href", "/docs")
  })

  it("fica desabilitado com aria-disabled=true", () => {
    // Link desabilitado deve ter aria-disabled e sem href
    const { container } = render(<LinkButton label="Desabilitado" href="/rota" disabled />)
    const link = container.querySelector("a")
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).not.toHaveAttribute("href")
  })

  it("não dispara onClick quando desabilitado", async () => {
    // Clique em link desabilitado não deve chamar callback
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { container } = render(<LinkButton label="Bloqueado" disabled onClick={onClick} />)
    await user.click(container.querySelector("a")!)
    expect(onClick).not.toHaveBeenCalled()
  })

  it("chama onClick quando habilitado", async () => {
    // Clique em link normal deve disparar o callback
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { container } = render(<LinkButton label="Clicar" onClick={onClick} />)
    await user.click(container.querySelector("a")!)
    expect(onClick).toHaveBeenCalled()
  })

  it("encaminha ref para o elemento âncora", () => {
    // A ref deve apontar para o elemento <a>
    const ref = React.createRef<HTMLAnchorElement>()
    render(<LinkButton label="Ref" ref={ref} />)
    expect(ref.current?.tagName).toBe("A")
  })

  it("aplica className customizado", () => {
    // Classes extras devem ser repassadas ao elemento
    const { container } = render(<LinkButton label="Styled" className="link-custom" />)
    expect(container.querySelector("a")).toHaveClass("link-custom")
  })
})

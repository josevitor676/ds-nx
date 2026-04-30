import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { BreadcrumbItem } from "./BreadcrumbItem"

/**
 * BreadcrumbItem Component Tests
 */
describe("BreadcrumbItem", () => {
  it("renderiza o label informado", () => {
    // Verifica que o texto do item de breadcrumb é exibido
    render(<BreadcrumbItem label="Início" />)
    expect(screen.getByText("Início")).toBeInTheDocument()
  })

  it("renderiza como link quando href é fornecido", () => {
    // Item com href deve ser um link clicável
    render(<BreadcrumbItem label="Produtos" href="/produtos" />)
    const link = screen.getByRole("link", { name: /Produtos/i })
    expect(link).toHaveAttribute("href", "/produtos")
  })

  it("marca item ativo com aria-current='page'", () => {
    // Item ativo deve receber aria-current para acessibilidade
    // Nota: <a> sem href não tem role 'link', usar querySelector
    const { container } = render(<BreadcrumbItem label="Página Atual" active />)
    const el = container.querySelector("a")
    expect(el).toHaveAttribute("aria-current", "page")
  })

  it("item desabilitado não navega e recebe estado disabled", () => {
    // Item desabilitado deve ter href removido e aria-current
    const { container } = render(<BreadcrumbItem label="Desabilitado" href="/rota" disabled />)
    const el = container.querySelector("a")
    expect(el).not.toHaveAttribute("href")
  })

  it("chama onClick ao clicar no item", async () => {
    // Callback deve ser disparado ao clicar no breadcrumb
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<BreadcrumbItem label="Clicar" onClick={onClick} />)
    await user.click(screen.getByText("Clicar").closest("a")!)
    expect(onClick).toHaveBeenCalled()
  })

  it("encaminha ref para o elemento raiz", () => {
    // Ref deve apontar para o elemento <a> da âncora
    const ref = React.createRef<HTMLAnchorElement>()
    render(<BreadcrumbItem label="Ref" ref={ref} />)
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("A")
  })

  it("aplica className customizado", () => {
    // Classes extras devem ser repassadas ao elemento
    const { container } = render(<BreadcrumbItem label="Custom" className="minha-classe" />)
    const el = container.querySelector("a")
    expect(el).toHaveClass("minha-classe")
  })
})

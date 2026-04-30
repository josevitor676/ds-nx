import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Header } from "./Header"

/**
 * Header Component Tests
 */
describe("Header", () => {
  it("renderiza header com logo e nome da aplicação", () => {
    render(<Header appName="Test App" />)
    const header = document.querySelector("header")
    expect(header).toBeInTheDocument()
    expect(screen.getByText("Test App")).toBeInTheDocument()
  })

  it("renderiza barra de busca com placeholder", () => {
    render(<Header searchPlaceholder="Busque aqui" />)
    const searchInput = screen.getByRole("searchbox") as HTMLInputElement
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute("placeholder", "Busque aqui")
  })

  it("renderiza botão de menu sidebar", () => {
    render(<Header />)
    const menuButton = screen.getByRole("button", { name: /Alternar menu lateral/i })
    expect(menuButton).toBeInTheDocument()
  })

  it("chama onSidebarToggle ao clicar no botão de menu", async () => {
    const user = userEvent.setup()
    const onSidebarToggle = vi.fn()
    render(<Header onSidebarToggle={onSidebarToggle} />)
    await user.click(screen.getByRole("button", { name: /Alternar menu lateral/i }))
    expect(onSidebarToggle).toHaveBeenCalled()
  })

  it("renderiza conteúdo do slot actions", () => {
    render(
      <Header
        actions={
          <>
            <button aria-label="Notificações">sino</button>
            <button aria-label="Configurações">engrenagem</button>
          </>
        }
      />
    )
    expect(screen.getByRole("button", { name: /Notificações/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Configurações/i })).toBeInTheDocument()
  })

  it("não renderiza ações por padrão quando actions não é fornecido", () => {
    render(<Header />)
    expect(screen.queryByRole("button", { name: /Notificações/i })).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /Configurações/i })).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /Perfil do usuário/i })).not.toBeInTheDocument()
  })

  it("encaminha ref para o elemento raiz", () => {
    const ref = React.createRef<HTMLElement>()
    render(<Header ref={ref} />)
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("HEADER")
  })

  it("aplica className customizado", () => {
    render(<Header className="custom-header" />)
    const header = document.querySelector("header.custom-header")
    expect(header).toBeInTheDocument()
  })
})

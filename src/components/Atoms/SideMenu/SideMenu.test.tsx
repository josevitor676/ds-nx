import { IconHome } from "@tabler/icons-react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { SideMenu, SideMenuGroup, SideMenuItem } from "./SideMenu"

/**
 * SideMenu Component Tests
 */
describe("SideMenu", () => {
  it("renderiza a navegação lateral", () => {
    // SideMenu deve ser semântico como nav
    render(
      <SideMenu>
        <SideMenuItem label="Início" />
      </SideMenu>
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })

  it("renderiza itens com label correto", () => {
    // Labels dos itens devem ser visíveis
    render(
      <SideMenu>
        <SideMenuItem label="Dashboard" />
        <SideMenuItem label="Configurações" />
      </SideMenu>
    )
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Configurações")).toBeInTheDocument()
  })

  it("renderiza grupo com label de grupo", () => {
    // Grupos devem exibir seu label quando não colapsados
    render(
      <SideMenu>
        <SideMenuGroup label="Principal">
          <SideMenuItem label="Item" />
        </SideMenuGroup>
      </SideMenu>
    )
    expect(screen.getByText("Principal")).toBeInTheDocument()
  })

  it("chama onClick ao clicar em um item", async () => {
    // Clicar no item deve disparar callback
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <SideMenu>
        <SideMenuItem label="Clicável" onClick={onClick} />
      </SideMenu>
    )
    await user.click(screen.getByText("Clicável"))
    expect(onClick).toHaveBeenCalled()
  })

  it("item ativo recebe aria-current='page'", () => {
    // Item marcado como ativo deve ter marcação de acessibilidade
    render(
      <SideMenu>
        <SideMenuItem label="Ativo" active />
      </SideMenu>
    )
    const item = screen.getByText("Ativo").closest("button")
    expect(item).toHaveAttribute("aria-current", "page")
  })

  it("encaminha ref para o elemento nav", () => {
    // A ref deve apontar para o <nav> do SideMenu
    const ref = React.createRef<HTMLElement>()
    render(
      <SideMenu ref={ref}>
        <SideMenuItem label="Item" />
      </SideMenu>
    )
    expect(ref.current?.tagName).toBe("NAV")
  })

  it("item com ícone renderiza o SVG", () => {
    // O ícone do item deve estar presente no DOM
    render(
      <SideMenu>
        <SideMenuItem label="Home" icon={<IconHome />} />
      </SideMenu>
    )
    const item = screen.getByText("Home").closest("button")
    expect(item?.querySelector("svg")).toBeInTheDocument()
  })
})

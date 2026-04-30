import { IconSettings, IconShare2 } from "@tabler/icons-react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Dropdown, DropdownItem } from "./Dropdown"

// ── Dropdown ──────────────────────────────────────────────────────────────────

describe("Dropdown", () => {
  it("renderiza com role='menu'", () => {
    render(<Dropdown />)
    expect(screen.getByRole("menu")).toBeInTheDocument()
  })

  it("renderiza os filhos corretamente", () => {
    render(
      <Dropdown>
        <DropdownItem label="Item 1" />
        <DropdownItem label="Item 2" />
      </Dropdown>
    )
    expect(screen.getByText("Item 1")).toBeInTheDocument()
    expect(screen.getByText("Item 2")).toBeInTheDocument()
  })

  it("aplica className customizado", () => {
    render(<Dropdown className="custom-class" />)
    expect(screen.getByRole("menu")).toHaveClass("custom-class")
  })

  it("encaminha ref para o elemento div", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Dropdown ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("repassa atributos HTML nativos", () => {
    render(<Dropdown data-testid="dropdown" aria-label="Menu de opções" />)
    const menu = screen.getByTestId("dropdown")
    expect(menu).toHaveAttribute("aria-label", "Menu de opções")
  })
})

// ── DropdownItem ──────────────────────────────────────────────────────────────

describe("DropdownItem", () => {
  it("renderiza com role='menuitem'", () => {
    render(<DropdownItem label="Opção" />)
    expect(screen.getByRole("menuitem")).toBeInTheDocument()
  })

  it("renderiza o label corretamente", () => {
    render(<DropdownItem label="Configurações" />)
    expect(screen.getByText("Configurações")).toBeInTheDocument()
  })

  it("renderiza ícone quando a prop icon é fornecida", () => {
    render(<DropdownItem label="Compartilhar" icon={IconShare2} />)
    // O componente Icon renderiza um svg
    const menuitem = screen.getByRole("menuitem")
    expect(menuitem.querySelector("svg")).toBeInTheDocument()
  })

  it("não renderiza ícone quando a prop icon não é fornecida", () => {
    render(<DropdownItem label="Sem ícone" />)
    const menuitem = screen.getByRole("menuitem")
    expect(menuitem.querySelector("svg")).not.toBeInTheDocument()
  })

  it("aplica classes de selecionado quando selected=true", () => {
    render(<DropdownItem label="Selecionado" selected />)
    const menuitem = screen.getByRole("menuitem")
    expect(menuitem).toHaveClass("ds-bg-primary-25")
    expect(menuitem).toHaveClass("ds-text-primary-500")
  })

  it("aplica classes padrão quando selected=false", () => {
    render(<DropdownItem label="Padrão" />)
    const menuitem = screen.getByRole("menuitem")
    expect(menuitem).toHaveClass("ds-text-neutral-600")
  })

  it("está desabilitado quando disabled=true", () => {
    render(<DropdownItem label="Desabilitado" disabled />)
    expect(screen.getByRole("menuitem")).toBeDisabled()
  })

  it("chama onClick ao ser clicado", async () => {
    const handleClick = vi.fn()
    render(<DropdownItem label="Clicável" onClick={handleClick} />)
    await userEvent.click(screen.getByRole("menuitem"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("não chama onClick quando está desabilitado", async () => {
    const handleClick = vi.fn()
    render(<DropdownItem label="Inativo" disabled onClick={handleClick} />)
    await userEvent.click(screen.getByRole("menuitem"))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it("aplica className customizado", () => {
    render(<DropdownItem label="Custom" className="minha-classe" />)
    expect(screen.getByRole("menuitem")).toHaveClass("minha-classe")
  })

  it("encaminha ref para o elemento button", () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<DropdownItem label="Ref" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("repassa atributos HTML nativos", () => {
    render(<DropdownItem label="Attrs" data-testid="item" aria-describedby="desc" />)
    const item = screen.getByTestId("item")
    expect(item).toHaveAttribute("aria-describedby", "desc")
  })

  it("renderiza ícones diferentes corretamente", () => {
    const { rerender } = render(<DropdownItem label="A" icon={IconShare2} />)
    expect(screen.getByRole("menuitem").querySelector("svg")).toBeInTheDocument()

    rerender(<DropdownItem label="B" icon={IconSettings} />)
    expect(screen.getByRole("menuitem").querySelector("svg")).toBeInTheDocument()
  })
})

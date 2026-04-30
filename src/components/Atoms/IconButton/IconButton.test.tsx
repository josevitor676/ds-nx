import { IconSearch } from "@tabler/icons-react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { IconButton } from "./IconButton"

/**
 * IconButton Component Tests
 */
describe("IconButton", () => {
  it("renderiza o botão com aria-label", () => {
    // O botão deve ser acessível via seu aria-label
    render(<IconButton icon={<IconSearch />} aria-label="Buscar" />)
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument()
  })

  it("chama onClick ao ser clicado", async () => {
    // O callback de clique deve ser disparado
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<IconButton icon={<IconSearch />} aria-label="Buscar" onClick={onClick} />)
    await user.click(screen.getByRole("button", { name: "Buscar" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("fica desabilitado quando disabled=true", async () => {
    // Botão desabilitado não deve reagir a cliques
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<IconButton icon={<IconSearch />} aria-label="Buscar" disabled onClick={onClick} />)
    const btn = screen.getByRole("button", { name: "Buscar" })
    expect(btn).toBeDisabled()
    await user.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it("exibe spinner quando isLoading=true", () => {
    // Estado de carregamento deve desabilitar o botão
    render(<IconButton icon={<IconSearch />} aria-label="Carregando" isLoading />)
    const btn = screen.getByRole("button", { name: "Carregando" })
    expect(btn).toBeDisabled()
  })

  it("renderiza o ícone SVG dentro do botão", () => {
    // O SVG do ícone deve estar presente no botão
    render(<IconButton icon={<IconSearch />} aria-label="Buscar" />)
    const btn = screen.getByRole("button", { name: "Buscar" })
    expect(btn.querySelector("svg")).toBeInTheDocument()
  })

  it("encaminha ref para o elemento button", () => {
    // A ref deve apontar para o <button> nativo
    const ref = React.createRef<HTMLButtonElement>()
    render(<IconButton icon={<IconSearch />} aria-label="Buscar" ref={ref} />)
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("BUTTON")
  })

  it("aplica className customizado", () => {
    // Classes extras devem ser adicionadas ao elemento
    render(<IconButton icon={<IconSearch />} aria-label="Buscar" className="btn-custom" />)
    expect(screen.getByRole("button", { name: "Buscar" })).toHaveClass("btn-custom")
  })
})

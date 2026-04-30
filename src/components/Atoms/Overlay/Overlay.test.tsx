import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Overlay } from "./Overlay"

/**
 * Overlay Component Tests
 */
describe("Overlay", () => {
  it("renderiza quando isVisible=true", () => {
    // Overlay visível deve estar no DOM
    const { container } = render(<Overlay isVisible />)
    expect(container.querySelector("[role='presentation']")).toBeInTheDocument()
  })

  it("não renderiza quando isVisible=false", () => {
    // Overlay oculto não deve existir no DOM
    const { container } = render(<Overlay isVisible={false} />)
    expect(container.firstChild).toBeNull()
  })

  it("tem role='presentation'", () => {
    // Overlay deve ser semântico mas não interativo
    const { container } = render(<Overlay />)
    expect(container.firstChild).toHaveAttribute("role", "presentation")
  })

  it("chama onClick ao ser clicado", async () => {
    // Clicar no overlay deve disparar o callback
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { container } = render(<Overlay onClick={onClick} />)
    await user.click(container.querySelector("[role='presentation']")!)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("encaminha ref para o elemento raiz", () => {
    // A ref deve apontar para o <div> do overlay
    const ref = React.createRef<HTMLDivElement>()
    render(<Overlay ref={ref} />)
    expect(ref.current).toBeInTheDocument()
  })

  it("aplica zIndex via style inline", () => {
    // O zIndex deve ser aplicado como estilo inline
    const { container } = render(<Overlay zIndex={50} />)
    const el = container.querySelector("[role='presentation']")
    expect(el).toHaveStyle({ zIndex: 50 })
  })
})

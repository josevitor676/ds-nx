import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Modal } from "./Modal"

/**
 * Modal Component Tests
 */
describe("Modal", () => {
  it("renderiza com role='dialog' quando aberto", () => {
    render(<Modal open title="Modal" />)
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("exibe título, subtítulo e conteúdo", () => {
    render(
      <Modal open title="Título" subtitle="Subtítulo">
        <p>Conteúdo</p>
      </Modal>
    )
    expect(screen.getByText("Título")).toBeInTheDocument()
    expect(screen.getByText("Subtítulo")).toBeInTheDocument()
    expect(screen.getByText("Conteúdo")).toBeInTheDocument()
  })

  it("controla visibilidade de botão fechar e rodapé", () => {
    const { rerender } = render(
      <Modal open showCloseButton={false} showFooter={false} title="Modal" />
    )
    expect(screen.queryByLabelText(/fechar modal/i)).not.toBeInTheDocument()

    rerender(<Modal open showCloseButton showFooter confirmLabel="OK" title="Modal" />)
    expect(screen.getByLabelText(/fechar modal/i)).toBeInTheDocument()
  })

  it("chama onConfirm, onCancel e onClose", async () => {
    const handleConfirm = vi.fn()
    const handleCancel = vi.fn()
    const handleClose = vi.fn()

    render(
      <Modal
        open
        title="Modal"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={handleClose}
        confirmLabel="OK"
        cancelLabel="Cancelar"
        showFooter
      />
    )

    await userEvent.click(screen.getByRole("button", { name: /ok/i }))
    expect(handleConfirm).toHaveBeenCalled()
  })

  it("encaminha ref e repassa atributos HTML", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Modal open title="Modal" ref={ref} data-testid="modal-test" aria-label="Modal" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(screen.getByTestId("modal-test")).toHaveAttribute("aria-label", "Modal")
  })

  it("respeita open e className", () => {
    const { rerender } = render(<Modal open={false} title="Modal" />)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    rerender(<Modal open title="Modal" className="custom" />)
    expect(screen.getByRole("dialog")).toHaveClass("custom")
  })

  it("chama onClose ao clicar no botão fechar", async () => {
    const handleClose = vi.fn()
    render(<Modal open title="Modal" onClose={handleClose} showCloseButton />)
    await userEvent.click(screen.getByLabelText(/fechar modal/i))
    expect(handleClose).toHaveBeenCalled()
  })
})

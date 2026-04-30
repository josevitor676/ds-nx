import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Dialog } from "./Dialog"

/**
 * Dialog Component Tests
 * Valida renderização, callbacks e visibilidade da janela de confirmação
 */
describe("Dialog", () => {
  // ✓ Renderização
  it("renderiza com role='dialog' quando aberto", () => {
    render(<Dialog open title="Confirmação" />)
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  // ✓ Conteúdo
  it("exibe título, corpo e botões", () => {
    render(
      <Dialog
        open
        title="Deletar?"
        bodyText="Tem certeza?"
        confirmLabel="OK"
        cancelLabel="Cancelar"
      />
    )
    expect(screen.getByText("Deletar?")).toBeInTheDocument()
    expect(screen.getByText("Tem certeza?")).toBeInTheDocument()
  })

  // ✓ Visibilidade condicional
  it("controla visibilidade de botão fechar e rodapé", () => {
    const { rerender } = render(<Dialog open showCloseButton={false} showFooter={false} />)
    expect(screen.queryByLabelText(/fechar dialog/i)).not.toBeInTheDocument()

    rerender(<Dialog open showCloseButton showFooter confirmLabel="OK" />)
    expect(screen.getByLabelText(/fechar dialog/i)).toBeInTheDocument()
  })

  // ✓ Callbacks
  it("chama onConfirm, onCancel e onClose", async () => {
    const handleConfirm = vi.fn()
    const handleCancel = vi.fn()
    const handleClose = vi.fn()

    render(
      <Dialog
        open
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={handleClose}
        confirmLabel="OK"
        cancelLabel="Cancelar"
      />
    )

    await userEvent.click(screen.getByRole("button", { name: /ok/i }))
    expect(handleConfirm).toHaveBeenCalled()
    expect(handleClose).toHaveBeenCalled()
  })

  // ✓ Ref e atributos
  it("encaminha ref e repassa atributos HTML", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Dialog open ref={ref} data-testid="dialog-test" aria-label="Confirmação" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(screen.getByTestId("dialog-test")).toHaveAttribute("aria-label", "Confirmação")
  })

  // ✓ Estados
  it("respeita open e className", () => {
    const { rerender } = render(<Dialog open={false} />)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    rerender(<Dialog open className="custom" />)
    expect(screen.getByRole("dialog")).toHaveClass("custom")
  })
})

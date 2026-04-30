import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Toast } from "./Toast"

/**
 * Toast Component Tests
 */
describe("Toast", () => {
  it("renderiza com role='alert'", () => {
    // Toast deve ser anunciado por leitores de tela como alerta
    render(<Toast title="Operação realizada" />)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("exibe o título informado", () => {
    // O título deve ser visível no toast
    render(<Toast title="Sucesso!" />)
    expect(screen.getByText("Sucesso!")).toBeInTheDocument()
  })

  it("exibe o subTitle quando fornecido", () => {
    // Subtítulo opcional deve aparecer abaixo do título
    render(<Toast title="Aviso" subTitle="Os dados foram salvos" />)
    expect(screen.getByText("Os dados foram salvos")).toBeInTheDocument()
  })

  it("renderiza botão de fechar quando onClose é fornecido", () => {
    // Botão de fechar deve aparecer apenas quando handler for passado
    render(<Toast title="Fechar" onClose={vi.fn()} />)
    expect(screen.getByRole("button", { name: "Fechar notificação" })).toBeInTheDocument()
  })

  it("não renderiza botão de fechar sem onClose", () => {
    // Sem handler, o botão de fechar não deve existir
    render(<Toast title="Sem fechar" />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("chama onClose ao clicar no botão fechar", async () => {
    // Clicar no × deve disparar o callback
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Toast title="Fechar" onClose={onClose} />)
    await user.click(screen.getByRole("button", { name: "Fechar notificação" }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("encaminha ref para o elemento raiz", () => {
    // A ref deve apontar para o <div> do toast
    const ref = React.createRef<HTMLDivElement>()
    render(<Toast title="Ref" ref={ref} />)
    expect(ref.current?.tagName).toBe("DIV")
  })
})

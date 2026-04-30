import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Drawer } from "./Drawer"

describe("Drawer", () => {
  it("renderiza o título no cabeçalho", () => {
    // O título passado via prop deve aparecer no cabeçalho do Drawer
    render(<Drawer open title="Meu Drawer" />)
    expect(screen.getByText("Meu Drawer")).toBeInTheDocument()
  })

  it("exibe os botões de ação com os rótulos corretos", () => {
    // primaryLabel e secondaryLabel devem ser renderizados no rodapé
    render(<Drawer open title="Drawer" primaryLabel="Aplicar" secondaryLabel="Limpar" />)
    expect(screen.getByRole("button", { name: "Aplicar" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Limpar" })).toBeInTheDocument()
  })

  it("chama onPrimary ao clicar no botão primário", async () => {
    // O callback onPrimary deve ser disparado ao clicar no botão confirmativo
    const user = userEvent.setup()
    const onPrimary = vi.fn()
    render(<Drawer open title="Drawer" primaryLabel="Confirmar" onPrimary={onPrimary} />)
    await user.click(screen.getByRole("button", { name: "Confirmar" }))
    expect(onPrimary).toHaveBeenCalledTimes(1)
  })

  it("chama onClose ao clicar no botão de fechar (X)", async () => {
    // O botão X no cabeçalho deve acionar o callback onClose
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Drawer open title="Drawer" onClose={onClose} />)
    await user.click(screen.getByRole("button", { name: "Fechar drawer" }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("não renderiza o rodapé quando showFooter=false", () => {
    // O rodapé com botões não deve aparecer quando showFooter é false
    render(<Drawer open title="Drawer" showFooter={false} primaryLabel="Confirmar" />)
    expect(screen.queryByRole("button", { name: "Confirmar" })).not.toBeInTheDocument()
  })

  it("não renderiza o botão X quando showCloseButton=false", () => {
    // O botão de fechar deve ser omitido quando showCloseButton é false
    render(<Drawer open title="Drawer" showCloseButton={false} />)
    expect(screen.queryByRole("button", { name: "Fechar drawer" })).not.toBeInTheDocument()
  })

  it("renderiza o conteúdo children na área central", () => {
    // O conteúdo passado como children deve estar visível na área do body
    render(
      <Drawer open title="Drawer">
        <p>Conteúdo interno</p>
      </Drawer>
    )
    expect(screen.getByText("Conteúdo interno")).toBeInTheDocument()
  })

  it("encaminha ref para o elemento de conteúdo do Drawer", () => {
    // A ref deve referenciar o elemento div de conteúdo do Radix Dialog
    const ref = React.createRef<HTMLDivElement>()
    render(<Drawer open title="Drawer" ref={ref} />)
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("DIV")
  })
})

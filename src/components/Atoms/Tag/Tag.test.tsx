import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Tag } from "./Tag"

/**
 * Tag Component Tests
 */
describe("Tag", () => {
  it("renderiza o label da tag", () => {
    // O texto da tag deve ser visível no DOM
    render(<Tag label="React" />)
    expect(screen.getByText("React")).toBeInTheDocument()
  })

  it("renderiza botão de remoção quando onRemove é fornecido", () => {
    // O botão de fechar deve aparecer apenas quando onRemove for passado
    render(<Tag label="Vue" onRemove={vi.fn()} />)
    expect(screen.getByRole("button", { name: "Remover Vue" })).toBeInTheDocument()
  })

  it("não renderiza botão de remoção sem onRemove", () => {
    // Sem callback de remoção, não deve haver botão de fechar
    render(<Tag label="Sem remover" />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("chama onRemove ao clicar no botão de fechar", async () => {
    // Clicar em × deve disparar o callback
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<Tag label="Remover" onRemove={onRemove} />)
    await user.click(screen.getByRole("button", { name: "Remover Remover" }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it("botão de remoção fica inativo quando disabled=true", async () => {
    // Tag desabilitada não deve chamar onRemove
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<Tag label="Desabilitada" onRemove={onRemove} disabled />)
    const btn = screen.getByRole("button", { name: "Remover Desabilitada" })
    expect(btn).toHaveAttribute("aria-disabled", "true")
    await user.click(btn)
    expect(onRemove).not.toHaveBeenCalled()
  })

  it("encaminha ref para o elemento span raiz", () => {
    // A ref deve referenciar o <span> externo da tag
    const ref = React.createRef<HTMLSpanElement>()
    render(<Tag label="Ref" ref={ref} />)
    expect(ref.current?.tagName).toBe("SPAN")
  })

  it("aplica className customizado", () => {
    // Classes extras devem ser adicionadas à tag
    render(<Tag label="Custom" className="tag-custom" />)
    const tag = screen.getByText("Custom").closest("span")
    expect(tag).toHaveClass("tag-custom")
  })
})

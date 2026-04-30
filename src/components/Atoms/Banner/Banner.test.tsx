import { IconCheck } from "@tabler/icons-react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Banner } from "./Banner"

/**
 * Banner Component Tests
 */
describe("Banner", () => {
  it("renderiza conteúdo com role alert", () => {
    // O texto deve estar visível e o elemento deve ter role="alert"
    render(<Banner>Mensagem do banner</Banner>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
    expect(screen.getByText("Mensagem do banner")).toBeInTheDocument()
  })

  it("renderiza ícone customizado quando showIcon=true", () => {
    // Ícone customizado deve estar presente no banner
    render(
      <Banner icon={IconCheck} showIcon>
        Sucesso
      </Banner>
    )
    const alert = screen.getByRole("alert")
    expect(alert.querySelector("svg")).toBeInTheDocument()
  })

  it("oculta ícone quando showIcon=false", () => {
    // Quando showIcon=false, nenhum ícone deve ser renderizado
    render(<Banner showIcon={false}>Mensagem</Banner>)
    const alert = screen.getByRole("alert")
    expect(alert.querySelector("svg")).not.toBeInTheDocument()
  })

  it("renderiza botão de ação e chama onAction ao clicar", async () => {
    // Botão com actionLabel deve aparecer e disparar callback
    const user = userEvent.setup()
    const onAction = vi.fn()
    render(
      <Banner actionLabel="Confirmar" onAction={onAction}>
        Ação disponível
      </Banner>
    )
    await user.click(screen.getByRole("button", { name: "Confirmar" }))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it("renderiza botão de fechar e chama onClose ao clicar", async () => {
    // Botão de fechar deve disparar callback onClose
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Banner onClose={onClose}>Feche-me</Banner>)
    await user.click(screen.getByRole("button", { name: "Fechar banner" }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("renderiza com variante de tipo (success, warning, error, neutral)", () => {
    // Banner deve renderizar corretamente com diferentes tipos
    const types = ["neutral" as const, "success" as const, "warning" as const, "error" as const]
    types.forEach((type) => {
      const { container } = render(<Banner type={type}>Tipo {type}</Banner>)
      expect(container.querySelector('[role="alert"]')).toBeInTheDocument()
    })
  })

  it("encaminha ref e aplica className customizada", () => {
    // Ref deve referenciar o div e className deve ser aplicado
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <Banner ref={ref} className="custom-banner">
        Com customizações
      </Banner>
    )
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("DIV")
    expect(container.querySelector('[role="alert"]')).toHaveClass("custom-banner")
  })
})

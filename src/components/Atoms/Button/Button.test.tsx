import { IconSearch } from "@tabler/icons-react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Button } from "./Button"

/**
 * Button Component Tests
 */
describe("Button", () => {
  it("renderiza o texto do botão via children", () => {
    // O conteúdo passado como children deve aparecer visível
    render(<Button>Enviar</Button>)
    expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument()
  })

  it("renderiza o texto via prop label", () => {
    // A prop label deve ser alternativa a children
    render(<Button label="Confirmar" />)
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeInTheDocument()
  })

  it("chama onClick ao ser clicado", async () => {
    // O callback onClick deve ser disparado após um clique
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Clique</Button>)
    await user.click(screen.getByRole("button", { name: "Clique" }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("fica desabilitado quando disabled=true", async () => {
    // Botão desabilitado não deve disparar onClick
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Bloqueado
      </Button>
    )
    const btn = screen.getByRole("button", { name: "Bloqueado" })
    expect(btn).toBeDisabled()
    await user.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it("exibe ícone de loading quando loading=true", () => {
    // Estado de carregamento deve desabilitar o botão
    render(<Button loading>Carregando</Button>)
    const btn = screen.getByRole("button")
    expect(btn).toBeDisabled()
  })

  it("renderiza ícone via iconStart", () => {
    // Ícone à esquerda deve ser inserido no botão
    render(<Button iconStart={IconSearch}>Buscar</Button>)
    const btn = screen.getByRole("button", { name: "Buscar" })
    expect(btn).toBeInTheDocument()
    // SVG do ícone deve estar presente dentro do botão
    expect(btn.querySelector("svg")).toBeInTheDocument()
  })

  it("encaminha ref para o elemento button", () => {
    // A ref deve referenciar o elemento <button> nativo
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref.current).toBeInTheDocument()
    expect(ref.current?.tagName).toBe("BUTTON")
  })
})

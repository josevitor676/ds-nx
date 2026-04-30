import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { HeaderProfile } from "./Header"

/**
 * HeaderProfile Component Tests
 */
describe("HeaderProfile", () => {
  it("renderiza botão de perfil do usuário", () => {
    render(<HeaderProfile userName="Tiago Sanches" />)
    expect(screen.getByRole("button", { name: /Perfil do usuário/i })).toBeInTheDocument()
  })

  it("abre dropdown ao clicar e exibe itens de menu", async () => {
    const user = userEvent.setup()
    const onMenuItemClick = vi.fn()
    const onLogout = vi.fn()

    render(
      <HeaderProfile
        userName="Tiago Sanches"
        userRole="Desenvolvedor"
        menuItems={[{ label: "Item personalizado", onClick: onMenuItemClick }]}
        onLogout={onLogout}
      />
    )

    await user.click(screen.getByRole("button", { name: /Perfil do usuário/i }))

    await user.click(screen.getByRole("button", { name: /Item personalizado/i }))
    expect(onMenuItemClick).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole("button", { name: /^Sair$/i }))
    expect(onLogout).toHaveBeenCalledTimes(1)
  })

  it("chama onProfileClick ao clicar na área de perfil do dropdown", async () => {
    const user = userEvent.setup()
    const onProfileClick = vi.fn()

    render(<HeaderProfile userName="Tiago Sanches" onProfileClick={onProfileClick} />)

    await user.click(screen.getByRole("button", { name: /Perfil do usuário/i }))
    await user.click(screen.getByRole("button", { name: /Abrir perfil do usuário/i }))
    expect(onProfileClick).toHaveBeenCalledTimes(1)
  })

  it("desabilita o botão de perfil no dropdown quando onProfileClick não é informado", async () => {
    const user = userEvent.setup()

    render(<HeaderProfile userName="Tiago Sanches" />)

    await user.click(screen.getByRole("button", { name: /Perfil do usuário/i }))
    expect(screen.getByRole("button", { name: /Abrir perfil do usuário/i })).toBeDisabled()
  })
})

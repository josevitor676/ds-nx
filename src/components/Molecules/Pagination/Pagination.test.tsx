import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { Pagination } from "./Pagination"

/**
 * Pagination Component Tests
 */
describe("Pagination", () => {
  it("renderiza com botões de página", () => {
    render(<Pagination current={1} total={5} />)
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument()
  })

  it("marca página atual com aria-current='page'", () => {
    render(<Pagination current={2} total={5} />)
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page")
  })

  it("exibe botões de seta quando showArrows=true", () => {
    render(<Pagination current={1} total={5} showArrows />)
    expect(screen.getByLabelText(/página anterior/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/próxima página/i)).toBeInTheDocument()
  })

  it("chama onPageChange ao clicar em página", async () => {
    const handlePageChange = vi.fn()
    render(<Pagination current={1} total={5} onPageChange={handlePageChange} />)
    await userEvent.click(screen.getByRole("button", { name: "3" }))
    expect(handlePageChange).toHaveBeenCalledWith(3)
  })

  it("desabilita setas nos limites", () => {
    const { rerender } = render(<Pagination current={1} total={5} showArrows />)
    expect(screen.getByLabelText(/página anterior/i)).toBeDisabled()

    rerender(<Pagination current={5} total={5} showArrows />)
    expect(screen.getByLabelText(/próxima página/i)).toBeDisabled()
  })

  it("exibe input no modo editável", () => {
    render(<Pagination current={1} total={50} editable />)
    const input = screen.getByDisplayValue("1")
    expect(input).toBeInTheDocument()
  })

  it("encaminha ref e repassa atributos HTML", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Pagination current={1} total={5} ref={ref} data-testid="pag-test" aria-label="Paginação" />
    )
    expect(ref.current).toBeInTheDocument()
    expect(screen.getByTestId("pag-test")).toHaveAttribute("aria-label", "Paginação")
  })

  it("aplica className customizado", () => {
    const { container } = render(<Pagination current={1} total={5} className="custom-pag" />)
    const div = container.querySelector(".custom-pag")
    expect(div).toBeInTheDocument()
  })
})

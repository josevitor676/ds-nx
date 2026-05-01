import { render, screen, within } from "@testing-library/react"
import React from "react"
import { describe, expect, it } from "vitest"
import { DataTable, type DataTableColumn } from "./DataTable"

/**
 * DataTable Component Tests
 */
describe("DataTable", () => {
  const mockColumns: DataTableColumn[] = [
    { key: "id", header: "ID", sortable: true },
    { key: "name", header: "Nome", filterable: true },
    { key: "email", header: "Email" },
  ]

  const mockData = [
    { id: 1, name: "João", email: "joao@example.com" },
    { id: 2, name: "Maria", email: "maria@example.com" },
  ]

  it("renderiza tabela com headers", () => {
    const { container } = render(<DataTable columns={mockColumns} data={mockData} />)
    const table = container.querySelector("table")
    expect(table).toBeInTheDocument()
    expect(within(table!).getByText("ID")).toBeInTheDocument()
    expect(within(table!).getByText("Nome")).toBeInTheDocument()
  })

  it("renderiza dados nas linhas corretas", () => {
    render(<DataTable columns={mockColumns} data={mockData} />)
    expect(screen.getAllByText("João").length).toBeGreaterThan(0)
    expect(screen.getAllByText("maria@example.com").length).toBeGreaterThan(0)
  })

  it("exibe ícones de sort em colunas sortable", () => {
    render(<DataTable columns={mockColumns} data={mockData} />)
    const sortButtons = screen.getAllByRole("button", { name: /Ordenar coluna/i })
    expect(sortButtons.length).toBeGreaterThan(0)
  })

  it("exibe ícone de filter em colunas filterable", () => {
    render(<DataTable columns={mockColumns} data={mockData} />)
    const filterButtons = screen.getAllByRole("button", { name: /Filtrar coluna/i })
    expect(filterButtons.length).toBeGreaterThan(0)
  })

  it("renderiza com largura customizada de coluna", () => {
    const customColumns: DataTableColumn[] = [
      { key: "id", header: "ID", width: "100px" },
      { key: "name", header: "Nome", width: "50%" },
    ]
    const { container } = render(<DataTable columns={customColumns} data={mockData} />)
    const table = container.querySelector("table")
    expect(within(table!).getByText("ID")).toBeInTheDocument()
    expect(within(table!).getByText("Nome")).toBeInTheDocument()
  })

  it("encaminha ref para o elemento raiz", () => {
    const ref = React.createRef<HTMLTableElement>()
    render(<DataTable ref={ref} columns={mockColumns} data={mockData} />)
    expect(ref.current).toBeInTheDocument()
  })

  it("aplica className customizado", () => {
    const { container } = render(
      <DataTable columns={mockColumns} data={mockData} className="custom-table" />
    )
    const table = container.querySelector("table.custom-table")
    expect(table).toBeInTheDocument()
  })
})

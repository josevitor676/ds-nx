import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { describe, expect, it, vi } from "vitest"
import { MultiSelect, type Option } from "./MultiSelect"

/**
 * MultiSelect Component Tests
 */
describe("MultiSelect", () => {
  const mockOptions: Option[] = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
  ]

  it("renderiza com placeholder e label", () => {
    render(<MultiSelect options={mockOptions} placeholder="Selecione" label="Frameworks" />)
    expect(screen.getByText("Selecione")).toBeInTheDocument()
    expect(screen.getByText("Frameworks")).toBeInTheDocument()
  })

  it("exibe tags selecionadas corretamente", () => {
    render(<MultiSelect options={mockOptions} value={["react", "vue"]} />)
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("Vue")).toBeInTheDocument()
  })

  it("respeita maxVisibleTags com contador correto", () => {
    render(
      <MultiSelect options={mockOptions} value={["react", "vue", "angular"]} maxVisibleTags={1} />
    )
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("+2")).toBeInTheDocument()
  })

  it("aplica estados disabled e error", () => {
    render(<MultiSelect options={mockOptions} disabled error />)
    const combobox = screen.getByRole("combobox")
    expect(combobox).toHaveAttribute("aria-disabled", "true")
    expect(combobox).toHaveAttribute("aria-invalid", "true")
  })

  it("chama onChange ao selecionar opção", async () => {
    const handleChange = vi.fn()
    render(<MultiSelect options={mockOptions} onChange={handleChange} />)

    await userEvent.click(screen.getByRole("combobox"))
    await waitFor(() => expect(screen.getByText("React")).toBeInTheDocument())
    await userEvent.click(screen.getByText("React"))

    expect(handleChange).toHaveBeenCalledWith(["react"])
  })

  it("encaminha ref e repassa atributos HTML", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <MultiSelect
        options={mockOptions}
        ref={ref}
        data-testid="ms-test"
        aria-label="Multi-select"
      />
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(screen.getByTestId("ms-test")).toHaveAttribute("aria-label", "Multi-select")
  })

  it("exibe asterisco obrigatório quando mandatory=true", () => {
    render(<MultiSelect options={mockOptions} label="Frameworks" mandatory />)
    const label = screen.getByText("Frameworks")
    expect(label).toHaveTextContent("*")
  })
})

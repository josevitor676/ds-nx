import { IconArrowDown, IconArrowUp, IconFilter, IconSelector } from "@tabler/icons-react"
import { type VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "../../../lib/utils"
import { Checkbox, type CheckboxValue } from "../../Atoms/Checkbox/Checkbox"
import {
  dataTableCellVariants,
  dataTableFilterButtonVariants,
  dataTableHeaderCellVariants,
  dataTableSortButtonVariants,
} from "./dataTable.variants"

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDirection = "asc" | "desc" | null

export interface DataTableColumn {
  /** Key matching the data row property */
  key: string
  /** Label displayed in the column header */
  header: string
  /** Allow the user to sort this column */
  sortable?: boolean
  /** Show the filter button on this column header */
  filterable?: boolean
  /** Whether the filter is currently active */
  filterActive?: boolean
  /** Called when the filter icon is clicked */
  onFilter?: () => void
  /** Fixed column width (e.g. "200px", "20%"). Defaults to equal share of available width. */
  width?: string
  /**
   * Custom cell renderer.
   * Receives the raw cell value, the full row object as `Record<string, unknown>`, and the row index.
   * Cast `row` to your data type inside the function for type-safe access.
   */
  render?: (value: unknown, row: Record<string, unknown>, rowIndex: number) => React.ReactNode
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getHeaderType(displayColIdx: number, totalCols: number): "enter" | "mid" | "last" {
  if (displayColIdx === 0) return "enter"
  if (displayColIdx === totalCols - 1) return "last"
  return "mid"
}

function getBodyCellType(
  displayColIdx: number,
  totalCols: number,
  isLastRow: boolean
): "enter" | "last-enter" | "mid" | "last-mid" | "last" {
  const isFirstCol = displayColIdx === 0
  const isLastCol = displayColIdx === totalCols - 1

  if (isFirstCol) return isLastRow ? "last-enter" : "enter"
  if (isLastRow) return isLastCol ? "last" : "last-mid"
  return "mid"
}

// ─── DataTableHeaderCell ──────────────────────────────────────────────────────

export interface DataTableHeaderCellProps
  extends
    Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "type">,
    VariantProps<typeof dataTableHeaderCellVariants> {
  /** Column header label */
  label?: string
  /** Show the sort icon */
  sortable?: boolean
  /** Current sort direction — null means unsorted */
  sortDirection?: SortDirection
  /** Called when the sort icon is clicked */
  onSort?: () => void
  /** Show the filter icon */
  filterable?: boolean
  /** Whether the filter is currently active */
  filterActive?: boolean
  /** Called when the filter icon is clicked */
  onFilter?: () => void
  /** Show a checkbox for "select all" in this header cell */
  showCheckbox?: boolean
  /** Checkbox value (uncheck / check / indeterminate) */
  checkboxValue?: CheckboxValue
  /** Called when the select-all checkbox changes */
  onCheckboxChange?: (value: CheckboxValue) => void
}

export const DataTableHeaderCell = React.forwardRef<HTMLTableCellElement, DataTableHeaderCellProps>(
  (
    {
      type,
      label,
      sortable = false,
      sortDirection = null,
      onSort,
      filterable = false,
      filterActive = false,
      onFilter,
      showCheckbox = false,
      checkboxValue = "uncheck",
      onCheckboxChange,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <th
      ref={ref}
      scope="col"
      className={cn(dataTableHeaderCellVariants({ type }), className)}
      {...props}
    >
      <div
        className={cn(
          "ds-flex ds-items-center ds-gap-2 ds-h-9 ds-w-full",
          showCheckbox ? "ds-justify-center ds-px-0" : "ds-px-2"
        )}
      >
        {showCheckbox && (
          <Checkbox
            value={checkboxValue}
            onChange={onCheckboxChange}
            size="sm"
            className="ds-shrink-0"
          />
        )}

        {children !== undefined ? (
          children
        ) : label ? (
          <span className="ds-flex-1 ds-truncate ds-text-sm ds-font-medium ds-text-neutral-600 ds-leading-20 ds-text-left">
            {label}
          </span>
        ) : null}

        {(sortable || filterable) && (
          <div className="ds-flex ds-items-center ds-gap-1 ds-shrink-0">
            {sortable && (
              <button
                type="button"
                aria-label={
                  sortDirection === "asc"
                    ? "Ordenação crescente. Clique para ordenar decrescente"
                    : sortDirection === "desc"
                      ? "Ordenação decrescente. Clique para remover ordenação"
                      : "Ordenar coluna"
                }
                onClick={onSort}
                className={cn(
                  dataTableSortButtonVariants({
                    active: sortDirection !== null,
                  })
                )}
              >
                {sortDirection === "asc" ? (
                  <IconArrowUp size={12} stroke={2} />
                ) : sortDirection === "desc" ? (
                  <IconArrowDown size={12} stroke={2} />
                ) : (
                  <IconSelector size={14} stroke={1.5} />
                )}
              </button>
            )}

            {filterable && (
              <button
                type="button"
                aria-label="Filtrar coluna"
                onClick={onFilter}
                className={cn(dataTableFilterButtonVariants({ active: filterActive }))}
              >
                <IconFilter size={12} stroke={2} />
              </button>
            )}
          </div>
        )}
      </div>
    </th>
  )
)

DataTableHeaderCell.displayName = "DataTableHeaderCell"

// ─── DataTableCell ────────────────────────────────────────────────────────────

export interface DataTableCellProps
  extends
    Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "color">,
    VariantProps<typeof dataTableCellVariants> {
  innerClassName?: string
}

export const DataTableCell = React.forwardRef<HTMLTableCellElement, DataTableCellProps>(
  ({ type, color, className, innerClassName, children, ...props }, ref) => (
    <td ref={ref} className={cn(dataTableCellVariants({ type, color }), className)} {...props}>
      <div
        className={cn(
          "ds-flex ds-items-center ds-gap-2 ds-h-9 ds-w-full ds-overflow-hidden",
          innerClassName ?? "ds-px-2"
        )}
      >
        {children}
      </div>
    </td>
  )
)

DataTableCell.displayName = "DataTableCell"

// ─── DataTable ────────────────────────────────────────────────────────────────

export interface DataTableProps {
  /** Column definitions */
  columns: DataTableColumn[]
  /** Data rows */
  data: Record<string, unknown>[]
  /** Alternate odd row background color (zebra striping) */
  striped?: boolean
  /** Show row selection checkboxes */
  selectable?: boolean
  /** Currently selected row indices (controlled) */
  selectedRows?: number[]
  /** Called when row selection changes */
  onRowSelect?: (selectedIndices: number[]) => void
  /**
   * Active sort column key (controlled).
   * When provided, the component operates in controlled sort mode.
   */
  sortColumn?: string
  /** Active sort direction (controlled) */
  sortDirection?: SortDirection
  /** Called when the user changes the sort. Use this in controlled mode. */
  onSort?: (columnKey: string, direction: SortDirection) => void
  /** Content to render when `data` is empty */
  emptyState?: React.ReactNode
  /** Accessible label for the table element */
  "aria-label"?: string
  className?: string
}

export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  (
    {
      columns,
      data,
      striped = false,
      selectable = false,
      selectedRows = [],
      onRowSelect,
      sortColumn: sortColumnProp,
      sortDirection: sortDirectionProp,
      onSort,
      emptyState,
      "aria-label": ariaLabel,
      className,
    },
    ref
  ) => {
    // ── Sort state (uncontrolled) ────────────────────────────────────────────
    const isControlledSort = sortColumnProp !== undefined || sortDirectionProp !== undefined
    const [internalSortCol, setInternalSortCol] = React.useState<string | null>(null)
    const [internalSortDir, setInternalSortDir] = React.useState<SortDirection>(null)

    const activeSortCol = isControlledSort ? (sortColumnProp ?? null) : internalSortCol
    const activeSortDir = isControlledSort ? (sortDirectionProp ?? null) : internalSortDir

    const handleSort = (columnKey: string) => {
      let next: SortDirection
      if (activeSortCol !== columnKey) {
        next = "asc"
      } else if (activeSortDir === "asc") {
        next = "desc"
      } else {
        next = null
      }

      if (!isControlledSort) {
        setInternalSortCol(next !== null ? columnKey : null)
        setInternalSortDir(next)
      }
      onSort?.(columnKey, next)
    }

    // ── Internal sort (uncontrolled) ─────────────────────────────────────────
    const sortedData = React.useMemo(() => {
      if (isControlledSort || !internalSortCol || !internalSortDir) return data
      return [...data].sort((a, b) => {
        const va = String(a[internalSortCol] ?? "")
        const vb = String(b[internalSortCol] ?? "")
        const cmp = va.localeCompare(vb, undefined, { numeric: true })
        return internalSortDir === "asc" ? cmp : -cmp
      })
    }, [data, isControlledSort, internalSortCol, internalSortDir])

    // ── Row selection ────────────────────────────────────────────────────────
    const allSelected = sortedData.length > 0 && selectedRows.length === sortedData.length
    const someSelected = selectedRows.length > 0 && selectedRows.length < sortedData.length

    const handleSelectAll = (value: CheckboxValue) => {
      onRowSelect?.(value === "check" ? sortedData.map((_, i) => i) : [])
    }

    const handleRowSelect = (rowIndex: number, value: CheckboxValue) => {
      if (value === "check") {
        onRowSelect?.([...selectedRows, rowIndex])
      } else {
        onRowSelect?.(selectedRows.filter((i) => i !== rowIndex))
      }
    }

    // ── Column geometry ──────────────────────────────────────────────────────
    const totalCols = columns.length + (selectable ? 1 : 0)

    return (
      <div className="ds-w-full ds-overflow-x-auto">
        <table
          ref={ref}
          className={cn("ds-border-separate ds-border-spacing-0 ds-w-full", className)}
          aria-label={ariaLabel}
        >
          {/* Column widths */}
          <colgroup>
            {selectable && <col style={{ width: "40px" }} />}
            {columns.map((col) => (
              <col key={col.key} style={col.width ? { width: col.width } : undefined} />
            ))}
          </colgroup>

          {/* Header */}
          <thead>
            <tr>
              {selectable && (
                <DataTableHeaderCell
                  type="enter"
                  showCheckbox
                  checkboxValue={allSelected ? "check" : someSelected ? "indeterminate" : "uncheck"}
                  onCheckboxChange={handleSelectAll}
                  aria-label="Selecionar todas as linhas"
                  // When there are no data columns after checkbox, round tr too
                  className={totalCols === 1 ? "ds-rounded-tr-sm" : undefined}
                />
              )}

              {columns.map((col, colIdx) => {
                const displayIdx = selectable ? colIdx + 1 : colIdx
                const headerType = getHeaderType(displayIdx, totalCols)
                const colSortDir = activeSortCol === col.key ? activeSortDir : null

                // Only one column total → both rounded corners
                const extraClass =
                  totalCols === 1 && displayIdx === 0 ? "ds-rounded-tr-sm" : undefined

                return (
                  <DataTableHeaderCell
                    key={col.key}
                    type={headerType}
                    label={col.header}
                    sortable={col.sortable}
                    sortDirection={colSortDir}
                    onSort={() => handleSort(col.key)}
                    filterable={col.filterable}
                    filterActive={col.filterActive}
                    onFilter={col.onFilter}
                    className={extraClass}
                  />
                )
              })}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={totalCols}
                  className={cn(
                    "ds-border-l ds-border-r ds-border-b ds-border-neutral-100 ds-border-solid",
                    "ds-text-center ds-text-sm ds-leading-20 ds-text-neutral-400",
                    "ds-px-4 ds-py-6 ds-bg-surface-base ds-rounded-b-sm"
                  )}
                >
                  {emptyState ?? "Nenhum dado encontrado."}
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIdx) => {
                const isLastRow = rowIdx === sortedData.length - 1
                const isSelected = selectedRows.includes(rowIdx)
                const rowColor: "white" | "gray" | "hover" = isSelected
                  ? "hover"
                  : striped && rowIdx % 2 === 1
                    ? "gray"
                    : "white"

                return (
                  <tr key={rowIdx} className="ds-group">
                    {/* Selection checkbox */}
                    {selectable && (
                      <DataTableCell
                        type={getBodyCellType(0, totalCols, isLastRow)}
                        color={rowColor}
                        innerClassName="ds-justify-center ds-px-0"
                      >
                        <Checkbox
                          value={isSelected ? "check" : "uncheck"}
                          onChange={(value) => handleRowSelect(rowIdx, value)}
                          size="sm"
                          className="ds-shrink-0"
                        />
                      </DataTableCell>
                    )}

                    {columns.map((col, colIdx) => {
                      const displayIdx = selectable ? colIdx + 1 : colIdx
                      const cellType = getBodyCellType(displayIdx, totalCols, isLastRow)
                      const cellValue = row[col.key]

                      return (
                        <DataTableCell key={col.key} type={cellType} color={rowColor}>
                          {col.render ? (
                            col.render(cellValue, row, rowIdx)
                          ) : (
                            <span className="ds-truncate ds-text-sm ds-font-regular ds-text-neutral-600 ds-leading-20">
                              {cellValue != null ? String(cellValue) : ""}
                            </span>
                          )}
                        </DataTableCell>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    )
  }
)

DataTable.displayName = "DataTable"

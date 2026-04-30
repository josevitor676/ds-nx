import React, { RefObject, useState } from "react"

/**
 * Hook compartilhado entre BarChart e PieChart para gerenciar
 * estado e posicionamento do tooltip relativo ao container do gráfico.
 */
export function useChartTooltip<T extends { x: number; y: number }>(
  containerRef: RefObject<HTMLDivElement | null>,
  enabled: boolean
) {
  const [tooltip, setTooltip] = useState<T | null>(null)

  function getRelativePosition(e: React.MouseEvent): { x: number; y: number } | null {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return null
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function onTooltipMouseMove(e: React.MouseEvent) {
    if (!enabled) return
    const pos = getRelativePosition(e)
    if (!pos) return
    setTooltip((prev) => (prev ? { ...prev, ...pos } : null))
  }

  function onTooltipMouseLeave() {
    setTooltip(null)
  }

  return { tooltip, setTooltip, getRelativePosition, onTooltipMouseMove, onTooltipMouseLeave }
}

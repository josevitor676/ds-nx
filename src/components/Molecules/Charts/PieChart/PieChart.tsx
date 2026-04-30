import { type VariantProps } from "class-variance-authority"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "../../../../lib/utils"
import { CHART_LEGEND_HEIGHT, DS_CHART_COLORS } from "../charts.constants"
import { useChartTooltip } from "../useChartTooltip"
import { pieChartVariants } from "./pieChart.variants"

/**
 * Gera o path SVG de uma fatia de pizza/rosca.
 * Suporta slice de 100% decompondo-o em dois semicírculos.
 */
/**
 * Tolerância usada para detectar uma fatia de 360° (evita artefatos no path SVG)
 */
const FULL_CIRCLE_EPSILON = 0.001

function slicePath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
): string {
  const sweep = endAngle - startAngle
  const isFull = sweep >= 2 * Math.PI - FULL_CIRCLE_EPSILON
  const f = (n: number) => n.toFixed(4)

  if (isFull) {
    const xA = f(cx + outerR * Math.cos(startAngle))
    const yA = f(cy + outerR * Math.sin(startAngle))
    const xB = f(cx + outerR * Math.cos(startAngle + Math.PI))
    const yB = f(cy + outerR * Math.sin(startAngle + Math.PI))
    const parts = [
      `M ${xA} ${yA}`,
      `A ${f(outerR)} ${f(outerR)} 0 1 1 ${xB} ${yB}`,
      `A ${f(outerR)} ${f(outerR)} 0 1 1 ${xA} ${yA}`,
    ]
    if (innerR > 0) {
      const ixA = f(cx + innerR * Math.cos(startAngle))
      const iyA = f(cy + innerR * Math.sin(startAngle))
      const ixB = f(cx + innerR * Math.cos(startAngle + Math.PI))
      const iyB = f(cy + innerR * Math.sin(startAngle + Math.PI))
      parts.push(
        `M ${ixA} ${iyA}`,
        `A ${f(innerR)} ${f(innerR)} 0 1 0 ${ixB} ${iyB}`,
        `A ${f(innerR)} ${f(innerR)} 0 1 0 ${ixA} ${iyA}`
      )
    }
    parts.push("Z")
    return parts.join(" ")
  }

  const x1 = f(cx + outerR * Math.cos(startAngle))
  const y1 = f(cy + outerR * Math.sin(startAngle))
  const x2 = f(cx + outerR * Math.cos(endAngle))
  const y2 = f(cy + outerR * Math.sin(endAngle))
  const large = sweep > Math.PI ? 1 : 0

  if (innerR > 0) {
    const ix1 = f(cx + innerR * Math.cos(endAngle))
    const iy1 = f(cy + innerR * Math.sin(endAngle))
    const ix2 = f(cx + innerR * Math.cos(startAngle))
    const iy2 = f(cy + innerR * Math.sin(startAngle))
    return [
      `M ${x1} ${y1}`,
      `A ${f(outerR)} ${f(outerR)} 0 ${large} 1 ${x2} ${y2}`,
      `L ${ix1} ${iy1}`,
      `A ${f(innerR)} ${f(innerR)} 0 ${large} 0 ${ix2} ${iy2}`,
      "Z",
    ].join(" ")
  }

  return [
    `M ${f(cx)} ${f(cy)}`,
    `L ${x1} ${y1}`,
    `A ${f(outerR)} ${f(outerR)} 0 ${large} 1 ${x2} ${y2}`,
    "Z",
  ].join(" ")
}

function resolveRadius(r: number | string, containerRadius: number): number {
  if (typeof r === "number") return r
  if (r.endsWith("%")) return (parseFloat(r) / 100) * containerRadius
  const parsed = parseFloat(r)
  return isNaN(parsed) ? 0 : parsed
}

export interface PieChartDataItem {
  /** Nome da fatia exibido no tooltip e na legenda */
  name: string
  /** Valor numérico da fatia */
  value: number
  /** Cor de preenchimento. Padrão: DS_CHART_COLORS[índice] */
  color?: string
}

export interface PieChartProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pieChartVariants> {
  /** Array de dados do gráfico (name + value) */
  data: PieChartDataItem[]
  /** Raio interno para criar gráfico de rosca (donut) */
  innerRadius?: number | string
  /** Raio externo. Padrão: 80% do menor lado do container */
  outerRadius?: number | string
  /** Exibir legenda das fatias */
  showLegend?: boolean
  /** Exibir tooltip ao passar o mouse */
  showTooltip?: boolean
  /** Altura em pixels — sobrescreve o tamanho definido pela prop `size` */
  height?: number
}

interface TooltipState {
  x: number
  y: number
  name: string
  value: number
  pct: string
  color: string
}

/** Razão do raio centroide para gráficos de pizza sólida (sem buraco) */
const CENTROID_PIE_RATIO = 0.6

export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      className,
      size,
      data,
      innerRadius = 0,
      outerRadius = "80%",
      showLegend = false,
      showTooltip = true,
      height,
      style,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLDivElement>(null)
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })
    const [hovered, setHovered] = useState<number | null>(null)
    const { tooltip, setTooltip, getRelativePosition, onTooltipMouseMove, onTooltipMouseLeave } =
      useChartTooltip<TooltipState>(innerRef, showTooltip)

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      },
      [ref]
    )

    useEffect(() => {
      const el = innerRef.current
      if (!el) return
      const ro = new ResizeObserver(([entry]) => {
        setSvgSize({ width: entry.contentRect.width, height: entry.contentRect.height })
      })
      ro.observe(el)
      return () => ro.disconnect()
    }, [])

    const { width, height: containerH } = svgSize
    const svgH = showLegend ? containerH - CHART_LEGEND_HEIGHT : containerH
    const cx = width / 2
    const cy = svgH / 2
    const containerRadius = Math.min(width, svgH) / 2
    const outerR = resolveRadius(outerRadius, containerRadius)
    const innerR = resolveRadius(innerRadius, containerRadius)

    const total = data.reduce((s, d) => s + d.value, 0)
    const ready = width > 0 && svgH > 0 && total > 0

    let startAngle = -Math.PI / 2
    const slices = ready
      ? data.map((item, index) => {
          const sliceAngle = (item.value / total) * 2 * Math.PI
          const endAngle = startAngle + sliceAngle
          const midAngle = startAngle + sliceAngle / 2
          const centroidR = innerR > 0 ? (innerR + outerR) / 2 : outerR * CENTROID_PIE_RATIO
          const result = {
            path: slicePath(cx, cy, outerR, innerR, startAngle, endAngle),
            color: item.color ?? DS_CHART_COLORS[index % DS_CHART_COLORS.length],
            name: item.name,
            value: item.value,
            pct: ((item.value / total) * 100).toFixed(1),
            centroidX: cx + centroidR * Math.cos(midAngle),
            centroidY: cy + centroidR * Math.sin(midAngle),
            index,
          }
          startAngle = endAngle
          return result
        })
      : []

    return (
      <div
        ref={setRef}
        className={cn(pieChartVariants({ size }), "ds-relative ds-flex ds-flex-col", className)}
        style={height ? { height, ...style } : style}
        {...props}
      >
        <svg
          style={{
            width: "100%",
            height: showLegend ? `calc(100% - ${CHART_LEGEND_HEIGHT}px)` : "100%",
          }}
        >
          {slices.map((slice) => (
            <path
              key={slice.index}
              d={slice.path}
              fill={slice.color}
              stroke="var(--ds-color-surface-base)"
              strokeWidth={1}
              opacity={hovered === null || hovered === slice.index ? 1 : 0.6}
              className="ds-cursor-pointer ds-transition-opacity"
              onMouseEnter={(e) => {
                setHovered(slice.index)
                if (!showTooltip) return
                const pos = getRelativePosition(e)
                if (!pos) return
                setTooltip({
                  ...pos,
                  name: slice.name,
                  value: slice.value,
                  pct: slice.pct,
                  color: slice.color,
                })
              }}
              onMouseMove={onTooltipMouseMove}
              onMouseLeave={() => {
                setHovered(null)
                onTooltipMouseLeave()
              }}
            />
          ))}
        </svg>

        {/* Legend */}
        {showLegend && (
          <div className="ds-flex ds-items-center ds-justify-center ds-gap-4 ds-flex-wrap ds-h-7">
            {data.map((item, i) => (
              <div key={item.name} className="ds-flex ds-items-center ds-gap-1.5">
                <span
                  className="ds-inline-block ds-w-2.5 ds-h-2.5 ds-rounded-full ds-shrink-0"
                  style={{
                    backgroundColor: item.color ?? DS_CHART_COLORS[i % DS_CHART_COLORS.length],
                  }}
                />
                <span className="ds-text-xs ds-text-neutral-500">{item.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tooltip — flip horizontally when in the right 60% of the container,
             flip vertically when in the bottom 60% — prevents overflow and scrollbars */}
        {showTooltip && tooltip && (
          <div
            className="ds-py-2 ds-px-2.5 ds-absolute ds-pointer-events-none ds-bg-surface-base ds-border ds-border-neutral-100 ds-rounded-sm ds-text-xs ds-text-neutral-700 ds-shadow-sm ds-z-10 ds-whitespace-nowrap"
            style={{
              ...(svgSize.width > 0 && tooltip.x > svgSize.width * 0.6
                ? { right: svgSize.width - tooltip.x + 12 }
                : { left: tooltip.x + 12 }),
              ...(svgSize.height > 0 && tooltip.y > svgSize.height * 0.6
                ? { bottom: svgSize.height - tooltip.y + 12 }
                : { top: tooltip.y - 12 }),
            }}
          >
            <div className="ds-flex ds-items-center ds-gap-1.5 ds-mb-0.5">
              <span
                className="ds-inline-block ds-w-2 ds-h-2 ds-rounded-full ds-shrink-0"
                style={{ backgroundColor: tooltip.color }}
              />
              <span className="ds-font-semibold ds-text-neutral-900">{tooltip.name}</span>
            </div>
            <div className="ds-text-neutral-600">
              {tooltip.value.toLocaleString("pt-BR")} ({tooltip.pct}%)
            </div>
          </div>
        )}
      </div>
    )
  }
)

PieChart.displayName = "PieChart"

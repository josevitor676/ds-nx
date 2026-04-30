import { type VariantProps } from "class-variance-authority"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "../../../../lib/utils"
import { CHART_LEGEND_HEIGHT, DS_CHART_COLORS } from "../charts.constants"
import { useChartTooltip } from "../useChartTooltip"
import { barChartVariants } from "./barChart.variants"

/** Calcula ticks arredondados para o eixo Y */
function computeYTicks(maxValue: number): number[] {
  if (maxValue <= 0) return [0, 25, 50, 75, 100]
  const roughStep = maxValue / 4
  const exp = Math.floor(Math.log10(roughStep))
  const f = roughStep / Math.pow(10, exp)
  let nf: number
  if (f < 1.5) nf = 1
  else if (f < 3) nf = 2
  else if (f < 7) nf = 5
  else nf = 10
  const step = nf * Math.pow(10, exp)
  const niceMax = Math.ceil(maxValue / step) * step
  const count = Math.round(niceMax / step)
  return Array.from({ length: count + 1 }, (_, i) => i * step)
}

function formatTickValue(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1)}M`
  if (v >= 1_000) return `${(v / 1_000).toFixed(v % 1_000 === 0 ? 0 : 1)}k`
  return String(v)
}

export interface BarConfig {
  /** Chave correspondente ao campo nos objetos de dados */
  dataKey: string
  /** Cor de preenchimento das barras. Padrão: DS_CHART_COLORS[índice] */
  color?: string
  /** Rótulo exibido na legenda */
  label?: string
}

export interface BarChartProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof barChartVariants> {
  /** Array de dados do gráfico */
  data: Record<string, unknown>[]
  /** Configuração de cada série de barras */
  bars: BarConfig[]
  /** Chave usada para o eixo X */
  xAxisKey?: string
  /** Exibir linhas de grade */
  showGrid?: boolean
  /** Exibir legenda das séries */
  showLegend?: boolean
  /** Exibir tooltip ao passar o mouse */
  showTooltip?: boolean
  /** Altura em pixels — sobrescreve o tamanho definido pela prop `size` */
  height?: number
}

interface TooltipState {
  x: number
  y: number
  label: string
  items: { name: string; value: number; color: string }[]
}

/** Padding interno do SVG em pixels (espaço para eixos e rótulos) */
const PAD = { top: 16, right: 16, bottom: 36, left: 52 }

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      className,
      size,
      data,
      bars,
      xAxisKey = "name",
      showGrid = true,
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
    const cw = Math.max(0, width - PAD.left - PAD.right)
    const ch = Math.max(0, svgH - PAD.top - PAD.bottom)

    const maxVal = Math.max(
      1,
      ...data.flatMap((row) => bars.map((b) => Number(row[b.dataKey] ?? 0)))
    )
    const yTicks = computeYTicks(maxVal)
    const topTick = yTicks[yTicks.length - 1]
    const yScale = (v: number) => PAD.top + ch - (v / topTick) * ch

    const groupW = data.length > 0 ? cw / data.length : 0
    const groupPad = 8
    const barGap = 2
    const barW =
      bars.length > 0
        ? Math.max(4, (groupW - groupPad * 2 - barGap * (bars.length - 1)) / bars.length)
        : 0

    const ready = width > 0 && ch > 0

    return (
      <div
        ref={setRef}
        className={cn(barChartVariants({ size }), "ds-relative ds-flex ds-flex-col", className)}
        style={height ? { height, ...style } : style}
        {...props}
      >
        <svg
          className="ds-overflow-visible"
          style={{
            width: "100%",
            height: showLegend ? `calc(100% - ${CHART_LEGEND_HEIGHT}px)` : "100%",
          }}
        >
          {ready && (
            <>
              {/* Y axis */}
              <line
                x1={PAD.left}
                y1={PAD.top}
                x2={PAD.left}
                y2={PAD.top + ch}
                stroke="var(--ds-color-neutral-100)"
              />
              {/* X baseline */}
              <line
                x1={PAD.left}
                y1={PAD.top + ch}
                x2={PAD.left + cw}
                y2={PAD.top + ch}
                stroke="var(--ds-color-neutral-100)"
              />
              {/* Y ticks + grid */}
              {yTicks.map((tick) => (
                <g key={tick}>
                  {showGrid && tick > 0 && (
                    <line
                      x1={PAD.left}
                      y1={yScale(tick)}
                      x2={PAD.left + cw}
                      y2={yScale(tick)}
                      stroke="var(--ds-color-neutral-100)"
                      strokeDasharray="3 3"
                    />
                  )}
                  <text
                    x={PAD.left - 6}
                    y={yScale(tick) + 4}
                    textAnchor="end"
                    fontSize="var(--ds-text-xs)"
                    fill="var(--ds-color-neutral-500)"
                  >
                    {formatTickValue(tick)}
                  </text>
                </g>
              ))}
              {/* Bar groups */}
              {data.map((row, gIdx) => {
                const groupX = PAD.left + gIdx * groupW + groupPad
                const labelX = groupX + (bars.length * barW + (bars.length - 1) * barGap) / 2
                return (
                  <g
                    key={gIdx}
                    onMouseEnter={(e) => {
                      const pos = getRelativePosition(e)
                      if (!pos) return
                      setTooltip({
                        ...pos,
                        label: String(row[xAxisKey] ?? ""),
                        items: bars.map((b, i) => ({
                          name: b.label ?? b.dataKey,
                          value: Number(row[b.dataKey] ?? 0),
                          color: b.color ?? DS_CHART_COLORS[i % DS_CHART_COLORS.length],
                        })),
                      })
                    }}
                    onMouseMove={onTooltipMouseMove}
                    onMouseLeave={onTooltipMouseLeave}
                  >
                    {bars.map((bar, bIdx) => {
                      const val = Number(row[bar.dataKey] ?? 0)
                      const bh = (val / topTick) * ch
                      return (
                        <rect
                          key={bar.dataKey}
                          x={groupX + bIdx * (barW + barGap)}
                          y={PAD.top + ch - bh}
                          width={barW}
                          height={Math.max(0, bh)}
                          fill={bar.color ?? DS_CHART_COLORS[bIdx % DS_CHART_COLORS.length]}
                          rx={2}
                        />
                      )
                    })}
                    <text
                      x={labelX}
                      y={PAD.top + ch + 18}
                      textAnchor="middle"
                      fontSize="var(--ds-text-xs)"
                      fill="var(--ds-color-neutral-500)"
                    >
                      {String(row[xAxisKey] ?? "")}
                    </text>
                  </g>
                )
              })}
            </>
          )}
        </svg>

        {/* Legend */}
        {showLegend && (
          <div className="ds-flex ds-items-center ds-justify-start ds-gap-4 ds-flex-wrap ds-h-7 ds-pl-[52px]">
            {bars.map((bar, i) => (
              <div key={bar.dataKey} className="ds-flex ds-items-center ds-gap-1.5">
                <span
                  className="ds-inline-block ds-w-2.5 ds-h-2.5 ds-rounded-sm ds-shrink-0"
                  style={{
                    backgroundColor: bar.color ?? DS_CHART_COLORS[i % DS_CHART_COLORS.length],
                  }}
                />
                <span className="ds-text-xs ds-text-neutral-500">{bar.label ?? bar.dataKey}</span>
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
            <div className="ds-font-semibold ds-mb-1 ds-text-neutral-900">{tooltip.label}</div>
            {tooltip.items.map((item) => (
              <div key={item.name} className="ds-flex ds-items-center ds-gap-1.5">
                <span
                  className="ds-inline-block ds-w-2 ds-h-2 ds-rounded-sm ds-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span>
                  {item.name}: <strong>{item.value.toLocaleString("pt-BR")}</strong>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

BarChart.displayName = "BarChart"

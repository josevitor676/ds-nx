import React, { useCallback, useMemo, useReducer, useRef } from "react"
import { createPortal } from "react-dom"
import { Toast } from "./Toast"
import { ToastContext } from "./toast.context"
import { cn } from "../../../lib/utils"
import { positionClasses } from "./toast.variants"
import type { ToastItem, ToastOptions, ToastPosition } from "./toast.types"

// ── Tipos do Provider ────────────────────────────────────────────────────────

export type { ToastOptions, ToastPosition } from "./toast.types"
export type { ToastContextValue } from "./toast.context"

// ── Reducer ──────────────────────────────────────────────────────────────────

type Action = { type: "ADD"; payload: ToastItem } | { type: "REMOVE"; id: string }

function reducer(state: ToastItem[], action: Action): ToastItem[] {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state]
    case "REMOVE":
      return state.filter((t) => t.id !== action.id)
    default:
      return state
  }
}

// ── Provider ─────────────────────────────────────────────────────────────────

export interface ToastProviderProps {
  children: React.ReactNode
  /** Posição padrão de todos os toasts. Padrão: "top-right" */
  defaultPosition?: ToastPosition
  /** Duração padrão em ms. Padrão: 3000 */
  defaultDuration?: number
}

export const ToastProvider = ({
  children,
  defaultPosition = "top-right",
  defaultDuration = 3000,
}: ToastProviderProps) => {
  const [toasts, dispatch] = useReducer(reducer, [])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const remove = useCallback((id: string) => {
    dispatch({ type: "REMOVE", id })
    const t = timers.current.get(id)
    if (t) {
      clearTimeout(t)
      timers.current.delete(id)
    }
  }, [])

  const toast = useCallback(
    (options: ToastOptions) => {
      const id =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36)
      const duration = options.duration ?? defaultDuration
      const position = options.position ?? defaultPosition

      dispatch({ type: "ADD", payload: { id, ...options, position } })

      if (duration > 0) {
        const t = setTimeout(() => remove(id), duration)
        timers.current.set(id, t)
      }
    },
    [defaultDuration, defaultPosition, remove]
  )

  // Group toasts by position for rendering
  const toastsByPosition = useMemo(
    () =>
      toasts.reduce<Record<string, ToastItem[]>>((acc, item) => {
        const pos = item.position ?? defaultPosition
        if (!acc[pos]) acc[pos] = []
        acc[pos].push(item)
        return acc
      }, {}),
    [toasts, defaultPosition]
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {typeof document !== "undefined" &&
        createPortal(
          <>
            {(Object.entries(toastsByPosition) as [ToastPosition, ToastItem[]][]).map(
              ([pos, items]) => (
                <div
                  key={pos}
                  aria-label="Notificações"
                  className={cn(
                    "ds-fixed ds-z-[9999] ds-flex ds-flex-col ds-gap-[8px] ds-pointer-events-none",
                    positionClasses[pos]
                  )}
                >
                  {items.map((item) => (
                    <Toast
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      subTitle={item.subTitle}
                      type={item.type}
                      onClose={() => remove(item.id)}
                    />
                  ))}
                </div>
              )
            )}
          </>,
          document.body
        )}
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = "ToastProvider"

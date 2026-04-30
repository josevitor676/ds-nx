import { createContext } from "react"
import type { ToastOptions } from "./toast.types"

export interface ToastContextValue {
  toast: (options: ToastOptions) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

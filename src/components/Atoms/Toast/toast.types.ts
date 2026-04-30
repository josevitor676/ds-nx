export type ToastType = "success" | "information" | "warning" | "error"

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"

export interface ToastItem {
  id: string
  title: string
  subTitle?: string
  type?: ToastType
  position?: ToastPosition
}

export interface ToastOptions {
  title: string
  subTitle?: string
  type?: ToastType
  /** Duração em ms até fechar automaticamente. Padrão: 3000. Use 0 para não fechar. */
  duration?: number
  /** Posição onde este toast será exibido. Sobrescreve o defaultPosition do provider. */
  position?: ToastPosition
}

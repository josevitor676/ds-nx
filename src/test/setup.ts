import "@testing-library/jest-dom"

// Mock global ResizeObserver — não disponível em jsdom (usado por Radix UI)
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock DOMRect — necessário para Radix UI em jsdom
if (!globalThis.DOMRect) {
  globalThis.DOMRect = class DOMRect {
    x: number
    y: number
    width: number
    height: number

    constructor(x = 0, y = 0, width = 0, height = 0) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    }
    get top() {
      return this.y
    }
    get left() {
      return this.x
    }
    get bottom() {
      return this.y + this.height
    }
    get right() {
      return this.x + this.width
    }
    static fromRect(other?: DOMRectInit): DOMRect {
      return new DOMRect(other?.x, other?.y, other?.width, other?.height)
    }
    toJSON() {
      return this
    }
  } as unknown as typeof DOMRect
}

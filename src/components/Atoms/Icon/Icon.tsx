import type { Icon as TablerIcon } from "@tabler/icons-react"
import React from "react"
import { sizeMap } from "./icon.variants"

type IconSize = "sm" | "md" | "lg"

export interface IconProps extends React.ComponentPropsWithoutRef<TablerIcon> {
  /** Componente de ícone importado de @tabler/icons-react */
  icon: TablerIcon
  /** Tamanho semântico: sm=16px, md=20px, lg=24px */
  size?: IconSize
}

// Tipo auxiliar que aceita ref para evitar limitação do JSX com ForwardRefExoticComponent
type IconComponent = React.ComponentType<
  Omit<IconProps, "icon" | "size"> & {
    size?: number
    ref?: React.Ref<SVGSVGElement>
  }
>

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, size = "md", ...props }, ref) => {
    const El = IconComponent as IconComponent
    return <El ref={ref} size={sizeMap[size]} aria-hidden="true" {...props} />
  }
)

Icon.displayName = "Icon"

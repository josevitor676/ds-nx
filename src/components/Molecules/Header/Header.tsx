import * as RadixPopover from "@radix-ui/react-popover"
import { IconMenu2, IconSearch } from "@tabler/icons-react"
import React from "react"
import NexusShieldLogo from "../../../assets/icon.png"
import { cn } from "../../../lib/utils"
import { Icon } from "../../Atoms/Icon/Icon"
import { IconButton } from "../../Atoms/IconButton/IconButton"
import { Avatar, ProfileCard, type ProfileMenuItem } from "./header.internals"
import {
  headerProfileButtonVariants,
  headerSearchVariants,
  headerVariants,
} from "./header.variants"
export type { ProfileMenuItem }

// ── NexusShield logo (remote + local fallback) ───────────────────────────────────
const NexusShieldFigmaRemote =
  (import.meta as ImportMeta & { env?: { VITE_NEXUSSHIELD_LOGO_URL?: string } }).env
    ?.VITE_NEXUSSHIELD_LOGO_URL ??
  "https://www.figma.com/api/mcp/asset/866841f9-ba83-44c9-9fe9-77c386086985"
const NexusShieldFigmaLogo = NexusShieldLogo

// ── HeaderProfile ─────────────────────────────────────────────────────────────

export interface HeaderProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Nome do usuário logado */
  userName?: string
  /** Cargo ou função do usuário logado */
  userRole?: string
  /** URL da foto de perfil do usuário */
  userAvatar?: string
  /** Itens de menu exibidos no dropdown de perfil, acima do botão "Sair" */
  menuItems?: ProfileMenuItem[]
  /** Chamado ao clicar na área de perfil (foto + nome + cargo) no dropdown */
  onProfileClick?: () => void
  /** Chamado ao clicar em "Sair" no dropdown de perfil */
  onLogout?: () => void
}

const DROPDOWN_OFFSET_PX = 8

/**
 * Botão de perfil do Header com dropdown de informações e ações do usuário.
 * Use dentro do slot `actions` do Header.
 */
export const HeaderProfile = React.forwardRef<HTMLDivElement, HeaderProfileProps>(
  (
    {
      userName = "Usuário",
      userRole,
      userAvatar,
      menuItems,
      onProfileClick,
      onLogout,
      className,
      ...props
    },
    ref
  ) => (
    <div ref={ref} className={className} {...props}>
      <RadixPopover.Root>
        <RadixPopover.Trigger asChild>
          <button
            type="button"
            className={headerProfileButtonVariants()}
            aria-label="Perfil do usuário"
          >
            <Avatar src={userAvatar} name={userName} size="sm" />
          </button>
        </RadixPopover.Trigger>
        <RadixPopover.Portal>
          <RadixPopover.Content
            side="bottom"
            align="end"
            sideOffset={DROPDOWN_OFFSET_PX}
            className="ds-z-50"
          >
            <ProfileCard
              userName={userName}
              userRole={userRole}
              userAvatar={userAvatar}
              menuItems={menuItems}
              onProfileClick={onProfileClick}
              onLogout={onLogout}
            />
          </RadixPopover.Content>
        </RadixPopover.Portal>
      </RadixPopover.Root>
    </div>
  )
)

HeaderProfile.displayName = "HeaderProfile"

const TOGGLE_ANIMATION_MS = 300

// ── Header ───────────────────────────────────────────────────────────────────

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Nome da aplicação exibido ao lado do logo */
  appName?: string
  /** URL da imagem do logo. Se ausente, exibe o logo padrão da Nexus Shield */
  logoSrc?: string
  /** Chamado ao clicar no botão de recolher/expandir o menu lateral */
  onSidebarToggle?: () => void
  /** Chamado quando o mouse entra no botão hambúrguer — útil para abrir o sidebar como overlay */
  onSidebarMouseEnter?: () => void
  /** Chamado quando o mouse sai do botão hambúrguer */
  onSidebarMouseLeave?: () => void
  /**
   * Slot de ações renderizado à direita da barra de busca.
   * O desenvolvedor é responsável por compor os botões desejados.
   * Use `IconButton` e `HeaderProfile` para manter consistência visual.
   *
   * @example
   * <Header
   *   actions={
   *     <>
   *       <IconButton
   *         icon={<Icon icon={IconBell} size="md" />}
   *         aria-label="Notificações"
   *         variant="clear"
   *         colorVariant="primary"
   *         className="ds-rounded-sm ds-text-white hover:ds-bg-primary-700"
   *         onClick={handleBell}
   *       />
   *       <HeaderProfile userName="João" userRole="Dev" onLogout={handleLogout} />
   *     </>
   *   }
   * />
   */
  actions?: React.ReactNode
  /** Placeholder do campo de busca */
  searchPlaceholder?: string
  /** Valor controlado do campo de busca */
  searchValue?: string
  /** Chamado quando o valor do campo de busca muda */
  onSearchChange?: (value: string) => void
  /** Controla a exibição do campo de busca */
  showSearch?: boolean
  className?: string
}

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      appName = "Nexus Shield Design System",
      logoSrc,
      onSidebarToggle,
      onSidebarMouseEnter,
      onSidebarMouseLeave,
      actions,
      searchPlaceholder = "Pesquisar no sistema",
      searchValue,
      onSearchChange,
      showSearch = true,
      className,
      ...props
    },
    ref
  ) => {
    const [currentLogo, setCurrentLogo] = React.useState<string>(
      logoSrc ?? NexusShieldFigmaRemote ?? NexusShieldFigmaLogo
    )

    React.useEffect(() => {
      setCurrentLogo(logoSrc ?? NexusShieldFigmaRemote ?? NexusShieldFigmaLogo)
    }, [logoSrc])

    const [isToggling, setIsToggling] = React.useState(false)
    const toggleTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    React.useEffect(() => {
      return () => {
        if (toggleTimer.current) clearTimeout(toggleTimer.current)
      }
    }, [])

    return (
      <header ref={ref} className={cn(headerVariants(), className)} {...props}>
        {/* Left: Hamburger + Logo */}
        <div className="ds-flex ds-items-center ds-gap-6 ds-flex-shrink-0">
          <IconButton
            icon={<Icon icon={IconMenu2} size="md" />}
            variant="clear"
            colorVariant="primary"
            aria-label="Alternar menu lateral"
            className={cn(
              "ds-rounded-sm ds-text-white hover:ds-bg-primary-700 hover:ds-text-primary-25",
              isToggling && "ds-scale-95 ds-bg-primary-600 ds-transition-transform ds-duration-300"
            )}
            onClick={() => {
              if (onSidebarToggle) onSidebarToggle()
              setIsToggling(true)
              if (toggleTimer.current) clearTimeout(toggleTimer.current)
              toggleTimer.current = setTimeout(() => setIsToggling(false), TOGGLE_ANIMATION_MS)
            }}
            onMouseEnter={onSidebarMouseEnter}
            onMouseLeave={onSidebarMouseLeave}
          />

          <div className="ds-flex ds-items-center ds-gap-2">
            <img
              src={currentLogo}
              alt={`${appName} logo`}
              className="ds-h-5 ds-w-7 ds-object-contain"
              onError={() => {
                if (currentLogo !== NexusShieldFigmaLogo) setCurrentLogo(NexusShieldFigmaLogo)
              }}
            />
            <span className="ds-hidden sm:ds-inline ds-text-lg ds-font-semibold ds-text-white ds-whitespace-nowrap ds-capitalize ds-leading-5 ds-tracking-normal">
              {appName}
            </span>
          </div>
        </div>

        {/* Center: Search bar */}
        {showSearch && (
          <div className={headerSearchVariants()}>
            <Icon icon={IconSearch} size="md" className="ds-text-neutral-300 ds-flex-shrink-0" />
            <input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue ?? ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="ds-flex-1 ds-bg-transparent ds-outline-none ds-border-none ds-text-xs ds-font-medium ds-text-white ds-leading-normal ds-tracking-normal placeholder:ds-text-neutral-300"
              aria-label={searchPlaceholder}
            />
          </div>
        )}

        {/* Right: actions slot */}
        <div className="ds-flex ds-items-center ds-gap-2 ds-flex-shrink-0">{actions}</div>
      </header>
    )
  }
)

Header.displayName = "Header"

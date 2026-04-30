import { IconLogout } from "@tabler/icons-react"
import React from "react"
import { cn } from "../../../lib/utils"
import { Icon } from "../../Atoms/Icon/Icon"
import { headerDropdownVariants, headerMenuItemVariants } from "./header.variants"

// ── ProfileMenuItem ───────────────────────────────────────────────────────────

export interface ProfileMenuItem {
  icon?: React.ReactNode
  label: string
  onClick?: () => void
}

// ── Avatar ───────────────────────────────────────────────────────────────────

export interface AvatarProps {
  src?: string
  name?: string
  /** sm = 24px (header bar), md = 32px (dropdown card) */
  size: "sm" | "md"
}

export const Avatar = React.forwardRef<HTMLElement, AvatarProps>(({ src, name, size }, ref) => {
  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?"

  const sizeClass = size === "sm" ? "ds-h-6 ds-w-6 ds-rounded-sm" : "ds-h-10 ds-w-10 ds-rounded-md"

  if (src) {
    return (
      <img
        ref={ref as React.Ref<HTMLImageElement>}
        src={src}
        alt={name ? `Avatar de ${name}` : "Avatar"}
        className={cn("ds-object-cover ds-block ds-flex-shrink-0", sizeClass)}
      />
    )
  }

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        "ds-flex ds-items-center ds-justify-center ds-flex-shrink-0",
        "ds-bg-primary-200 ds-text-primary-700 ds-font-semibold",
        size === "sm" ? "ds-text-xs" : "ds-text-sm",
        sizeClass
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
})

Avatar.displayName = "Avatar"

// ── ProfileCard ───────────────────────────────────────────────────────────────

export interface ProfileCardProps {
  userName?: string
  userRole?: string
  userAvatar?: string
  menuItems?: ProfileMenuItem[]
  onProfileClick?: () => void
  onLogout?: () => void
}

export const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({ userName = "Usuário", userRole, userAvatar, menuItems, onProfileClick, onLogout }, ref) => (
    <div ref={ref} className={headerDropdownVariants()}>
      {/* Profile info */}
      <button
        type="button"
        onClick={onProfileClick}
        disabled={!onProfileClick}
        aria-label="Abrir perfil do usuário"
        className="ds-flex ds-items-center ds-gap-2 ds-px-2 ds-py-1.5 ds-w-full ds-text-left ds-rounded-sm ds-transition-colors ds-duration-150 hover:ds-bg-primary-25 disabled:ds-cursor-not-allowed disabled:ds-opacity-50"
      >
        <Avatar src={userAvatar} name={userName} size="md" />
        <div className="ds-flex ds-flex-col ds-min-w-0">
          <span className="ds-text-base ds-font-medium ds-text-neutral-800 ds-truncate ds-leading-5 ds-tracking-normal">
            {userName}
          </span>
          {userRole && (
            <span className="ds-text-xs ds-font-normal ds-text-neutral-600 ds-truncate ds-leading-normal ds-tracking-normal">
              {userRole}
            </span>
          )}
        </div>
      </button>

      {/* Menu items */}
      <div className="ds-flex ds-flex-col">
        {menuItems?.map((item) => (
          <button
            key={item.label}
            type="button"
            className={headerMenuItemVariants()}
            onClick={item.onClick}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}

        <button type="button" className={headerMenuItemVariants()} onClick={onLogout}>
          <Icon icon={IconLogout} size="md" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
)

ProfileCard.displayName = "ProfileCard"

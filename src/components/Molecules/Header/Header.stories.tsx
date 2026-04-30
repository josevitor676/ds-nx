import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  IconBell,
  IconChartBar,
  IconHome,
  IconMessageChatbot,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"
import { useRef, useState } from "react"
import { cn } from "../../../lib/utils"
import { Icon } from "../../Atoms/Icon/Icon"
import { IconButton } from "../../Atoms/IconButton/IconButton"
import {
  SideMenu,
  SideMenuGroup,
  SideMenuItem,
  SideMenuSubItem,
} from "../../Atoms/SideMenu/SideMenu"
import { Header, HeaderProfile } from "./Header"

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: { layout: "fullscreen" },
  argTypes: {
    appName: { control: "text" },
    logoSrc: { control: "text" },
    searchPlaceholder: { control: "text" },
    searchValue: { control: "text" },
    onSidebarToggle: { action: "sidebarToggle" },
    onSidebarMouseEnter: { action: "sidebarMouseEnter" },
    onSidebarMouseLeave: { action: "sidebarMouseLeave" },
    onSearchChange: { action: "searchChange" },
    actions: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Header>

type AcoesCompletasProps = Pick<
  Parameters<typeof HeaderProfile>[0],
  "menuItems" | "onProfileClick" | "onLogout"
>

const AcoesCompletas = ({ menuItems, onProfileClick, onLogout }: AcoesCompletasProps) => (
  <>
    <IconButton
      icon={<Icon icon={IconBell} size="md" />}
      aria-label="Notificações"
      variant="clear"
      colorVariant="primary"
      className="ds-hidden sm:ds-flex ds-rounded-sm ds-text-white hover:ds-bg-primary-700"
    />
    <IconButton
      icon={<Icon icon={IconSettings} size="md" />}
      aria-label="Configurações"
      variant="clear"
      colorVariant="primary"
      className="ds-hidden sm:ds-flex ds-rounded-sm ds-text-white hover:ds-bg-primary-700"
    />
    <HeaderProfile
      userName="Tiago Sanches"
      userRole="Desenvolvedor"
      userAvatar="https://i.pravatar.cc/150?img=12"
      menuItems={menuItems}
      onProfileClick={onProfileClick}
      onLogout={onLogout}
    />
  </>
)

export const Padrao: Story = {
  name: "Padrão",
  args: {
    appName: "Gazin Design System",
  },
}

export const ComAcoes: Story = {
  name: "Com ações",
  render: () => <Header appName="Gazin Design System" actions={<AcoesCompletas />} />,
}

export const SomentePerfil: Story = {
  name: "Somente perfil",
  render: () => (
    <Header
      appName="Gazin Design System"
      actions={
        <HeaderProfile
          userName="Tiago Sanches"
          userRole="Desenvolvedor"
          userAvatar="https://i.pravatar.cc/150?img=12"
          onLogout={() => alert("Sair")}
        />
      }
    />
  ),
}

export const ComItensDeMenuPerfil: Story = {
  name: "Com itens de menu no perfil",
  render: () => (
    <Header
      appName="Gazin Design System"
      actions={
        <>
          <IconButton
            icon={<Icon icon={IconBell} size="md" />}
            aria-label="Notificações"
            variant="clear"
            colorVariant="primary"
            className="ds-hidden sm:ds-flex ds-rounded-sm ds-text-white hover:ds-bg-primary-700"
          />
          <HeaderProfile
            userName="Tiago Sanches"
            userRole="Desenvolvedor"
            userAvatar="https://i.pravatar.cc/150?img=12"
            menuItems={[
              { icon: <Icon icon={IconSettings} size="md" />, label: "Configurações da conta" },
              { icon: <Icon icon={IconMessageChatbot} size="md" />, label: "Enviar feedback" },
            ]}
            onProfileClick={() => alert("Abrir perfil")}
            onLogout={() => alert("Sair")}
          />
        </>
      }
    />
  ),
}

export const ComBuscaPreenchida: Story = {
  name: "Com busca preenchida",
  args: {
    appName: "Gazin Design System",
    searchValue: "componente Button",
  },
}

export const ComLogoPersonalizado: Story = {
  name: "Com logo personalizado",
  args: {
    appName: "Gazin Design System",
    logoSrc: "https://www.figma.com/api/mcp/asset/866841f9-ba83-44c9-9fe9-77c386086985",
  },
}

const InteractiveHeader = () => {
  const [search, setSearch] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div>
      <Header
        appName="Gazin Design System"
        searchValue={search}
        onSearchChange={setSearch}
        onSidebarToggle={() => setSidebarOpen((v) => !v)}
        actions={<AcoesCompletas onProfileClick={() => alert("Abrir perfil")} />}
      />
      <div className="ds-p-6 ds-text-neutral-600 ds-text-sm">
        <p>
          Sidebar: <strong>{sidebarOpen ? "aberto" : "fechado"}</strong>
        </p>
        {search && (
          <p>
            Busca: <strong>{search}</strong>
          </p>
        )}
      </div>
    </div>
  )
}

export const Interativo: Story = {
  name: "Interativo",
  render: () => <InteractiveHeader />,
}

const HeaderWithSideMenu = () => {
  const [search, setSearch] = useState("")
  const [collapsed, setCollapsed] = useState(true)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [active, setActive] = useState("dashboard")

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openOverlay = () => {
    if (!collapsed) return
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOverlayOpen(true)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOverlayOpen(false), 120)
  }

  const sideMenuContent = (
    <>
      <SideMenuGroup label="NAVEGAÇÃO">
        <SideMenuItem
          icon={<Icon icon={IconHome} size="md" />}
          label="Dashboard"
          active={active === "dashboard"}
          onClick={() => setActive("dashboard")}
        />
        <SideMenuItem icon={<Icon icon={IconChartBar} size="md" />} label="Relatórios">
          <SideMenuSubItem
            label="Visão Geral"
            active={active === "reports-overview"}
            onClick={() => setActive("reports-overview")}
          />
          <SideMenuSubItem
            label="Mensal"
            active={active === "reports-monthly"}
            onClick={() => setActive("reports-monthly")}
          />
          <SideMenuSubItem
            label="Anual"
            active={active === "reports-yearly"}
            onClick={() => setActive("reports-yearly")}
          />
        </SideMenuItem>
        <SideMenuItem icon={<Icon icon={IconUsers} size="md" />} label="Usuários">
          <SideMenuSubItem
            label="Lista de Usuários"
            active={active === "users-list"}
            onClick={() => setActive("users-list")}
          />
          <SideMenuSubItem
            label="Permissões"
            active={active === "users-permissions"}
            onClick={() => setActive("users-permissions")}
          />
        </SideMenuItem>
      </SideMenuGroup>
      <SideMenuGroup label="SISTEMA">
        <SideMenuItem
          icon={<Icon icon={IconSettings} size="md" />}
          label="Configurações"
          active={active === "settings"}
          onClick={() => setActive("settings")}
        />
      </SideMenuGroup>
    </>
  )

  return (
    <div className="ds-flex ds-flex-col ds-h-screen ds-bg-neutral-25">
      <Header
        appName="Gazin Design System"
        searchValue={search}
        onSearchChange={setSearch}
        onSidebarToggle={() => {
          setOverlayOpen(false)
          setCollapsed((v) => !v)
        }}
        onSidebarMouseEnter={openOverlay}
        onSidebarMouseLeave={scheduleClose}
        actions={
          <AcoesCompletas
            menuItems={[
              { icon: <Icon icon={IconSettings} size="md" />, label: "Configurações da conta" },
              { icon: <Icon icon={IconMessageChatbot} size="md" />, label: "Enviar feedback" },
            ]}
            onProfileClick={() => alert("Abrir perfil")}
          />
        }
      />

      <div className="ds-flex ds-flex-1 ds-overflow-hidden ds-relative">
        {!collapsed && <SideMenu>{sideMenuContent}</SideMenu>}
        {collapsed && (
          <SideMenu
            collapsed={false}
            onMouseEnter={openOverlay}
            onMouseLeave={scheduleClose}
            className={cn(
              "ds-absolute ds-left-0 ds-top-0 ds-bottom-0 ds-z-50 ds-shadow-md ds-transition-all ds-duration-200 ds-ease-in-out",
              overlayOpen
                ? "ds-opacity-100 ds-translate-x-0 ds-pointer-events-auto"
                : "ds-opacity-0 ds-translate-x-2 ds-pointer-events-none"
            )}
          >
            {sideMenuContent}
          </SideMenu>
        )}

        <main className="ds-flex-1 ds-overflow-auto ds-p-6">
          <p className="ds-text-sm ds-text-neutral-500">
            Página ativa: <strong className="ds-text-neutral-700">{active}</strong>
          </p>
          {search && (
            <p className="ds-text-sm ds-text-neutral-500 ds-mt-1">
              Busca: <strong className="ds-text-neutral-700">{search}</strong>
            </p>
          )}
        </main>
      </div>
    </div>
  )
}

export const ComMenuLateral: Story = {
  name: "Com menu lateral",
  render: () => <HeaderWithSideMenu />,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `
import { IconBell, IconChartBar, IconHome, IconSettings, IconUsers } from "@tabler/icons-react"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Icon, SideMenu, SideMenuGroup, SideMenuItem, SideMenuSubItem } from "@gazin/design-system"
import { Header, HeaderProfile } from "@gazin/design-system"
import { IconButton } from "@gazin/design-system"

export default function App() {
  const [search, setSearch] = useState("")
  const [collapsed, setCollapsed] = useState(true)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const closeTimer = useRef(null)

  const openOverlay = () => {
    if (!collapsed) return
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOverlayOpen(true)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOverlayOpen(false), 120)
  }

  return (
    <div className="ds-flex ds-flex-col ds-h-screen">
      <Header
        appName="Minha App"
        searchValue={search}
        onSearchChange={setSearch}
        onSidebarToggle={() => setCollapsed((v) => !v)}
        onSidebarMouseEnter={openOverlay}
        onSidebarMouseLeave={scheduleClose}
        actions={
          <>
            <IconButton
              icon={<Icon icon={IconBell} size="md" />}
              aria-label="Notificações"
              variant="clear"
              colorVariant="primary"
              className="ds-rounded-sm ds-text-white hover:ds-bg-primary-700"
            />
            <HeaderProfile
              userName="Tiago Sanches"
              userRole="Desenvolvedor"
              onLogout={() => signOut()}
            />
          </>
        }
      />
      {/* ... SideMenu + main */}
    </div>
  )
}
        `.trim(),
        language: "tsx",
      },
    },
  },
}

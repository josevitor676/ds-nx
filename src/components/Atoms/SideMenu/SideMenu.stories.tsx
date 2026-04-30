import type { Meta, StoryObj } from "@storybook/react-vite";
import {
    IconBell,
    IconChartBar,
    IconFileText,
    IconHome,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";
import { SideMenu, SideMenuGroup, SideMenuItem, SideMenuSubItem } from "./SideMenu";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SideMenu> = {
  title: "Components/SideMenu",
  component: SideMenu,
  argTypes: {
    collapsed: {
      description:
        "Recolhe o menu exibindo apenas ícones (modo compacto). Ideal para layouts com pouco espaço horizontal.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      description:
        "Conteúdo da navegação. Componha com SideMenuGroup, SideMenuItem e SideMenuSubItem.",
      control: false,
      table: { type: { summary: "React.ReactNode" } },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="ds-flex ds-h-[460px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SideMenu>;

// ─── Default (Playground) ─────────────────────────────────────────────────────

export const Default: Story = {
  tags: ["!sidebar"],
  args: { collapsed: false },
  render: (args) => (
    <SideMenu {...args}>
      <SideMenuGroup>
        <SideMenuItem icon={<IconHome size={20} />} label="Dashboard" active />
        <SideMenuItem icon={<IconChartBar size={20} />} label="Relatórios">
          <SideMenuSubItem label="Visão Geral" active />
          <SideMenuSubItem label="Mensal" />
          <SideMenuSubItem label="Anual" />
        </SideMenuItem>
        <SideMenuItem icon={<IconUsers size={20} />} label="Usuários">
          <SideMenuSubItem label="Lista de Usuários" />
          <SideMenuSubItem label="Permissões" />
        </SideMenuItem>
        <SideMenuItem icon={<IconSettings size={20} />} label="Configurações">
          <SideMenuSubItem label="Perfil" />
          <SideMenuSubItem label="Segurança" />
          <SideMenuSubItem label="Aparência" />
        </SideMenuItem>
      </SideMenuGroup>
    </SideMenu>
  ),
};

// ─── Item States ──────────────────────────────────────────────────────────────

export const ItemStates: Story = {
  tags: ["!sidebar"],
  render: () => (
    <SideMenu>
      <SideMenuGroup>
        <SideMenuItem icon={<IconHome size={20} />} label="Default" />
        <SideMenuItem icon={<IconChartBar size={20} />} label="Active" active />
        <SideMenuItem icon={<IconUsers size={20} />} label="Disabled" disabled />
      </SideMenuGroup>
    </SideMenu>
  ),
};

// ─── With Badge ───────────────────────────────────────────────────────────────

export const WithBadge: Story = {
  tags: ["!sidebar"],
  render: () => (
    <SideMenu>
      <SideMenuGroup>
        <SideMenuItem icon={<IconHome size={20} />} label="Dashboard" badge={3} active />
        <SideMenuItem icon={<IconChartBar size={20} />} label="Relatórios" badge={12} />
        <SideMenuItem icon={<IconBell size={20} />} label="Notificações" badge={5} />
        <SideMenuItem icon={<IconSettings size={20} />} label="Configurações" />
      </SideMenuGroup>
    </SideMenu>
  ),
};

// ─── With Group Label ─────────────────────────────────────────────────────────

export const WithGroupLabel: Story = {
  tags: ["!sidebar"],
  render: () => (
    <SideMenu>
      <SideMenuGroup label="NAVEGAÇÃO">
        <SideMenuItem icon={<IconHome size={20} />} label="Dashboard" active />
        <SideMenuItem icon={<IconChartBar size={20} />} label="Relatórios" />
      </SideMenuGroup>
      <SideMenuGroup label="ADMINISTRAÇÃO">
        <SideMenuItem icon={<IconUsers size={20} />} label="Usuários" />
        <SideMenuItem icon={<IconSettings size={20} />} label="Configurações" />
      </SideMenuGroup>
    </SideMenu>
  ),
};

// ─── With Sub-items (expanded) ────────────────────────────────────────────────

export const WithSubItems: Story = {
  tags: ["!sidebar"],
  args: { collapsed: false },
  render: (args) => (
    <SideMenu {...args}>
      <SideMenuGroup>
        <SideMenuItem icon={<IconHome size={20} />} label="Dashboard" />
        <SideMenuItem icon={<IconChartBar size={20} />} label="Relatórios" defaultExpanded>
          <SideMenuSubItem label="Visão Geral" />
          <SideMenuSubItem label="Mensal" active />
          <SideMenuSubItem label="Anual" />
        </SideMenuItem>
        <SideMenuItem icon={<IconUsers size={20} />} label="Usuários" defaultExpanded>
          <SideMenuSubItem label="Lista de Usuários" />
          <SideMenuSubItem label="Permissões" />
        </SideMenuItem>
        <SideMenuItem icon={<IconSettings size={20} />} label="Configurações" defaultExpanded>
          <SideMenuSubItem label="Perfil" />
          <SideMenuSubItem label="Segurança" />
          <SideMenuSubItem label="Aparência" />
        </SideMenuItem>
      </SideMenuGroup>
    </SideMenu>
  ),
};

// ─── Collapsed ────────────────────────────────────────────────────────────────

export const Collapsed: Story = {
  tags: ["!sidebar"],
  args: { collapsed: true },
  render: (args) => (
    <SideMenu {...args}>
      <SideMenuGroup>
        <SideMenuItem icon={<IconHome size={20} />} label="Dashboard" active />
        <SideMenuItem icon={<IconChartBar size={20} />} label="Relatórios" />
        <SideMenuItem icon={<IconUsers size={20} />} label="Usuários" />
        <SideMenuItem icon={<IconSettings size={20} />} label="Configurações" />
      </SideMenuGroup>
    </SideMenu>
  ),
};

// ─── Without Icons ────────────────────────────────────────────────────────────

export const WithoutIcons: Story = {
  tags: ["!sidebar"],
  args: { collapsed: false },
  render: (args) => (
    <SideMenu {...args}>
      <SideMenuGroup>
        <SideMenuItem label="Dashboard" active />
        <SideMenuItem label="Relatórios">
          <SideMenuSubItem label="Visão Geral" />
          <SideMenuSubItem label="Mensal" />
        </SideMenuItem>
        <SideMenuItem label="Usuários" />
        <SideMenuItem label="Configurações" />
      </SideMenuGroup>
    </SideMenu>
  ),
};

// ─── Best Practices ───────────────────────────────────────────────────────────

export const BestPracticeCorrect: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p style={{ fontSize: 13, color: "#374151", margin: "0 0 8px" }}>
          Use ícones descritivos com labels curtos e diretos
        </p>
        <SideMenu>
          <SideMenuGroup>
            <SideMenuItem icon={<IconHome size={20} />} label="Dashboard" active />
            <SideMenuItem icon={<IconChartBar size={20} />} label="Relatórios" />
            <SideMenuItem icon={<IconUsers size={20} />} label="Usuários" />
          </SideMenuGroup>
        </SideMenu>
      </div>
      <div>
        <p style={{ fontSize: 13, color: "#374151", margin: "0 0 8px" }}>
          Use rótulos de grupo para organizar seções distintas
        </p>
        <SideMenu>
          <SideMenuGroup label="NAVEGAÇÃO">
            <SideMenuItem icon={<IconHome size={20} />} label="Dashboard" active />
          </SideMenuGroup>
          <SideMenuGroup label="GESTÃO">
            <SideMenuItem icon={<IconUsers size={20} />} label="Usuários" />
          </SideMenuGroup>
        </SideMenu>
      </div>
    </div>
  ),
};

export const BestPracticeAvoid: Story = {
  tags: ["!sidebar"],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p style={{ fontSize: 13, color: "#374151", margin: "0 0 8px" }}>
          Evite labels genéricos que não comunicam a ação
        </p>
        <SideMenu>
          <SideMenuGroup>
            <SideMenuItem icon={<IconFileText size={20} />} label="Página 1" active />
            <SideMenuItem icon={<IconFileText size={20} />} label="Página 2" />
            <SideMenuItem icon={<IconFileText size={20} />} label="Página 3" />
          </SideMenuGroup>
        </SideMenu>
      </div>
      <div>
        <p style={{ fontSize: 13, color: "#374151", margin: "0 0 8px" }}>
          Evite múltiplos itens marcados como ativos simultaneamente
        </p>
        <SideMenu>
          <SideMenuGroup>
            <SideMenuItem icon={<IconHome size={20} />} label="Dashboard" active />
            <SideMenuItem icon={<IconChartBar size={20} />} label="Relatórios" active />
          </SideMenuGroup>
        </SideMenu>
      </div>
    </div>
  ),
};

// ─── Interactive (expand/collapse toggle) ─────────────────────────────────────

export const Interactive: Story = {
  tags: ["!sidebar"],
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("dashboard");

    return (
      <div className="ds-flex ds-h-[560px]">
        <SideMenu collapsed={collapsed}>
          <SideMenuGroup>
            <SideMenuItem
              icon={<IconHome size={20} />}
              label="Dashboard"
              active={active === "dashboard"}
              onClick={() => setActive("dashboard")}
            />
            <SideMenuItem icon={<IconChartBar size={20} />} label="Relatórios">
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
            <SideMenuItem icon={<IconUsers size={20} />} label="Usuários">
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
            <SideMenuItem icon={<IconSettings size={20} />} label="Configurações">
              <SideMenuSubItem
                label="Perfil"
                active={active === "settings-profile"}
                onClick={() => setActive("settings-profile")}
              />
              <SideMenuSubItem
                label="Segurança"
                active={active === "settings-security"}
                onClick={() => setActive("settings-security")}
              />
            </SideMenuItem>
          </SideMenuGroup>
        </SideMenu>

        <div className="ds-flex ds-flex-col ds-flex-1 ds-bg-neutral-25">
          <div className="ds-p-4 ds-border-b ds-border-neutral-100 ds-flex ds-items-center ds-justify-between">
            <span className="ds-text-sm ds-font-medium ds-text-neutral-700">
              Página ativa: <strong>{active}</strong>
            </span>
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              className="ds-px-3 ds-h-8 ds-rounded-md ds-bg-primary-500 ds-text-white ds-text-sm ds-font-medium hover:ds-bg-primary-700 ds-transition-colors"
            >
              {collapsed ? "Expandir" : "Colapsar"}
            </button>
          </div>
          <div className="ds-p-6 ds-text-neutral-500 ds-text-sm">Conteúdo da página…</div>
        </div>
      </div>
    );
  },
  parameters: { layout: "fullscreen" },
};

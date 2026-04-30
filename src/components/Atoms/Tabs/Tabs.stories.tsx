import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "change" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const sampleTabs = [
  { id: "tab-1", label: "texto grande", badge: "01" },
  { id: "tab-2", label: "texto grande", badge: "01" },
  { id: "tab-3", label: "texto grande", badge: "01" },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    activeId: "tab-1",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    tabs: sampleTabs,
    activeId: "tab-1",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    tabs: sampleTabs,
    activeId: "tab-2",
    size: "lg",
  },
};

const NavigationComponentTabs = () => {
  const [activeId, setActiveId] = useState('tab-1');
  const [screen, setScreen] = useState('Tela 1');

  const handleChange = (id: string) => {
    setActiveId(id);
    const idx = id.split('-')[1];
    setScreen(`Tela ${idx}`);
  };

  return (
    <div>
      <Tabs
        activeId={activeId}
        onChange={handleChange}
        size="md"
        tabs={[
          { badge: '01', id: 'tab-1', label: 'Tab 1' },
          { badge: '02', id: 'tab-2', label: 'Tab 2' },
          { badge: '03', id: 'tab-3', label: 'Tab 3' },
        ]}
      />
      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded">
        <h3 className="ds-text-[16px] ds-font-semibold ds-mb-2">Conteúdo da {screen}</h3>
        <p className="ds-text-[14px] ds-text-neutral-600">Aqui vai o conteúdo simulado da {screen}.</p>
      </div>
    </div>
  );
}


export const Navigation: Story = {
  render: () => <NavigationComponentTabs />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
          import { Tabs } from './Tabs';

          function NavigationExample() {
            const [activeId, setActiveId] = useState('tab-1');
            const [screen, setScreen] = useState('Tela 1');

            const handleChange = (id: string) => {
              setActiveId(id);
              const idx = id.split('-')[1];
              setScreen(\`Tela idx\`);
            };

            return (
              <div>
                <Tabs
                  activeId={activeId}
                  onChange={handleChange}
                  size="md"
                  tabs={[
                    { badge: '01', id: 'tab-1', label: 'Tab 1' },
                    { badge: '02', id: 'tab-2', label: 'Tab 2' },
                    { badge: '03', id: 'tab-3', label: 'Tab 3' },
                  ]}
                />

                <div style={{ marginTop: 24, padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
                  <h3>Conteúdo da {screen}</h3>
                  <p>Aqui vai o conteúdo simulado da {screen}.</p>
                </div>
              </div>
            );
          }

          render: () => <NavigationExample />`,
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tag, type TagProps } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    variant: {
      control: 'select',
      options: ['soft', 'strong'],
    },
    color: {
      control: 'select',
      options: ['green', 'red', 'blue', 'orange', 'gray', 'purple', 'yellow', 'dark-green'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    onRemove: { action: 'remove' },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

const colors: NonNullable<TagProps['color']>[] = [
  'green',
  'red',
  'blue',
  'orange',
  'gray',
  'purple',
  'yellow',
  'dark-green',
];

export const Default: Story = { args: { label: 'Novo', variant: 'soft', color: 'blue', size: 'medium' } };


export const Sizes: Story = {
  render: () => (
    <div className="ds-flex ds-gap-3 ds-items-center">
      <Tag label="Pequena" size="small" />
      <Tag label="Média" size="medium" />
    </div>
  ),
};

export const VariantsGrid: Story = {
  render: () => (
    <div className="ds-flex ds-flex-col ds-gap-3">
      {colors.map((color) => (
        <div key={color} className="ds-grid ds-grid-cols-4 ds-gap-3">
          <Tag label="tag teste" color={color} variant="soft" size="small" onRemove={() => {}} />
          <Tag label="tag teste" color={color} variant="soft" size="medium" onRemove={() => {}} />
          <Tag label="tag teste" color={color} variant="strong" size="small" onRemove={() => {}} />
          <Tag label="tag teste" color={color} variant="strong" size="medium" onRemove={() => {}} />
        </div>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'tag teste',
    color: 'gray',
    variant: 'soft',
    size: 'medium',
    disabled: true,
    onRemove: () => {},
  },
};

const PanelDemo = () => {
  const [items, setItems] = useState(['Alpha', 'Beta', 'Gamma']);

  const remove = (idx: number) => setItems((s) => s.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="ds-flex ds-gap-2 ds-mb-4">
        {items.map((it, i) => (
          <Tag key={it} label={it} onRemove={() => remove(i)} />
        ))}
      </div>

      <div className="ds-p-4 ds-border ds-border-neutral-100 ds-rounded">
        <h3 className="ds-text-[16px] ds-font-semibold ds-mb-2">Painel de Tags</h3>
        <p className="ds-text-[14px] ds-text-neutral-600">Use as tags para filtrar ou marcar itens.</p>
      </div>
    </div>
  );
};

export const Panel: Story = {
  render: () => <PanelDemo />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { Tag } from './Tag';

function PanelDemo() {
  const [items, setItems] = useState(['Alpha', 'Beta', 'Gamma']);

  const remove = (idx: number) => setItems((s) => s.filter((_, i) => i !== idx));

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {items.map((it, i) => (
          <Tag key={it} label={it} onRemove={() => remove(i)} />
        ))}
      </div>

      <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Painel de Tags</h3>
        <p style={{ fontSize: 14, color: '#6B7280' }}>Use as tags para filtrar ou marcar itens.</p>
      </div>
    </div>
  );
}

export default PanelDemo;`,
      },
    },
  },
};

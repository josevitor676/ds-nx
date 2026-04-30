import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RadioField } from './RadioField';

const meta: Meta<typeof RadioField> = {
  title: 'Components/RadioField',
  component: RadioField,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof RadioField>;

export const Default: Story = { args: { label: 'Opção A', value: 'a' } };
export const Checked: Story = { args: { label: 'Opção A', value: 'a', selectedValue: 'a' } };
export const Disabled: Story = { args: { label: 'Desabilitado', value: 'x', disabled: true } };

const RadioExample = () => {
  const [selected, setSelected] = useState('option1');

  return (
    <div>
      <nav className="ds-flex ds-gap-4 ds-items-center">
        <RadioField label="Opção 1" value="option1" selectedValue={selected} onChange={(v) => setSelected(v)} />
        <RadioField label="Opção 2" value="option2" selectedValue={selected} onChange={(v) => setSelected(v)} />
        <RadioField label="Opção 3" value="option3" selectedValue={selected} onChange={(v) => setSelected(v)} />
      </nav>

      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded">
        <h3 className="ds-text-[16px] ds-font-semibold ds-mb-2">Selecionado: {selected}</h3>
        <p className="ds-text-[14px] ds-text-neutral-700">Escolha uma opção acima para ver a seleção aqui.</p>
      </div>
    </div>
  );
};

export const Example: Story = {
  render: () => <RadioExample />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { RadioField } from './RadioField';

function RadioExample() {
  const [selected, setSelected] = useState('option1');
  return (
    <div>
      <RadioField label="Opção 1" value="option1" selectedValue={selected} onChange={(v) => setSelected(v)} />
      <RadioField label="Opção 2" value="option2" selectedValue={selected} onChange={(v) => setSelected(v)} />
      <RadioField label="Opção 3" value="option3" selectedValue={selected} onChange={(v) => setSelected(v)} />

      <div>Selecionado: {selected}</div>
    </div>
  );
}

export default RadioExample;`,
      },
    },
  },
};

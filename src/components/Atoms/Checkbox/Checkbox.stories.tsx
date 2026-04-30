import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    value: { control: 'select', options: ['check', 'uncheck', 'indeterminate'] },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { label: 'Opção', value: 'uncheck' } };
export const Checked: Story = { args: { label: 'Selecionado', value: 'check' } };
export const Indeterminate: Story = { args: { label: 'Parcial', value: 'indeterminate' } };
export const Disabled: Story = { args: { label: 'Desabilitado', value: 'uncheck', disabled: true } };

const NavigationComponentCheckbox = () => {
  const [values, setValues] = React.useState({ a: 'check', b: 'uncheck', c: 'uncheck' } as Record<string, string>);

  const toggle = (key: string) => {
    setValues((s) => ({ ...s, [key]: s[key] === 'check' ? 'uncheck' : 'check' }));
  };

  return (
    <div>
      <div className="ds-flex ds-gap-4">
        <Checkbox label="Opção A" value={values.a as 'check' | 'uncheck' | 'indeterminate'} onChange={() => toggle('a')} />
        <Checkbox label="Opção B" value={values.b as 'check' | 'uncheck' | 'indeterminate'} onChange={() => toggle('b')} />
        <Checkbox label="Opção C" value={values.c as 'check' | 'uncheck' | 'indeterminate'} onChange={() => toggle('c')} />
      </div>

      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded">
        <h3 className="ds-text-[16px] ds-font-semibold ds-mb-2">Seleções</h3>
        <p className="ds-text-[14px] ds-text-neutral-600">A: {values.a} — B: {values.b} — C: {values.c}</p>
      </div>
    </div>
  );
};

export const Navigation: Story = {
  render: () => <NavigationComponentCheckbox />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { Checkbox } from './Checkbox';\n\nfunction Example() {\n  const [values, setValues] = useState({ a: 'check', b: 'uncheck', c: 'uncheck' });\n  const toggle = (key) => setValues(s => ({ ...s, [key]: s[key] === 'check' ? 'uncheck' : 'check' }));\n  return (\n    <div>\n      <Checkbox label='Opção A' value={values.a} onChange={() => toggle('a')} />\n      <Checkbox label='Opção B' value={values.b} onChange={() => toggle('b')} />\n      <Checkbox label='Opção C' value={values.c} onChange={() => toggle('c')} />\n    </div>\n  );\n}\n\nrender: () => <Example />`,
      },
    },
  },
};

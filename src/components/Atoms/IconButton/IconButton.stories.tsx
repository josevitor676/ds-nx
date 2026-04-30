import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { IconButton } from './IconButton';

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant:      { control: 'select', options: ['filled', 'outlined', 'clear'] },
    colorVariant: { control: 'select', options: ['primary', 'error', 'neutral'] },
    size:         { control: 'select', options: ['sm', 'md', 'lg'] },
    icon: { control: false },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (args) => <IconButton {...args} icon={<SearchIcon />} />,
  args: { 'aria-label': 'Buscar', variant: 'filled', colorVariant: 'primary', size: 'md' },
};

export const Outlined: Story = {
  render: (args) => <IconButton {...args} icon={<EditIcon />} />,
  args: { 'aria-label': 'Editar', variant: 'outlined', colorVariant: 'primary', size: 'md' },
};

export const Clear: Story = {
  render: (args) => <IconButton {...args} icon={<DeleteIcon />} />,
  args: { 'aria-label': 'Excluir', variant: 'clear', colorVariant: 'error', size: 'md' },
};

export const Loading: Story = {
  render: (args) => <IconButton {...args} icon={<SearchIcon />} />,
  args: { 'aria-label': 'Carregando', isLoading: true, size: 'md' },
};

const ExampleComponent = () => {
  const [screen, setScreen] = useState('Busca');

  return (
    <div>
      <div className="ds-flex ds-items-center ds-gap-3">
        <IconButton aria-label="Buscar" icon={<SearchIcon />} onClick={() => setScreen('Busca')} />
        <IconButton aria-label="Editar" variant="outlined" icon={<EditIcon />} onClick={() => setScreen('Editar')} />
        <IconButton aria-label="Excluir" variant="clear" icon={<DeleteIcon />} onClick={() => setScreen('Excluir')} />
      </div>

      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded">
        <h3 className="ds-text-[16px] ds-font-semibold ds-mb-2">Ação selecionada: {screen}</h3>
        <p className="ds-text-[14px] ds-text-neutral-600">Clique nos botões acima para alternar a ação exibida aqui.</p>
      </div>
    </div>
  );
};

export const Example: Story = {
  render: () => <ExampleComponent />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { IconButton } from './IconButton';\n\nfunction Example() {\n  const [screen, setScreen] = useState('Busca');\n  return (\n    <div>\n      <div className="ds-flex ds-items-center ds-gap-3">\n        <IconButton aria-label="Buscar" icon={<SearchIcon />} onClick={() => setScreen('Busca')} />\n        <IconButton aria-label="Editar" variant="outlined" icon={<EditIcon />} onClick={() => setScreen('Editar')} />\n        <IconButton aria-label="Excluir" variant="clear" icon={<DeleteIcon />} onClick={() => setScreen('Excluir')} />\n      </div>\n\n      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded">\n        <h3 className="ds-text-[16px] ds-font-semibold ds-mb-2">Ação selecionada: {screen}</h3>\n        <p className="ds-text-[14px] ds-text-neutral-600">Clique nos botões acima para alternar a ação exibida aqui.</p>\n      </div>\n    </div>\n  );\n}\n\nexport default Example;`,
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconExternalLink } from '@tabler/icons-react';
import { useState } from 'react';
import { LinkButton } from './LinkButton';

const meta: Meta<typeof LinkButton> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  argTypes: {
    colorVariant: {
      description: 'Paleta de cor do link. `primary` usa azul (`primary-500`), `neutral` usa cinza (`neutral-600`).',
      control: 'select',
      options: ['primary', 'neutral'],
      table: { defaultValue: { summary: 'primary' } },
    },
    disabled: {
      description: 'Desabilita o link: remove o `href`, bloqueia cliques e aplica opacidade reduzida.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    leftIcon: { control: false, description: 'Ícone exibido à esquerda do texto.' },
    rightIcon: { control: false, description: 'Ícone exibido à direita do texto.' },
    label: { description: 'Texto visível do link.' },
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = { args: { label: 'Ver detalhes', colorVariant: 'primary' } };
export const Neutral: Story = { args: { label: 'Saiba mais', colorVariant: 'neutral' } };

export const WithLeftIcon: Story = {
  args: {
    label: 'Abrir link',
    colorVariant: 'primary',
    leftIcon: <IconExternalLink size={16} stroke={1.5} />,
  },
};

export const WithRightIcon: Story = {
  render: (args) => (
    <LinkButton
      {...args}
      href="https://example.com"
      target="_blank"
      rel="noopener noreferrer"
      rightIcon={<IconExternalLink size={16} stroke={1.5} />}
    />
  ),
  args: { label: 'Abrir site externo', colorVariant: 'primary' },
};

export const Disabled: Story = { args: { label: 'Indisponível', colorVariant: 'primary', disabled: true } };

const NavigationExample = () => {
  const [screen, setScreen] = useState('Visão geral');

  return (
    <div>
      <nav className="ds-flex ds-gap-4 ds-items-center">
        <LinkButton label="Visão geral" colorVariant="neutral" onClick={() => setScreen('Visão geral')} />
        <LinkButton
          label="Detalhes"
          colorVariant="primary"
          onClick={() => setScreen('Detalhes')}
          rightIcon={<IconExternalLink size={16} stroke={1.5} />}
        />
        <LinkButton label="Configurações" colorVariant="neutral" onClick={() => setScreen('Configurações')} />
      </nav>

      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded">
        <h3 className="ds-text-16 ds-font-semibold ds-mb-2">Seção: {screen}</h3>
        <p className="ds-text-14 ds-text-neutral-700">Conteúdo simulado para a seção {screen}.</p>
      </div>
    </div>
  );
};

export const Example: Story = {
  render: () => <NavigationExample />,
  parameters: {
    docs: {
      source: {
        code: `import { IconExternalLink } from '@tabler/icons-react';
import { LinkButton } from '@ds/components';

function NavigationExample() {
  const [screen, setScreen] = useState('Visão geral');
  return (
    <nav className="ds-flex ds-gap-4 ds-items-center">
      <LinkButton label="Visão geral" colorVariant="neutral" onClick={() => setScreen('Visão geral')} />
      <LinkButton
        label="Detalhes"
        colorVariant="primary"
        onClick={() => setScreen('Detalhes')}
        rightIcon={<IconExternalLink size={16} stroke={1.5} />}
      />
    </nav>
  );
}`,
      },
    },
  },
};

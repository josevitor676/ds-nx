import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    thickness: { control: 'select', options: [1, 2] },
    color: { control: 'select', options: [100, 600] },
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = { args: { orientation: 'horizontal', thickness: 1, color: 600 } };
export const Subtle: Story = { args: { orientation: 'horizontal', thickness: 1, color: 100 } };
export const Thick: Story = { args: { orientation: 'horizontal', thickness: 2, color: 600 } };
export const ThickSubtle: Story = { args: { orientation: 'horizontal', thickness: 2, color: 100 } };
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [(S) => <div style={{ height: 60, display: 'flex' }}><S /></div>],
};

const NavigationComponent = () => {
  const [screen, setScreen] = useState('Tela 1');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, target: string) => {
    e.preventDefault();
    setScreen(target);
  };

  return (
    <div>
      <nav className="ds-flex ds-gap-3 ds-items-center">
        <Button onClick={(e) => handleClick(e, 'Tela 1')}>Tela 1</Button>

        <div style={{ height: 24, display: 'flex', alignItems: 'center' }}>
          <Divider orientation="vertical" />
        </div>

        <Button onClick={(e) => handleClick(e, 'Tela 2')}>Tela 2</Button>

        <div style={{ height: 24, display: 'flex', alignItems: 'center' }}>
          <Divider orientation="vertical" />
        </div>

        <Button onClick={(e) => handleClick(e, 'Tela 3')}>Tela 3</Button>
      </nav>

      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded">
        <h3 className="ds-text-[16px] ds-font-semibold ds-mb-2">Conteúdo da {screen}</h3>
        <Divider orientation="horizontal" thickness={2}/>
        <p className="ds-text-[14px] ds-text-neutral-600">Aqui vai o conteúdo simulado da {screen}.</p>
      </div>
    </div>
  );
};

export const Navigation: Story = {
  render: () => <NavigationComponent />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { Divider } from './Divider';\nimport { Button } from '../Button/Button';\n\nfunction NavigationExample() {\n  const [screen, setScreen] = useState('Tela 1');\n  const handleClick = (e, target) => { e.preventDefault(); setScreen(target); };\n\n  return (\n    <div>\n      <nav className="ds-flex ds-gap-3 ds-items-center">\n        <Button label="Tela 1" onClick={(e) => handleClick(e, 'Tela 1')} />\n        <div style={{ height: 24, display: 'flex', alignItems: 'center' }}><Divider orientation="vertical" /></div>\n        <Button label="Tela 2" onClick={(e) => handleClick(e, 'Tela 2')} />\n        <div style={{ height: 24, display: 'flex', alignItems: 'center' }}><Divider orientation="vertical" /></div>\n        <Button label="Tela 3" onClick={(e) => handleClick(e, 'Tela 3')} />\n      </nav>\n\n      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded">\n        <h3 className="ds-text-[16px] ds-font-semibold ds-mb-2">Conteúdo da {screen}</h3>\n  <Divider orientation="horizontal" thickness={2}/>   \n    <p className="ds-text-[14px] ds-text-neutral-600">Aqui vai o conteúdo simulado da {screen}.</p>\n      </div>\n    </div>\n  );\n}\n\nexport default NavigationExample;`,
      },
    },
  },
};

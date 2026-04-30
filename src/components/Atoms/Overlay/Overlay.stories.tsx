import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Overlay } from './Overlay';

const meta: Meta<typeof Overlay> = {
  title: 'Components/Overlay',
  component: Overlay,
  tags: ['autodocs'],
  argTypes: {
    isVisible: { control: 'boolean' },
    zIndex: { control: 'number' },
  },
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
  args: { isVisible: true },
};

export const WithClickHandler: Story = {
  args: { isVisible: true, onClick: () => alert('Overlay clicked') },
};

const OverlayExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="ds-p-6 ds-bg-white ds-rounded ds-shadow">
        <h3 className="ds-text-[18px] ds-font-semibold ds-mb-4">Conteúdo da página</h3>
        <p className="ds-text-[14px] ds-text-neutral-700 ds-mb-4">Esta é uma área de conteúdo por trás do overlay.</p>
        <div className="ds-flex ds-gap-3">
          <Button onClick={() => setOpen(true)}>Abrir Overlay</Button>
          <Button variant="outlined" onClick={() => alert('Outra ação')}>Outra ação</Button>
        </div>
      </div>

      <Overlay isVisible={open} onClick={() => setOpen(false)} />

      {open && (
        <div className="ds-fixed ds-inset-0 ds-flex ds-items-center ds-justify-center ds-pointer-events-none">
          <div className="ds-bg-white ds-p-6 ds-rounded ds-shadow ds-pointer-events-auto" style={{ zIndex: 20 }}>
            <h4 className="ds-text-[16px] ds-font-semibold ds-mb-2">Overlay aberto</h4>
            <p className="ds-text-[14px] ds-text-neutral-700 ds-mb-4">Clique fora para fechar o overlay.</p>
            <div className="ds-flex ds-justify-end">
              <Button variant="outlined" onClick={() => setOpen(false)}>Fechar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Example: Story = {
  render: () => <OverlayExample />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { Overlay } from './Overlay';
import { Button } from '../Button/Button';

function OverlayExample() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button label="Abrir Overlay" onClick={() => setOpen(true)} />
      <Overlay isVisible={open} onClick={() => setOpen(false)} />
      {open && (
        <div className="ds-fixed ds-inset-0 ds-flex ds-items-center ds-justify-center">
          <div style={{ zIndex: 20 }}>
            <h4>Overlay aberto</h4>
            <Button label="Fechar" onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default OverlayExample;`,
      },
    },
  },
};

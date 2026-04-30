import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = { args: { label: 'Ativo', checked: false } };
export const Disabled: Story = { args: { label: 'Não clicável', checked: false, disabled: true } };

const ControlledExample = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="ds-flex ds-flex-col ds-items-center ds-gap-4">
      <Switch label="Notificações" checked={checked} onChange={setChecked} />
      <div className="ds-text-[14px] ds-text-neutral-600">Estado: {checked ? 'Ligado' : 'Desligado'}</div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { Switch } from './Switch';

function ControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Switch label="Notificações" checked={checked} onChange={setChecked} />
      <div>Estado: {checked ? 'Ligado' : 'Desligado'}</div>
    </div>
  );
}

export default ControlledExample;`,
      },
    },
  },
};

const Demo = () => {
  const [notifOn, setNotifOn] = useState(true);

  return (
    <div>
      <div className="ds-p-4 ds-border ds-border-neutral-100 ds-rounded">
        <div className="ds-flex ds-items-center ds-justify-between">

          <div className="ds-flex ds-flex-col ds-gap-3">
            <div className="ds-flex ds-items-center ds-gap-3">
              <div className="ds-text-[14px] ds-text-neutral-700">Notificações</div>
              <Switch label="" checked={notifOn} onChange={setNotifOn} />
            </div>

            <FeatureControls />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureControls = () => {
  const [sound, setSound] = useState(false);
  const [location, setLocation] = useState(true);

  return (
    <div className="ds-flex ds-flex-col ds-gap-2">
      <div className="ds-flex ds-items-center ds-gap-3">
        <div className="ds-text-[14px] ds-text-neutral-700">Som</div>
        <Switch label="" checked={sound} onChange={setSound} />
      </div>

      <div className="ds-flex ds-items-center ds-gap-3">
        <div className="ds-text-[14px] ds-text-neutral-700">Localização</div>
        <Switch label="" checked={location} onChange={setLocation} />
      </div>
    </div>
  );
};

export const Navigation: Story = {
  render: () => <Demo />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { Switch } from './Switch';

function Demo() {
  const [sound, setSound] = useState(false);
  const [location, setLocation] = useState(true);

  return (
    <div className="ds-flex ds-flex-col ds-gap-2">
      <div className="ds-flex ds-items-center ds-gap-3">
        <div className="ds-text-[14px] ds-text-neutral-700">Som</div>
        <Switch label="" checked={sound} onChange={setSound} />
      </div>

      <div className="ds-flex ds-items-center ds-gap-3">
        <div className="ds-text-[14px] ds-text-neutral-700">Localização</div>
        <Switch label="" checked={location} onChange={setLocation} />
      </div>
    </div>
  );
}

export default Demo;`,
      },
    },
  },
};
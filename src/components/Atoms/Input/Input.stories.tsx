import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconEye, IconEyeOff, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    state: {
      description: 'Estado visual do campo.',
      control: 'select',
      options: ['default', 'hover', 'filled', 'error'],
      table: { type: { summary: "'default' | 'hover' | 'filled' | 'error'" }, defaultValue: { summary: 'default' } },
    },
    label: {
      description: 'Rótulo exibido acima do campo.',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'undefined' } },
    },
    placeholder: {
      description: 'Texto exibido quando o campo está vazio.',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Digite aqui...' } },
    },
    helperText: {
      description: 'Texto auxiliar exibido abaixo do campo. Use para mensagens de erro ou instrução.',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'undefined' } },
    },
    leftElement: {
      description: 'Elemento exibido à esquerda do campo. Recebe qualquer `ReactNode` — tipicamente um ícone `@tabler/icons-react`. O componente injeta `size: 20` e `stroke: 1.5` automaticamente.',
      table: { type: { summary: 'ReactNode' }, defaultValue: { summary: 'undefined' } },
    },
    rightElement: {
      description: 'Elemento exibido à direita do campo. Ideal para ações contextuais como alternar a visibilidade de senha. O componente injeta `size: 20` e `stroke: 1.5` automaticamente.',
      table: { type: { summary: 'ReactNode' }, defaultValue: { summary: 'undefined' } },
    },
    disabled: {
      description: 'Desabilita o campo e aplica estilos de estado inativo.',
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    value: {
      description: 'Valor controlado do campo.',
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'undefined' } },
    },
    onChange: {
      description: 'Callback chamado com o evento de mudança do input nativo.',
      table: { type: { summary: '(e: React.ChangeEvent<HTMLInputElement>) => void' } },
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
O **Input** é o campo de texto de uso geral. Suporta ícones à esquerda e à direita para contextos como busca, senhas e campos com ações inline.

---

### ✅ Quando usar

- **Texto livre** — nome, e-mail, endereço, comentários curtos.
- **Busca** — combine com \`leftElement={<IconSearch />}\` para sinalizar a função do campo.
- **Senha** — use \`rightElement\` com um botão de alternância para revelar/ocultar o valor.
- **Campo com ação inline** — qualquer interação que dependa do valor digitado pode ser exposta via \`rightElement\`.

### ❌ Quando não usar

- **Escolha entre opções** — se o usuário seleciona de uma lista, use **Select** ou **RadioField**.
- **Texto longo** — para parágrafos ou conteúdo multilinha, use um \`<textarea>\`.
- **Data/hora** — use o **DatePicker** dedicado para garantir a formatação correta.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// — Estados individuais —
export const Default: Story = {
  args: { label: 'Label', placeholder: 'Digite aqui...', state: 'default' },
  parameters: { docs: { description: { story: 'Estado padrão, sem interação. A borda muda para `neutral-600` ao hover e para `primary-500` ao receber foco.' } } },
};

export const Hover: Story = {
  args: { label: 'Label', placeholder: 'Digite aqui...', state: 'hover' },
  parameters: { docs: { description: { story: 'Estado com cursor sobre o campo — borda em `neutral-600`.' } } },
};

export const Filled: Story = {
  args: { label: 'Label', value: 'Valor preenchido', state: 'filled' },
  parameters: { docs: { description: { story: 'Estado preenchido — campo com valor digitado.' } } },
};

export const Error: Story = {
  args: { label: 'Label', placeholder: 'Digite aqui...', state: 'error', helperText: 'Campo obrigatório.' },
  parameters: { docs: { description: { story: 'Estado de erro — borda em `error-500` e mensagem auxiliar de apoio.' } } },
};

export const Disabled: Story = {
  args: { label: 'Label', placeholder: 'Não editável', disabled: true },
  parameters: { docs: { description: { story: 'Estado desabilitado — sem interação e fundo em `neutral-50`.' } } },
};

// — Com ícones —
export const WithLeftIcon: Story = {
  args: {
    label: 'Pesquisar',
    placeholder: 'Buscar...',
    leftElement: <IconSearch />,
    state: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `leftElement` para indicar a função do campo. Não passe `size` nem `stroke` — o componente injeta os valores padrão automaticamente.',
      },
    },
  },
};

const PasswordInput = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Input
      label="Senha"
      placeholder="Digite sua senha"
      type={visible ? 'text' : 'password'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      state={value ? 'filled' : 'default'}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="ds-flex ds-items-center ds-justify-center ds-text-neutral-400 hover:ds-text-neutral-600 ds-transition-colors ds-cursor-pointer"
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {visible ? <IconEyeOff size={20} stroke={1.5} /> : <IconEye size={20} stroke={1.5} />}
        </button>
      }
    />
  );
};

export const WithRightIcon: Story = {
  render: () => <PasswordInput />,
  parameters: {
    docs: {
      description: {
        story: 'Use `rightElement` para ações contextuais. Exemplo de campo de senha com alternância de visibilidade via `IconEye` / `IconEyeOff`.',
      },
      source: {
        code: `import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { Input } from '@/components';

function PasswordInput() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Input
      label="Senha"
      placeholder="Digite sua senha"
      type={visible ? 'text' : 'password'}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      state={value ? 'filled' : 'default'}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {visible ? <IconEyeOff /> : <IconEye />}
        </button>
      }
    />
  );
}`,
      },
    },
  },
};

// — Exemplo interativo —
const FormExample = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const preview = [
    { label: 'Nome', value: name },
    { label: 'E-mail', value: email },
    { label: 'Pesquisa', value: query },
    { label: 'Senha', value: password ? '••••••••' : '' },
  ];

  return (
    <div>
      <div className="ds-flex ds-flex-col ds-gap-4">
        <Input
          label="Nome"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          state={name ? 'filled' : 'default'}
        />
        <Input
          label="E-mail"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          state={email ? 'filled' : 'default'}
        />
        <Input
          label="Pesquisar"
          placeholder="Buscar..."
          leftElement={<IconSearch />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          state={query ? 'filled' : 'default'}
        />
        <Input
          label="Senha"
          placeholder="Digite sua senha"
          type={visible ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          state={password ? 'filled' : 'default'}
          rightElement={
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              className="ds-flex ds-items-center ds-justify-center ds-text-neutral-400 hover:ds-text-neutral-600 ds-transition-colors ds-cursor-pointer"
              aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {visible ? <IconEyeOff size={20} stroke={1.5} /> : <IconEye size={20} stroke={1.5} />}
            </button>
          }
        />
      </div>

      <div className="ds-mt-6 ds-p-4 ds-border ds-border-neutral-100 ds-rounded-[4px]">
        <h3 className="ds-text-[16px] ds-font-semibold ds-mb-3 ds-text-neutral-700">Valores</h3>
        <div className="ds-flex ds-flex-col ds-gap-[8px]">
          {preview.map((item) => (
            <div key={item.label} className="ds-flex ds-gap-[8px] ds-text-[14px]">
              <span className="ds-text-neutral-400 ds-w-[80px]">{item.label}:</span>
              <span className="ds-text-neutral-600 ds-font-medium">{item.value || '—'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Example: Story = {
  render: () => <FormExample />,
  parameters: {
    docs: {
      description: {
        story: 'Formulário controlado com múltiplos campos — texto simples, busca com ícone e senha com toggle de visibilidade.',
      },
      source: {
        code: `import { useState } from 'react';
import { IconEye, IconEyeOff, IconSearch } from '@tabler/icons-react';
import { Input } from '@/components';

function FormExample() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <div className="ds-flex ds-flex-col ds-gap-4">
      <Input
        label="Nome"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        state={name ? 'filled' : 'default'}
      />
      <Input
        label="E-mail"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        state={email ? 'filled' : 'default'}
      />
      <Input
        label="Pesquisar"
        placeholder="Buscar..."
        leftElement={<IconSearch />}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        state={query ? 'filled' : 'default'}
      />
      <Input
        label="Senha"
        placeholder="Digite sua senha"
        type={visible ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        state={password ? 'filled' : 'default'}
        rightElement={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {visible ? <IconEyeOff /> : <IconEye />}
          </button>
        }
      />
    </div>
  );
}`,
      },
    },
  },
};

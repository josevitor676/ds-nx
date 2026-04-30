/**
 * figma-scaffold.mjs
 *
 * Lê src/figma-components.json (gerado por sync:figma:components) e cria
 * automaticamente o scaffolding de componentes ainda não implementados.
 *
 * Para cada componente novo gera:
 *   src/components/{Tier}/{Name}/{Name}.tsx
 *   src/components/{Tier}/{Name}/{Name}.stories.tsx
 *
 * Uso:
 *   node scripts/figma-scaffold.mjs           → scaffold de todos os pendentes
 *   node scripts/figma-scaffold.mjs --dry-run → só lista, não cria arquivos
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = resolve(__dirname, '..');
const DRY_RUN   = process.argv.includes('--dry-run');

// ─── 1. Carregar lista de componentes do Figma ────────────────────────────────

const figmaComponentsPath = resolve(ROOT, 'src/figma-components.json');
if (!existsSync(figmaComponentsPath)) {
  console.error('❌  src/figma-components.json não encontrado.');
  console.error('    Execute primeiro: npm run sync:figma:components\n');
  process.exit(1);
}

const { components: figmaGroups } = JSON.parse(readFileSync(figmaComponentsPath, 'utf-8'));

// ─── 2. Mapeamento: nome Figma → configuração do componente ───────────────────

// Componentes que já existem — ignorar no scaffold
const ALREADY_IMPLEMENTED = new Set(['Button', 'Tooltip']);

// Mapeamento de nomes Figma (lowercase) → PascalCase + tier atômico
const COMPONENT_MAP = {
  'button':               { name: 'Button',            tier: 'Atoms' },
  'icon button':          { name: 'IconButton',        tier: 'Atoms' },
  'link button':          { name: 'LinkButton',        tier: 'Atoms' },
  'button group':         { name: 'ButtonGroup',       tier: 'Molecules' },
  'checkbox':             { name: 'Checkbox',          tier: 'Atoms' },
  'checkbox group':       { name: 'CheckboxGroup',     tier: 'Molecules' },
  'radio field':          { name: 'RadioField',        tier: 'Atoms' },
  'radio group':          { name: 'RadioGroup',        tier: 'Molecules' },
  'switch button':        { name: 'Switch',            tier: 'Atoms' },
  'input':                { name: 'Input',             tier: 'Atoms' },
  'text area':            { name: 'Textarea',          tier: 'Atoms' },
  'single select':        { name: 'Select',            tier: 'Atoms' },
  'multi select':         { name: 'MultiSelect',       tier: 'Molecules' },
  'combobox multi select':{ name: 'ComboboxMulti',     tier: 'Molecules' },
  'tags':                 { name: 'Tag',               tier: 'Atoms' },
  'tooltip':              { name: 'Tooltip',           tier: 'Atoms' },
  'divider':              { name: 'Divider',           tier: 'Atoms' },
  'progress bar':         { name: 'ProgressBar',       tier: 'Atoms' },
  'breadcrumb inner':     { name: 'BreadcrumbItem',    tier: 'Atoms' },
  'breadcrumbs group':    { name: 'Breadcrumb',        tier: 'Molecules' },
  'tabs group':           { name: 'Tabs',              tier: 'Molecules' },
  'dialog':               { name: 'Dialog',            tier: 'Molecules' },
  'modal set':            { name: 'Modal',             tier: 'Molecules' },
  'overlay':              { name: 'Overlay',           tier: 'Atoms' },
  'popover':              { name: 'Popover',           tier: 'Molecules' },
  'toast':                { name: 'Toast',             tier: 'Molecules' },
  'header':               { name: 'Header',            tier: 'Molecules' },
  'side menu':            { name: 'SideMenu',          tier: 'Molecules' },
  'pagination container': { name: 'Pagination',        tier: 'Molecules' },
  'date picker':          { name: 'DatePicker',        tier: 'Molecules' },
  'date picker range':    { name: 'DatePickerRange',   tier: 'Molecules' },
  'exibition grid':       { name: 'ExhibitionGrid',    tier: 'Molecules' },
  'top cell':             { name: 'TableHeaderCell',   tier: 'Atoms' },
};

// ─── 3. Extrair props únicas das variantes do Figma ───────────────────────────

/**
 * Recebe um array de variant strings como:
 *   ["size=sm, color=blue, type=filled", "size=md, color=red, type=clear"]
 * Devolve um Record<propName, string[]> com os valores únicos de cada prop.
 */
function extractProps(variantNames) {
  const props = {};

  for (const variantStr of variantNames) {
    const pairs = variantStr.split(',').map(s => s.trim());
    for (const pair of pairs) {
      const eqIdx = pair.indexOf('=');
      if (eqIdx === -1) continue;
      const key   = pair.slice(0, eqIdx).trim();
      const value = pair.slice(eqIdx + 1).trim();
      if (!props[key]) props[key] = new Set();
      props[key].add(value);
    }
  }

  // Converte Sets para arrays ordenados
  return Object.fromEntries(
    Object.entries(props).map(([k, v]) => [k, [...v].sort()])
  );
}

/** Converte "kebab-case" ou "snake case" → camelCase */
function toCamelCase(str) {
  return str.replace(/[-\s]+(.)/g, (_, c) => c.toUpperCase());
}

/** Mapeia valores de prop do Figma para TypeScript union string */
function buildUnion(values) {
  return values.map(v => `"${v.replace(/"/g, '\\"')}"`).join(' | ');
}

// ─── 4. Geradores de código ───────────────────────────────────────────────────

function generateComponentFile(name, props) {
  const propsInterface = Object.entries(props)
    .map(([key, values]) => {
      const camel     = toCamelCase(key);
      const union     = buildUnion(values);
      return `  /** Figma prop: ${key} */\n  ${camel}?: ${union};`;
    })
    .join('\n');

  const defaultProps = Object.entries(props)
    .map(([key, values]) => `  ${toCamelCase(key)} = "${values[0]}"`)
    .join(',\n');

  const hasChildren = !['Divider', 'ProgressBar', 'Tag', 'Toast'].includes(name);

  return `import React from 'react';

export interface ${name}Props {
${propsInterface}${hasChildren ? `\n  children?: React.ReactNode;` : ''}
  className?: string;
}

/**
 * ${name}
 * TODO: implementar com base no Figma.
 * Props extraídas automaticamente das variantes do Figma.
 */
export const ${name} = ({
${defaultProps ? defaultProps + ',' : ''}
${hasChildren ? '  children,' : ''}
  className,
}: ${name}Props) => {
  return (
    <div className={['ds-inline-flex ds-items-center', className].filter(Boolean).join(' ')}>
      {/* TODO: implementar ${name} */}
      ${hasChildren ? '{children}' : `<span>${name}</span>`}
    </div>
  );
};
`;
}

function generateStoriesFile(name, tier, props) {
  const argTypes = Object.entries(props)
    .map(([key, values]) => {
      const camel = toCamelCase(key);
      const optionsArray = values.map(v => `'${v}'`).join(', ');
      return `    ${camel}: {\n      control: 'select',\n      options: [${optionsArray}],\n    },`;
    })
    .join('\n');

  const args = Object.entries(props)
    .map(([key, values]) => `    ${toCamelCase(key)}: ${JSON.stringify(values[0])},`)
    .join('\n');

  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: '${tier}/${name}',
  component: ${name},
  tags: ['autodocs'],
  argTypes: {
${argTypes}
  },
};

export default meta;
type Story = StoryObj<typeof ${name}>;

export const Default: Story = {
  args: {
${args}
  },
};
`;
}

// ─── 5. Executar scaffold ─────────────────────────────────────────────────────

const created = [];
const skipped = [];
const unknown = [];

for (const [figmaName, variantNames] of Object.entries(figmaGroups)) {
  const key    = figmaName.toLowerCase();
  const config = COMPONENT_MAP[key];

  if (!config) {
    unknown.push(figmaName);
    continue;
  }

  const { name, tier } = config;

  if (ALREADY_IMPLEMENTED.has(name)) {
    skipped.push(`${tier}/${name}  (já implementado)`);
    continue;
  }

  const componentDir = resolve(ROOT, `src/components/${tier}/${name}`);
  const tsxPath      = resolve(componentDir, `${name}.tsx`);
  const storiesPath  = resolve(componentDir, `${name}.stories.tsx`);

  if (existsSync(tsxPath)) {
    skipped.push(`${tier}/${name}  (arquivo já existe)`);
    continue;
  }

  const props = extractProps(variantNames);

  if (!DRY_RUN) {
    mkdirSync(componentDir, { recursive: true });
    writeFileSync(tsxPath,      generateComponentFile(name, props),       'utf-8');
    writeFileSync(storiesPath,  generateStoriesFile(name, tier, props),   'utf-8');
  }

  created.push(`${tier}/${name}`);
}

// ─── 6. Relatório ─────────────────────────────────────────────────────────────

console.log(`\n🚀  Figma Scaffold${DRY_RUN ? ' (DRY RUN — nenhum arquivo criado)' : ''}\n`);

if (created.length) {
  console.log(`✅  ${created.length} componente(s) criado(s):`);
  for (const c of created) console.log(`    • ${c}`);
}

if (skipped.length) {
  console.log(`\n⏭️   ${skipped.length} ignorado(s):`);
  for (const c of skipped) console.log(`    • ${c}`);
}

if (unknown.length) {
  console.log(`\n⚠️   ${unknown.length} grupo(s) sem mapeamento (adicione em COMPONENT_MAP):`);
  for (const c of unknown) console.log(`    • "${c}"`);
}

console.log(`\n💡  Próximo passo: abra os arquivos gerados e implemente cada componente.`);
console.log(`    Use \`npm run storybook\` para visualizar enquanto desenvolve.\n`);

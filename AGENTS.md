# Gazin Tech Design System — Agent Guidelines

## Visão Geral

Biblioteca de componentes React interna da Gazin Tech, com arquitetura Atomic Design (Atoms → Molecules), TypeScript strict, Tailwind CSS com prefixo `ds-`, CVA para variantes e Storybook 10 para documentação.

## Idioma

O agente deve responder em **português** ao interagir sobre este repositório.

## Stack

React 19 · TypeScript 5.9 · Tailwind 3.4 (prefixo `ds-`) · CVA 0.7 · Radix UI · Storybook 10.3

## Comandos

```bash
npm run dev                    # Vite dev server
npm run storybook              # Storybook em http://localhost:6006
npm run build                  # tsc + vite build
npm run build-storybook        # Build estático do Storybook
npm run lint                   # ESLint
npm run sync:figma             # Sync tokens + componentes do Figma
npm run sync:figma:tokens      # Apenas tokens → src/figma.tokens.json
npm run sync:figma:components  # Apenas componentes → src/figma-components.json
```

## Regras Críticas

1. **Prefixo `ds-` obrigatório** em toda classe Tailwind — `ds-flex`, `ds-bg-primary-500`, nunca sem prefixo
2. **Design tokens, não valores hardcoded** — cores, radii e sombras sempre via tokens
3. **`React.forwardRef`** em todo componente, com `displayName` definido
4. **`className` aceito e repassado** via `cn()` de `src/lib/utils`
5. **Três arquivos por componente**: `Component.tsx`, `component.variants.ts`, `Component.stories.tsx`
6. **Exportar** todo componente novo em `src/index.ts`

## Estrutura de Componentes

```
src/components/{Atoms|Molecules}/{ComponentName}/
  ComponentName.tsx          # Implementação com forwardRef
  componentName.variants.ts  # Variantes CVA
  ComponentName.stories.tsx  # Stories CSF 3
```

## Pipeline de Tokens

```
src/figma.tokens.json → src/theme/tokens-adapter.ts → src/index.css (CSS vars) → tailwind.config.js
```

Nunca edite `src/figma.tokens.json` manualmente — é gerado por `npm run sync:figma:tokens`.

## Instructions (Regras por Contexto)

Instruções específicas são aplicadas automaticamente conforme o tipo de arquivo:

| Instrução                    | Escopo (`applyTo`)                | Arquivo                                                                     |
| ---------------------------- | --------------------------------- | --------------------------------------------------------------------------- |
| Implementação de componentes | `src/components/**/*.tsx`         | [component.instructions.md](.github/instructions/component.instructions.md) |
| Stories do Storybook         | `src/components/**/*.stories.tsx` | [stories.instructions.md](.github/instructions/stories.instructions.md)     |
| Classes Tailwind e tokens    | Global                            | [tailwind.instructions.md](.github/instructions/tailwind.instructions.md)   |
| Variantes CVA                | `src/components/**/*.variants.ts` | [variants.instructions.md](.github/instructions/variants.instructions.md)   |
| Sistema de temas             | `src/theme/**`                    | [theme.instructions.md](.github/instructions/theme.instructions.md)         |
| Workflows e comandos         | Global                            | [instructions.md](.github/instructions/instructions.md)                     |

## Agentes Especializados

| Agente           | Quando usar                                                             | Arquivo                                                           |
| ---------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `ds-component`   | Criar ou editar componentes (scaffold completo, Figma → código)         | [ds-component.agent.md](.github/agents/ds-component.agent.md)     |
| `ds-review`      | Auditoria read-only de compliance (prefixo, tokens, a11y, CVA, stories) | [ds-review.agent.md](.github/agents/ds-review.agent.md)           |
| `ds-sync`        | Reconciliar componente existente com design do Figma (pixel-perfect)    | [ds-sync.agent.md](.github/agents/ds-sync.agent.md)               |
| `ds-px-refactor` | Substituir valores arbitrários em px por escala Tailwind equivalente    | [ds-px-refactor.agent.md](.github/agents/ds-px-refactor.agent.md) |

## Prompts Disponíveis

| Prompt             | Descrição                                                       | Arquivo                                                                  |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `create-component` | Scaffold completo de componente novo (3 arquivos + export)      | [create-component.prompt.md](.github/prompts/create-component.prompt.md) |
| `add-variant`      | Adicionar variante ou compound variant a componente existente   | [add-variant.prompt.md](.github/prompts/add-variant.prompt.md)           |
| `create-story`     | Criar ou melhorar stories cobrindo todos os estados e variantes | [create-story.prompt.md](.github/prompts/create-story.prompt.md)         |
| `sync-figma`       | Sincronizar tokens/componentes do Figma e reportar gaps         | [sync-figma.prompt.md](.github/prompts/sync-figma.prompt.md)             |

## MCP Servers

| Servidor             | Endpoint                                 | Uso                                       |
| -------------------- | ---------------------------------------- | ----------------------------------------- |
| Storybook (local)    | `http://localhost:6006/mcp`              | Consultar componentes e tokens em dev     |
| Storybook (produção) | `https://design-system.gazin.com.br/mcp` | Documentação compartilhada                |
| Figma MCP            | Via extensão                             | Ler designs, extrair tokens e screenshots |

Tools úteis: `list_components`, `get_component_source`, `get_component_variants`, `list_tokens`, `get_figma_components`, `get_theme`

## Referências Canônicas

Quando houver dúvida sobre um padrão, consulte estes exemplos:

- `src/components/Atoms/Button/Button.tsx` — componente padrão com forwardRef
- `src/components/Atoms/Button/button.variants.ts` — CVA com compound variants
- `src/components/Atoms/Button/Button.stories.tsx` — stories com autodocs
- `src/components/Atoms/Input/Input.tsx` — form component com FormField
- `src/components/Atoms/Popover/Popover.tsx` — integração Radix UI
- `src/lib/utils.ts` — utilitário `cn()`
- `src/theme/themes/types.ts` — tipos de tokens do tema

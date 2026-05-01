# Design System

Biblioteca de componentes do Design System, documentada e visualizada via [Storybook](https://storybook.js.org/).

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/)
- **ou** [Node.js](https://nodejs.org/) 22+

---

## Rodando com Docker

### Desenvolvimento local

Sobe o Storybook em modo de desenvolvimento com hot-reload. As alterações nos arquivos locais são refletidas em tempo real.

```bash
docker compose up dev
```

Acesse em: **http://localhost:6006**

O container só será marcado como `healthy` quando a porta 6006 estiver respondendo.

### Produção

Faz o build do Storybook e serve os arquivos estáticos via NGINX.

```bash
docker compose up -d prod
```

Para forçar o rebuild da imagem (ex: após mudanças no código):

```bash
docker compose up -d --build prod
```

Acesse em: **http://localhost:8080**

---

## Rodando localmente (sem Docker)

Instale as dependências:

```bash
npm install
```

Inicie o Storybook:

```bash
npm run storybook
```

Acesse em: **http://localhost:6006**

---

## Testes

Os testes utilizam [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/).

### Executar em modo watch (desenvolvimento)

```bash
npm test
```

### Executar uma única vez

```bash
npm run test:run
```

### Executar com relatório de cobertura

```bash
npm run test:coverage
```

Os arquivos de teste ficam co-localizados com os componentes, seguindo o padrão `ComponentName.test.tsx`.

---

## Consumindo a biblioteca em outro projeto

### 1) Instalar a dependência

```bash
npm install @nexusshield/design-system
```

### 2) Importar estilos e configurar o ThemeProvider

No ponto de entrada da aplicação (ex.: `src/main.tsx`):

> O import `@nexusshield/design-system/index.css` já carrega o CSS compilado da biblioteca (tokens, variáveis e estilos base dos componentes). Não é necessário configurar Tailwind apenas para usar os componentes do Design System.

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@nexusshield/design-system"
import "@nexusshield/design-system/index.css"
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider initialTheme="default">
      <App />
    </ThemeProvider>
  </StrictMode>
)
```

### 3) Usar componentes

Exemplo básico:

```tsx
import { Button, Input } from "@nexusshield/design-system"

export function Example() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Input label="Nome" placeholder="Digite seu nome" />
      <Button>Salvar</Button>
    </div>
  )
}
```

### 4) Compatibilidade

- `react` e `react-dom`: `^19`
- `@tabler/icons-react`: `^3` (peer dependency)

Se necessário:

```bash
npm install @tabler/icons-react
```

### 5) Tailwind no projeto consumidor (opcional)

Se o projeto consumidor também usar Tailwind para estilização própria, isso é totalmente compatível com a biblioteca.

- Você pode usar utilitários Tailwind no app normalmente.
- Para manter consistência com o Design System, priorize os padrões/tokens do projeto e a convenção de classes com prefixo `ds-*` quando aplicável ao seu setup.

## MCP (Model Context Protocol)

### MCP local — via pacote npm

Após instalar `@nexusshield/design-system`, o CLI `ds-mcp` fica disponível e permite que assistentes de IA (GitHub Copilot, Claude) entendam os componentes, tokens e variantes do design system.

**VS Code (`settings.json`):**

```json
{
  "mcp": {
    "servers": {
      "nexusshield-ds": {
        "type": "stdio",
        "command": "npx",
        "args": ["ds-mcp"]
      }
    }
  }
}
```

**Claude Desktop (`claude_desktop_config.json`):**

```json
{
  "mcpServers": {
    "nexusshield-ds": {
      "command": "npx",
      "args": ["ds-mcp"]
    }
  }
}
```

Ferramentas disponíveis: `list_components`, `get_component_source`, `get_component_variants`, `list_tokens`, `get_theme`.

### MCP remoto — via Storybook hospedado

Para usar o MCP sem instalar o pacote, aponte diretamente para o Storybook hospedado na Vercel:

**VS Code (`settings.json`):**

```json
{
  "mcp": {
    "servers": {
      "nexusshield-ds": {
        "type": "http",
        "url": "https://ds-nx.vercel.app/mcp"
      }
    }
  }
}
```

**Claude Desktop (`claude_desktop_config.json`):**

```json
{
  "mcpServers": {
    "nexusshield-ds": {
      "type": "http",
      "url": "https://ds-nx.vercel.app/mcp"
    }
  }
}
```

### MCP para desenvolvimento interno (com Figma)

Para desenvolvimento interno do repositório design-system, use a configuração MCP com o servidor do Figma:

```bash
npx figma-developer-mcp --figma-api-key=token_figma
```

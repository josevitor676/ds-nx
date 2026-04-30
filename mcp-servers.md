# Servidores MCP

Este projeto utiliza dois servidores MCP (Model Context Protocol) que fornecem contexto ao GitHub Copilot e outros assistentes de IA diretamente no VS Code.

| Servidor | Descrição |
|---|---|
| `figma-developer` | Acessa a API do Figma para leitura de designs, tokens e componentes |
| `design-system` | Expõe ferramentas do próprio DS (componentes, tokens, variantes) ao Copilot |

---

## Verificando se os servidores estão ativos

### Via aba de Output

1. No VS Code, abra **View → Output** (`Ctrl+Shift+U`)
2. No dropdown no canto superior direito, selecione **"MCP: com.figma.mcp/n"** para o servidor do Figma

Se o servidor estiver rodando corretamente, você verá:

```
[info] Connection state: Running
[info] Discovered 13 tools
```

Esse é o sinal definitivo de que o servidor está ativo e as ferramentas estão disponíveis.

> Se ver `Connection state: Stopped` seguido de `Starting` e depois `Running`, o servidor foi reiniciado com sucesso — comportamento normal ao recarregar o VS Code.

### Via painel do Copilot Chat

1. Abra o **GitHub Copilot Chat** (`Ctrl+Alt+I`)
2. Selecione o modo **Agent**
3. Clique em **"Select tools..."** (ícone de ferramentas)
4. Verifique se as ferramentas aparecem na lista:
   - `list_components`, `get_component_source`, `get_component_variants`, `list_tokens`, `get_figma_components`, `get_theme` → servidor `design-system`
   - `get_design_context`, `get_metadata`, `get_screenshot`, etc. → servidor `figma-developer`

Se algum servidor **não aparecer**, ele não está rodando ou falhou ao iniciar.

---

## Iniciando / Reiniciando os servidores

Os servidores são iniciados automaticamente pelo VS Code ao abrir o workspace. Se não iniciarem:

### Via Command Palette

1. Pressione `Ctrl+Shift+P`
2. Digite e selecione: **"MCP: List Servers"**
3. Localize o servidor com problema e clique em **"Restart"**

### Testando o servidor `design-system` no terminal

```bash
node scripts/mcp-agent.mjs
```

Se iniciar corretamente, o processo ficará aguardando input sem erros. Use `Ctrl+C` para encerrar.

### Configurando o token do `figma-developer`

O servidor `figma-developer` requer um **Figma Personal Access Token**. Ao iniciar o VS Code, uma caixa de diálogo solicitará o token automaticamente.

Caso o token não seja solicitado ou esteja expirado:

1. Gere um novo token em: **Figma → Settings → Security → Personal access tokens**
   - Escopo necessário: **Read-only** em Files, Variables e Dev Resources
2. `Ctrl+Shift+P` → **"MCP: List Servers"** → `figma-developer` → **"Restart"**
3. O VS Code solicitará o token novamente

> **Importante:** O token começa com `figd_`. Nunca o commite no repositório — ele é solicitado em runtime exatamente para evitar isso.

---

## Diagnóstico de problemas comuns

### `npx: command not found` ou `figma-developer-mcp` não encontrado

```bash
node --version   # Requer Node.js 18+
npx --version
```

Se o Node não estiver instalado, baixe em <https://nodejs.org>.

### `Cannot find module` no servidor `design-system`

Verifique se está na raiz do projeto e o arquivo existe:

```bash
node scripts/mcp-agent.mjs
```

### Ferramentas somem após recarregar o VS Code

1. `Ctrl+Shift+P` → **"Developer: Reload Window"**
2. Aguarde alguns segundos e verifique novamente no painel de ferramentas

---

## Referências

- Configuração dos servidores: [`.mcp.json`](../.mcp.json)
- Implementação do servidor DS: [`scripts/mcp-agent.mjs`](../scripts/mcp-agent.mjs)
- Documentação MCP (Microsoft): <https://code.visualstudio.com/docs/copilot/chat/mcp-servers>

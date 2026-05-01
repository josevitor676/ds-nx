# Checklist — Publicação npm + MCP + GitHub Actions

> Atualizar este arquivo a cada fase concluída. Marcar `[x]` nas tarefas realizadas.

---

## Phase 1 — Configurar `package.json` para publicação npm

- [x] Adicionar `"files": ["dist", "bin", "README.md"]` no `package.json`
- [x] Adicionar `"publishConfig": { "registry": "https://registry.npmjs.org/", "access": "public" }`
- [x] Adicionar `"prepublishOnly": "npm run build"` nos scripts

---

## Phase 2 — Gerar `dist/metadata.json` no build

- [x] Criar `scripts/generate-metadata.mjs`
- [x] Atualizar script `"build"`: `tsc -b && vite build && node scripts/generate-metadata.mjs`

---

## Phase 3 — CLI MCP local

- [x] Criar `bin/ds-mcp.mjs`
- [x] Adicionar `"bin": { "ds-mcp": "./bin/ds-mcp.mjs" }` no `package.json`
- [x] Validar: `node bin/ds-mcp.mjs` responde `list_components` via stdin

---

## Phase 4 — GitHub Actions

- [x] Criar `.github/workflows/ci.yml` (lint → test → build em PRs)
- [x] Criar `.github/workflows/release.yml` (apenas semantic-release → npm publish)
- [x] Criar `release.config.js`
- [x] Criar `.npmrc` com `//registry.npmjs.org/:_authToken=${NPM_TOKEN}`
- [x] Configurar GitHub Secret `NPM_TOKEN`
- [ ] Validar: abrir PR → `ci.yml` dispara
- [x] Validar: merge na `main` → npm publish

---

## Phase 5 — Remote MCP via Vercel API Route

- [x] Criar `vercel.json` (output dir Storybook + rewrite `/mcp` → `/api/mcp`)
- [x] Conectar repositório à Vercel via GitHub App (dashboard Vercel)
- [x] Storybook disponível em https://ds-nx.vercel.app
- [x] Criar `api/mcp.js` (Vercel API Route — `manifestProvider` via `fetch` da URL pública)
- [x] Mover `@storybook/mcp` para `package.json` raiz (de `mcp-server/package.json`)
- [x] Configurar variável `STORYBOOK_URL=https://ds-nx.vercel.app` na Vercel
- [ ] Validar: `https://ds-nx.vercel.app/mcp` respondendo

---

## Phase 6 — Documentação consumer

- [x] README atualizado com seção "Instalação"
- [x] README atualizado com seção "MCP local (npx ds-mcp)"
- [x] README atualizado com seção "MCP remoto (URL)"

---

## Verificação Final

- [x] `npm pack --dry-run` mostra apenas `dist/`, `bin/`, `README.md`
- [x] MCP local testado: `node bin/ds-mcp.mjs` responde `list_components` via stdin
- [x] Pacote visível em https://www.npmjs.com/package/@nexusshield/design-system
- [ ] Validar: `https://ds-nx.vercel.app/mcp` respondendo (após configurar `STORYBOOK_URL` na Vercel)

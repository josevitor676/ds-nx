

import { writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── 1. Carregar variáveis de ambiente ───────────────────────────────────────

const envPath = resolve(ROOT, '.env');
if (!existsSync(envPath)) {
  console.error('\n❌  Arquivo .env não encontrado.');
  console.error('    Crie o arquivo com base no .env.example:\n');
  console.error('    cp .env.example .env\n');
  process.exit(1);
}

dotenv.config({ path: envPath });

const TOKEN    = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!TOKEN || !FILE_KEY) {
  console.error('❌  FIGMA_TOKEN ou FIGMA_FILE_KEY não definidos no .env');
  process.exit(1);
}

const HEADERS = { 'X-Figma-Token': TOKEN };

// ─── 2. Helpers de requisição ─────────────────────────────────────────────────

async function figmaGet(path) {
  const url = `https://api.figma.com/v1${path}`;
  console.log(`   → GET ${url}`);
  const res = await fetch(url, { headers: HEADERS });

  if (res.status === 403) {
    const body = await res.json().catch(() => ({}));
    const msg = body?.message ?? '';
    if (msg.includes('scope') || msg.includes('Invalid scope')) {
      console.error('\n❌  O token não tem os escopos necessários.');
      console.error('    Regenere o token em figma.com → Settings → Security → Personal access tokens');
      console.error('    e marque os escopos: File content → Read  e  Variables → Read\n');
    } else {
      console.error('\n❌  Token inválido ou sem permissão de acesso ao arquivo.');
      console.error('    Verifique FIGMA_TOKEN e FIGMA_FILE_KEY no .env\n');
    }
    process.exit(1);
  }
  if (res.status === 404) {
    console.error('\n❌  Arquivo não encontrado. Verifique o FIGMA_FILE_KEY.\n');
    process.exit(1);
  }
  if (!res.ok) {
    const text = await res.text();
    console.error(`\n❌  Erro ${res.status}: ${text}\n`);
    process.exit(1);
  }

  return res.json();
}

// ─── 3. Sincronizar tokens via Variables API ──────────────────────────────────

async function syncTokens() {
  console.log('\n📦  Buscando variáveis do Figma...\n');

  let data;
  try {
    data = await figmaGet(`/files/${FILE_KEY}/variables/local`);
  } catch (e) {
    if (e.message?.includes('403') || e.message?.includes('payment')) {
      console.error('❌  A API de Variáveis requer plano Pro do Figma.');
      console.error('    Alternativa: exporte manualmente pelo Figma (veja README).\n');
      return false;
    }
    throw e;
  }

  const { variables, variableCollections } = data.meta ?? data;

  if (!variables || Object.keys(variables).length === 0) {
    console.warn('⚠️   Nenhuma variável encontrada no arquivo.');
    return false;
  }

  // Mapeia o formato da Variables API para o formato figma.tokens.json
  const tokens = {};

  for (const variable of Object.values(variables)) {
    const { name, resolvedType, valuesByMode } = variable;

    // Pega o valor do primeiro modo disponível
    const modeId   = Object.keys(valuesByMode)[0];
    const rawValue = valuesByMode[modeId];

    // Divide o nome em partes: "color/primary/500" → ["color", "primary", "500"]
    const parts = name.toLowerCase().replace(/\s+/g, '-').split('/');

    if (resolvedType === 'COLOR') {
      setNestedValue(tokens, parts, buildColorToken(rawValue, variable));
    } else if (resolvedType === 'FLOAT') {
      setNestedValue(tokens, parts, buildFloatToken(rawValue, resolvedType, variable));
    } else if (resolvedType === 'STRING') {
      setNestedValue(tokens, parts, buildStringToken(rawValue, variable));
    }
  }

  const outputPath = resolve(ROOT, 'src/figma.tokens.json');
  writeFileSync(outputPath, JSON.stringify(tokens, null, 2), 'utf-8');
  console.log(`✅  Tokens salvos em src/figma.tokens.json`);
  console.log(`    ${Object.keys(variables).length} variáveis sincronizadas.\n`);
  return true;
}

// Helpers para construir tokens no formato existente do projeto
function buildColorToken(value, variable) {
  const r = Math.round((value.r ?? 0) * 255).toString(16).padStart(2, '0');
  const g = Math.round((value.g ?? 0) * 255).toString(16).padStart(2, '0');
  const b = Math.round((value.b ?? 0) * 255).toString(16).padStart(2, '0');
  const hex = `#${r}${g}${b}`.toUpperCase();
  return {
    $type: 'color',
    $value: {
      colorSpace: 'srgb',
      components: [value.r ?? 0, value.g ?? 0, value.b ?? 0],
      alpha: value.a ?? 1,
      hex,
    },
    $extensions: { 'com.figma.variableId': variable.id },
  };
}

function buildFloatToken(value, _type, variable) {
  return {
    $type: 'number',
    $value: value,
    $extensions: { 'com.figma.variableId': variable.id },
  };
}

function buildStringToken(value, variable) {
  return {
    $type: 'string',
    $value: value,
    $extensions: { 'com.figma.variableId': variable.id },
  };
}

function setNestedValue(obj, keys, value) {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

// ─── 4. Listar componentes do arquivo ─────────────────────────────────────────

async function listComponents() {
  console.log('\n🧩  Buscando componentes do Figma...\n');

  const data = await figmaGet(`/files/${FILE_KEY}/components`);
  const components = data.meta?.components ?? [];

  if (components.length === 0) {
    console.warn('⚠️   Nenhum componente publicado encontrado.');
    console.warn('    Certifique-se de que os componentes estão publicados na biblioteca.\n');
    return;
  }

  // Agrupa por "página" (usando o containingFrame ou o nome antes de '/')
  const groups = {};
  for (const c of components) {
    const groupName = c.containing_frame?.name ?? c.name.split('/')[0] ?? 'Outros';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(c.name);
  }

  // Exibe no terminal
  console.log(`📋  ${components.length} componentes encontrados:\n`);
  for (const [group, names] of Object.entries(groups).sort()) {
    console.log(`  ${group}`);
    for (const name of names.sort()) {
      console.log(`    • ${name}`);
    }
  }

  // Salva a lista em um arquivo de referência
  const outputPath = resolve(ROOT, 'src/figma-components.json');
  writeFileSync(outputPath, JSON.stringify({ generated: new Date().toISOString(), components: groups }, null, 2), 'utf-8');
  console.log(`\n✅  Lista salva em src/figma-components.json\n`);
}

// ─── 5. Ponto de entrada ──────────────────────────────────────────────────────

const args = process.argv.slice(2);
const onlyTokens     = args.includes('--tokens');
const onlyComponents = args.includes('--components');

console.log('🔄  Figma Sync — Design System\n');

if (!onlyComponents) await syncTokens();
if (!onlyTokens)     await listComponents();

console.log('✨  Concluído!\n');

/**
 * generate-metadata.mjs
 *
 * Gera dist/metadata.json com todos os dados do design system:
 * componentes (source + variants), tokens CSS e tema default.
 * Executado automaticamente após o vite build.
 *
 * Este arquivo é consumido pelo CLI MCP local (bin/ds-mcp.mjs).
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');

const { version } = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf-8'));

// ── Componentes ───────────────────────────────────────────────────────────────

const componentsDir = resolve(ROOT, 'src/components');
const components = {};

const tiers = readdirSync(componentsDir).filter(
  (name) => statSync(resolve(componentsDir, name)).isDirectory(),
);

for (const tier of tiers) {
  const tierDir = resolve(componentsDir, tier);
  const names = readdirSync(tierDir).filter(
    (name) => statSync(resolve(tierDir, name)).isDirectory(),
  );

  components[tier] = {};

  for (const name of names) {
    const compDir = resolve(tierDir, name);
    const entry = { name, tier };

    const tsxPath = resolve(compDir, `${name}.tsx`);
    if (existsSync(tsxPath)) {
      entry.source = readFileSync(tsxPath, 'utf-8');
    }

    const variantsPath = resolve(compDir, `${name.toLowerCase()}.variants.ts`);
    if (existsSync(variantsPath)) {
      entry.variants = readFileSync(variantsPath, 'utf-8');
    }

    components[tier][name] = entry;
  }
}

// ── Tokens CSS ────────────────────────────────────────────────────────────────

const tokens = {};
const cssPath = resolve(ROOT, 'src/index.css');

if (existsSync(cssPath)) {
  const css = readFileSync(cssPath, 'utf-8');
  const varRegex = /--(ds-[^:\s]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = varRegex.exec(css)) !== null) {
    tokens[`--${match[1].trim()}`] = match[2].trim();
  }
}

// ── Tema default ──────────────────────────────────────────────────────────────

let theme = null;
const themePath = resolve(ROOT, 'src/theme/themes/default.ts');
if (existsSync(themePath)) {
  theme = readFileSync(themePath, 'utf-8');
}

// ── Escrever metadata.json ────────────────────────────────────────────────────

const metadata = {
  version,
  generatedAt: new Date().toISOString(),
  components,
  tokens,
  theme,
};

if (!existsSync(DIST)) {
  mkdirSync(DIST, { recursive: true });
}

writeFileSync(resolve(DIST, 'metadata.json'), JSON.stringify(metadata, null, 2), 'utf-8');

const totalComponents = Object.values(components).reduce(
  (acc, tier) => acc + Object.keys(tier).length,
  0,
);

console.log(
  `✓ dist/metadata.json gerado — ${tiers.length} tiers, ${totalComponents} componentes, ${Object.keys(tokens).length} tokens`,
);

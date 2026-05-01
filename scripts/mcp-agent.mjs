/**
 * mcp-agent.mjs
 *
 * MCP (Model Context Protocol) server for the Nexus Shield Design System.
 * Exposes tools that help AI assistants understand and use DS components,
 * tokens, and Figma mappings without needing to read source files manually.
 *
 * Adicione ao .mcp.json para ativar:
 *   "design-system": {
 *     "type": "stdio",
 *     "command": "node",
 *     "args": ["scripts/mcp-agent.mjs"]
 *   }
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { dirname, resolve } from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── JSON-RPC helpers ──────────────────────────────────────────────────────────

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + '\n');
}

function sendResult(id, result) {
  send({ jsonrpc: '2.0', id, result });
}

function sendError(id, code, message) {
  send({ jsonrpc: '2.0', id, error: { code, message } });
}

// ── Tool definitions ──────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: 'list_components',
    description:
      'Lists all available Design System components organized by atomic tier (Atoms, Molecules, etc.). ' +
      'Use this to discover what components exist before requesting source code.',
    inputSchema: {
      type: 'object',
      properties: {
        tier: {
          type: 'string',
          description: 'Filter by tier. Options: "Atoms", "Molecules". Omit to list all.',
          enum: ['Atoms', 'Molecules'],
        },
      },
    },
  },
  {
    name: 'get_component_source',
    description:
      'Returns the TypeScript source code of a DS component along with its variants file and stories file if they exist.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Component name in PascalCase, e.g. "Button", "Toast", "Select".',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'list_tokens',
    description:
      'Returns all active CSS design tokens (colors, radii, shadows) extracted from the default :root declaration in index.css. ' +
      'These are the canonical token names to use with Tailwind (e.g. ds-bg-primary-500) or as CSS variables (--ds-color-primary-500).',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_component_variants',
    description:
      'Returns the CVA variant definition for a component (e.g. button.variants.ts). ' +
      'Use this to understand which variant props a component accepts before implementing or extending it.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Component name in PascalCase, e.g. "Button", "Switch", "Toast".',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_figma_components',
    description:
      'Returns the raw list of Figma component groups and their variant strings synced from the Figma file. ' +
      'Useful for understanding what variants the designer defined before implementing a component.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_theme',
    description:
      'Returns the full default theme token object (colors, borderRadius, shadows) as TypeScript values. ' +
      'Use this to understand the design token values when building new themes.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

// ── Tool implementations ──────────────────────────────────────────────────────

function listComponents({ tier } = {}) {
  const componentsDir = resolve(ROOT, 'src/components');
  const result = {};

  const tiers = tier
    ? [tier]
    : readdirSync(componentsDir).filter(
        (name) => statSync(resolve(componentsDir, name)).isDirectory(),
      );

  for (const t of tiers) {
    const tierDir = resolve(componentsDir, t);
    if (!existsSync(tierDir)) {
      throw new Error(`Tier "${t}" not found in src/components/`);
    }
    result[t] = readdirSync(tierDir).filter(
      (name) => statSync(resolve(tierDir, name)).isDirectory(),
    );
  }

  return result;
}

function getComponentSource({ name }) {
  if (!name || !/^[A-Z][a-zA-Z]+$/.test(name)) {
    throw new Error('Invalid component name. Must be PascalCase (e.g. "Button").');
  }

  const componentsDir = resolve(ROOT, 'src/components');
  const tiers = readdirSync(componentsDir).filter(
    (t) => statSync(resolve(componentsDir, t)).isDirectory(),
  );

  for (const tier of tiers) {
    const compDir = resolve(componentsDir, tier, name);
    const tsxPath = resolve(compDir, `${name}.tsx`);

    if (existsSync(tsxPath)) {
      const result = {
        name,
        tier,
        path: `src/components/${tier}/${name}/${name}.tsx`,
        source: readFileSync(tsxPath, 'utf-8'),
      };

      // Include types file if exists
      const typesPath = resolve(compDir, `${name.toLowerCase()}.types.ts`);
      if (existsSync(typesPath)) {
        result.types = readFileSync(typesPath, 'utf-8');
      }

      return result;
    }
  }

  throw new Error(
    `Component "${name}" not found. Call list_components to see available components.`,
  );
}

function getComponentVariants({ name }) {
  if (!name || !/^[A-Z][a-zA-Z]+$/.test(name)) {
    throw new Error('Invalid component name. Must be PascalCase (e.g. "Button").');
  }

  const componentsDir = resolve(ROOT, 'src/components');
  const tiers = readdirSync(componentsDir).filter(
    (t) => statSync(resolve(componentsDir, t)).isDirectory(),
  );

  for (const tier of tiers) {
    const compDir = resolve(componentsDir, tier, name);
    // Variants file naming convention: button.variants.ts, switch.variants.ts, etc.
    const variantsPath = resolve(compDir, `${name.toLowerCase()}.variants.ts`);

    if (existsSync(variantsPath)) {
      return {
        name,
        tier,
        path: `src/components/${tier}/${name}/${name.toLowerCase()}.variants.ts`,
        source: readFileSync(variantsPath, 'utf-8'),
      };
    }
  }

  return {
    name,
    message: `No variants file found for "${name}". The component may use inline class maps instead of CVA.`,
  };
}

function listTokens() {
  const indexCssPath = resolve(ROOT, 'src/index.css');
  if (!existsSync(indexCssPath)) {
    throw new Error('src/index.css not found.');
  }

  const cssContent = readFileSync(indexCssPath, 'utf-8');
  const tokens = {};
  const varRegex = /--(ds-[^:\s]+)\s*:\s*([^;]+);/g;
  let match;

  while ((match = varRegex.exec(cssContent)) !== null) {
    tokens[`--${match[1].trim()}`] = match[2].trim();
  }

  return {
    count: Object.keys(tokens).length,
    usage: {
      tailwind: 'ds-bg-primary-500, ds-text-error-500, ds-rounded-md, ds-shadow-sm',
      css: 'var(--ds-color-primary-500), var(--ds-radius-md)',
    },
    tokens,
  };
}

function getTheme() {
  const defaultThemePath = resolve(ROOT, 'src/theme/themes/default.ts');
  if (!existsSync(defaultThemePath)) {
    throw new Error('src/theme/themes/default.ts not found.');
  }
  return {
    path: 'src/theme/themes/default.ts',
    source: readFileSync(defaultThemePath, 'utf-8'),
    note: 'To add a new theme, implement ThemeEntry and register it in src/theme/themes/index.ts',
  };
}

function getFigmaComponents() {
  const path = resolve(ROOT, 'src/figma-components.json');
  if (!existsSync(path)) {
    throw new Error(
      'src/figma-components.json not found. Run: npm run sync:figma:components',
    );
  }
  return JSON.parse(readFileSync(path, 'utf-8'));
}

// ── Request dispatcher ────────────────────────────────────────────────────────

function handleRequest(req) {
  const { id, method, params } = req;

  try {
    switch (method) {
      case 'initialize':
        sendResult(id, {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'nexusshield-design-system', version: '0.0.0' },
        });
        break;

      case 'notifications/initialized':
        // no-op
        break;

      case 'tools/list':
        sendResult(id, { tools: TOOLS });
        break;

      case 'tools/call': {
        const { name, arguments: args = {} } = params;
        let content;

        switch (name) {
          case 'list_components':        content = listComponents(args);        break;
          case 'get_component_source':   content = getComponentSource(args);    break;
          case 'get_component_variants': content = getComponentVariants(args);  break;
          case 'list_tokens':            content = listTokens();                break;
          case 'get_figma_components':   content = getFigmaComponents();        break;
          case 'get_theme':              content = getTheme();                  break;
          default:
            throw new Error(`Unknown tool: "${name}"`);
        }

        sendResult(id, {
          content: [{ type: 'text', text: JSON.stringify(content, null, 2) }],
        });
        break;
      }

      default:
        if (id !== undefined) {
          sendError(id, -32601, `Method not found: ${method}`);
        }
    }
  } catch (err) {
    if (id !== undefined) {
      sendError(id, -32000, err.message);
    }
  }
}

// ── stdio event loop ──────────────────────────────────────────────────────────

const rl = createInterface({ input: process.stdin, terminal: false });

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    handleRequest(JSON.parse(trimmed));
  } catch {
    // malformed JSON — ignore silently
  }
});

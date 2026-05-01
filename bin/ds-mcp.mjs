#!/usr/bin/env node
/**
 * ds-mcp — Nexus Shield Design System MCP Server (stdio)
 *
 * Exposes design system components, variants, and tokens via the
 * Model Context Protocol for use in AI assistants (VS Code Copilot,
 * Claude Desktop, etc.).
 *
 * Reads from dist/metadata.json (generated during npm build).
 *
 * Usage in VS Code settings.json:
 *   "mcp": {
 *     "servers": {
 *       "nexusshield-ds": {
 *         "type": "stdio",
 *         "command": "npx",
 *         "args": ["ds-mcp"]
 *       }
 *     }
 *   }
 *
 * Usage in Claude Desktop (claude_desktop_config.json):
 *   "mcpServers": {
 *     "nexusshield-ds": {
 *       "command": "npx",
 *       "args": ["ds-mcp"]
 *     }
 *   }
 */

import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const METADATA_PATH = resolve(__dirname, '../dist/metadata.json');

let _metadata;

function getMetadata() {
  if (!_metadata) {
    try {
      _metadata = JSON.parse(readFileSync(METADATA_PATH, 'utf-8'));
    } catch {
      throw new Error(
        `metadata.json não encontrado em ${METADATA_PATH}. O pacote pode não ter sido construído corretamente.`,
      );
    }
  }
  return _metadata;
}

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
      'Lists all available Design System components organized by atomic tier (Atoms, Molecules). ' +
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
      'Returns the TypeScript source code of a DS component along with its variants file if it exists.',
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
    name: 'get_component_variants',
    description:
      'Returns the CVA variant definition for a component. ' +
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
    name: 'list_tokens',
    description:
      'Returns all active CSS design tokens (colors, radii, shadows) from the design system. ' +
      'Use as Tailwind classes (ds-bg-primary-500) or CSS variables (var(--ds-color-primary-500)).',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_theme',
    description:
      'Returns the full default theme token object (colors, borderRadius, shadows). ' +
      'Use this to understand design token values when building new themes or customizing.',
    inputSchema: { type: 'object', properties: {} },
  },
];

// ── Tool implementations ──────────────────────────────────────────────────────

function listComponents({ tier } = {}) {
  const { components } = getMetadata();
  if (tier) {
    if (!components[tier]) throw new Error(`Tier "${tier}" not found.`);
    return { [tier]: Object.keys(components[tier]) };
  }
  return Object.fromEntries(
    Object.entries(components).map(([t, comps]) => [t, Object.keys(comps)]),
  );
}

function findComponent(name) {
  if (!name || !/^[A-Z][a-zA-Z]+$/.test(name)) {
    throw new Error('Invalid component name. Must be PascalCase (e.g. "Button").');
  }
  const { components } = getMetadata();
  for (const [tier, tierComps] of Object.entries(components)) {
    if (tierComps[name]) return { tier, ...tierComps[name] };
  }
  throw new Error(
    `Component "${name}" not found. Call list_components to see available components.`,
  );
}

function getComponentSource({ name }) {
  const comp = findComponent(name);
  return {
    name,
    tier: comp.tier,
    path: `src/components/${comp.tier}/${name}/${name}.tsx`,
    source: comp.source ?? `// Source not available for ${name}`,
    variants: comp.variants ?? null,
  };
}

function getComponentVariants({ name }) {
  const comp = findComponent(name);
  if (!comp.variants) {
    return {
      name,
      message: `No variants file found for "${name}". The component may use inline class maps instead of CVA.`,
    };
  }
  return {
    name,
    tier: comp.tier,
    path: `src/components/${comp.tier}/${name}/${name.toLowerCase()}.variants.ts`,
    source: comp.variants,
  };
}

function listTokens() {
  const { tokens } = getMetadata();
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
  const { theme, version } = getMetadata();
  return {
    path: 'src/theme/themes/default.ts',
    version,
    source: theme ?? '// Theme source not available',
    note: 'To add a new theme, implement ThemeEntry and register it in src/theme/themes/index.ts',
  };
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
          serverInfo: { name: 'nexusshield-design-system', version: getMetadata().version },
        });
        break;

      case 'notifications/initialized':
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
    // ignore malformed input
  }
});

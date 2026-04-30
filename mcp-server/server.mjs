/**
 * Storybook MCP Server — runs inside the same container as Nginx
 *
 * Reads component/docs manifests from the local filesystem (Storybook build output)
 * and exposes the Storybook docs toolset via the MCP HTTP protocol.
 *
 * Env vars:
 *   MANIFESTS_DIR  Path to manifests directory (default: /usr/share/nginx/html/manifests)
 *   PORT           HTTP port to listen on (default: 3001)
 */

import { createStorybookMcpHandler } from '@storybook/mcp';
import { readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { serve } from 'srvx';

const MANIFESTS_DIR = process.env.MANIFESTS_DIR ?? '/usr/share/nginx/html/manifests';
const PORT = Number(process.env.PORT ?? 3001);

const handler = await createStorybookMcpHandler({
  manifestProvider: async (_request, path) => {
    const fileName = basename(path);
    return readFile(resolve(MANIFESTS_DIR, fileName), 'utf-8');
  },
});

serve({
  port: PORT,
  async fetch(request) {
    if (new URL(request.url).pathname !== '/mcp') {
      return new Response('Not found', { status: 404 });
    }
    return handler(request);
  },
});

console.log(`Storybook MCP server → http://0.0.0.0:${PORT}/mcp`);
console.log(`Reading manifests from ${MANIFESTS_DIR}`);

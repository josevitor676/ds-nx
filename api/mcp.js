import { createStorybookMcpHandler } from '@storybook/mcp';

export const config = {
  runtime: 'edge',
};

const STORYBOOK_URL = process.env.STORYBOOK_URL ?? 'https://ds-nx.vercel.app';

let _handler;

async function getHandler() {
  if (!_handler) {
    _handler = await createStorybookMcpHandler({
      manifestProvider: async (_request, path) => {
        const response = await fetch(`${STORYBOOK_URL}${path}`);
        if (!response.ok) throw new Error(`Manifest not found: ${path} (${response.status})`);
        return response.text();
      },
    });
  }
  return _handler;
}

export default async function handler(request) {
  // @storybook/mcp internally calls new URL(request.url), which fails
  // when Vercel forwards a relative URL like '/mcp'. Reconstruct absolute URL.
  let req = request;
  if (request.url.startsWith('/')) {
    const host = request.headers.get('host') ?? 'ds-nx.vercel.app';
    const proto = request.headers.get('x-forwarded-proto') ?? 'https';
    req = new Request(`${proto}://${host}${request.url}`, request);
  }

  const mcpHandler = await getHandler();
  return mcpHandler(req);
}

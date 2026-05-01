import { createStorybookMcpHandler } from '@storybook/mcp';

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
  const mcpHandler = await getHandler();
  return mcpHandler(request);
}

#!/bin/sh
set -e

# Start MCP server in background
node /opt/mcp/server.mjs &

# Start Nginx in foreground
exec nginx -g 'daemon off;'

FROM node:22.22.1 AS base

WORKDIR /usr/src/app

FROM base AS build

COPY . .
RUN npm install
RUN npm run build-storybook

FROM base AS mcp-deps

COPY mcp-server/package.json mcp-server/package-lock.json* ./
RUN npm install --omit=dev

FROM nginx AS production

# Install Node.js for MCP server
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get purge -y curl \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 80

# Storybook static files
COPY --from=build /usr/src/app/storybook-static /usr/share/nginx/html

# MCP server
COPY --from=mcp-deps /usr/src/app/node_modules /opt/mcp/node_modules
COPY mcp-server/server.mjs /opt/mcp/server.mjs

# Nginx config with /mcp proxy
COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Entrypoint that starts both processes
COPY .docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
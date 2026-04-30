/// <reference types="vite/client" />
import type { Preview } from "@storybook/react-vite"
import "../src/index.css"
import { ThemeProvider } from "../src/theme"
import type { ThemeName } from "../src/theme/themes/types"

const preview: Preview = {
  globalTypes: {
    dsTheme: {
      description: "Design System theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: ["default"],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    options: {
      storySort: {
        order: [
          "Getting Started",
          ["1. Instalar Biblioteca", "2. Configurar Projeto", "3. Configurar MCP"],
          "Tokens",
          "Components",
        ],
        method: "alphabetical",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      // Render stories inline in the docs page to avoid dynamic imports/chunk fetches
      inlineStories: true,
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.dsTheme ?? "default") as ThemeName
      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      )
    },
  ],
}

export default preview

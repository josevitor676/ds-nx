export { defaultTheme } from "./default";
export * from "./types";

import { themeSpacing, themeTypography } from "../tokens-adapter";
import { defaultTheme } from "./default";
import type { ThemeEntry, ThemeName, ThemeTokens } from "./types";

export const themeRegistry: Record<ThemeName, ThemeEntry> = {
  default: defaultTheme,
};

export const availableThemes = Object.values(themeRegistry);

export function buildCSSVariables(tokens: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {};

  // ── Colors ────────────────────────────────────────────────────────────────
  const colorGroups = [
    "primary",
    "neutral",
    "success",
    "warning",
    "error",
  ] as const;

  for (const group of colorGroups) {
    const scale = tokens.colors[group];
    for (const [shade, value] of Object.entries(scale)) {
      vars[`--ds-color-${group}-${shade}`] = value as string;
    }
  }

  for (const [key, value] of Object.entries(tokens.colors.background)) {
    vars[`--ds-color-bg-${key}`] = value;
  }

  for (const [key, value] of Object.entries(tokens.colors.surface)) {
    vars[`--ds-color-surface-${key}`] = value;
  }

  // ── Border Radius ─────────────────────────────────────────────────────────
  for (const [key, value] of Object.entries(tokens.borderRadius)) {
    vars[`--ds-radius-${key}`] = value;
  }

  // ── Shadows ───────────────────────────────────────────────────────────────
  for (const [key, value] of Object.entries(tokens.shadows)) {
    vars[`--ds-shadow-${key}`] = value;
  }

  // ── Typography ────────────────────────────────────────────────────────────
  vars["--ds-font-family"] = themeTypography.fonts.body;

  for (const [key, value] of Object.entries(themeTypography.fontSizes)) {
    vars[`--ds-font-size-${key}`] = value;
  }

  for (const [key, value] of Object.entries(themeTypography.fontWeights)) {
    vars[`--ds-font-weight-${key}`] = value;
  }

  for (const [key, value] of Object.entries(themeTypography.lineHeights)) {
    vars[`--ds-line-height-${key}`] = value;
  }

  // ── Spacing ───────────────────────────────────────────────────────────────
  for (const [key, value] of Object.entries(themeSpacing)) {
    if (!key.startsWith("--")) {
      vars[`--ds-spacing-${key}`] = value;
    }
  }

  return vars;
}

export function applyThemeToElement(
  element: HTMLElement,
  tokens: ThemeTokens,
): void {
  const vars = buildCSSVariables(tokens);
  for (const [property, value] of Object.entries(vars)) {
    element.style.setProperty(property, value);
  }
}


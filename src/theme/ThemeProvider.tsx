import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { applyThemeToElement, availableThemes, themeRegistry } from "./themes";
import type { ThemeEntry, ThemeName } from "./themes/types";

// ─────────────────────────────────────────────
//  Context types
// ─────────────────────────────────────────────

export interface ThemeContextValue {
  /** Name of the currently active theme */
  theme: ThemeName;
  /** Full token set of the active theme */
  themeEntry: ThemeEntry;
  /** All registered themes (useful for theme pickers in Storybook) */
  availableThemes: ThemeEntry[];
  /** Switch the active theme */
  setTheme: (name: ThemeName) => void;
}

// ─────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);

ThemeContext.displayName = "DSThemeContext";

// ─────────────────────────────────────────────
//  Provider
// ─────────────────────────────────────────────

export interface ThemeProviderProps {
  /** Initial theme to apply. Defaults to 'default'. */
  initialTheme?: ThemeName;
  /**
   * Controlled theme value. When provided, overrides the internal state.
   * Useful for Storybook globals or external theme managers.
   */
  theme?: ThemeName;
  /** DOM element that receives the data-theme attribute.
   *  Defaults to document.documentElement (<html>). */
  containerRef?: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  initialTheme = "default",
  theme: controlledTheme,
  containerRef,
  children,
}) => {
  const [internalTheme, setThemeState] = useState<ThemeName>(
    controlledTheme ?? initialTheme,
  );
  const defaultContainerRef = useRef<HTMLElement>(
    typeof document !== "undefined" ? document.documentElement : null,
  );

  const resolvedRef = containerRef ?? defaultContainerRef;

  const theme = controlledTheme ?? internalTheme;

  const setTheme = useCallback(
    (name: ThemeName) => {
      if (controlledTheme === undefined) {
        setThemeState(name);
      }
    },
    [controlledTheme],
  );

  useEffect(() => {
    const el = resolvedRef.current;
    if (!el) return;

    if (theme === "default") {
      el.removeAttribute("data-theme");
    } else {
      el.setAttribute("data-theme", theme);
    }

    applyThemeToElement(el, themeRegistry[theme].tokens);
  }, [theme, resolvedRef]);

  const themeEntry = themeRegistry[theme];

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, themeEntry, availableThemes, setTheme }),
    [theme, themeEntry, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * Access the current theme and theme switcher from any component.
 *
 * @example
 * const { theme, setTheme } = useTheme();
 * setTheme('black-friday');
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
};

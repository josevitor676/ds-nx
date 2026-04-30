export type ThemeName = "default";

export interface ColorScale {
  25?: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ThemeTokens {
  colors: {
    primary: ColorScale;
    neutral: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
    background: {
      base: string;
      subtle: string;
      emphasis: string;
    };
    surface: {
      base: string;
      raised: string;
      overlay: string;
    };
  };
  borderRadius: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface ThemeEntry {
  name: ThemeName;
  label: string;
  tokens: ThemeTokens;
}

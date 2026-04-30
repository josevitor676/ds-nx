import tokensRaw from "../figma.tokens.json";

// ── Token shape types ──────────────────────────────────────────────────────────

interface ColorValue {
  colorSpace: string;
  components: [number, number, number];
  alpha: number;
  hex: string;
}

interface ColorToken {
  $type: "color";
  $value: ColorValue;
}

interface NumberToken {
  $type: "number";
  $value: number;
}

interface StringToken {
  $type: "string";
  $value: string;
}

type TokenNode =
  | ColorToken
  | NumberToken
  | StringToken
  | { [key: string]: TokenNode };

interface TokensShape {
  color?: { [group: string]: { [key: string]: TokenNode } };
  border?: { radius?: { [key: string]: NumberToken } };
  font?: {
    family?: { family?: StringToken };
    size?: { [key: string]: NumberToken };
    weight?: { [key: string]: StringToken };
    "line height"?: { [key: string]: NumberToken };
  };
  spacing?: { [key: string]: NumberToken };
  "shadow-sm"?: ShadowToken;
  "shadow-md"?: ShadowToken;
}

interface ShadowToken {
  X?: NumberToken;
  Y?: NumberToken;
  Blur?: NumberToken;
  Spread?: NumberToken;
  Color?: { $value?: { hex?: string; alpha?: number } };
}

const tokensJson = tokensRaw as unknown as TokensShape;

const extractColors = (
  colorGroup: Record<string, TokenNode> | undefined,
): Record<string, string | Record<string, string>> => {
  const colors: Record<string, string | Record<string, string>> = {};
  if (!colorGroup) return colors;

  Object.keys(colorGroup).forEach((key) => {
    const item = colorGroup[key] as TokenNode;
    if ((item as ColorToken)?.$value?.hex) {
      colors[key] = (item as ColorToken).$value.hex;
    } else if (typeof item === "object" && !(item as ColorToken).$value) {
      colors[key] = extractColors(item as Record<string, TokenNode>) as Record<
        string,
        string
      >;
    }
  });
  return colors;
};

export const themeColors = {
  primary: extractColors(tokensJson.color?.primary),
  warning: extractColors(tokensJson.color?.warning),
  neutral: extractColors(tokensJson.color?.neutral),
  error: extractColors(tokensJson.color?.error),
  // Fallback handles legacy Figma typo: 'sucess' (one 's')
  success: extractColors(
    (tokensJson.color as Record<string, Record<string, TokenNode>>)?.sucess ??
      tokensJson.color?.success,
  ),
};

export const themeRadii: Record<string, string> = tokensJson.border?.radius
  ? Object.keys(tokensJson.border.radius).reduce<Record<string, string>>(
      (acc, key) => {
        acc[key] =
          `${(tokensJson.border!.radius![key] as NumberToken).$value}px`;
        return acc;
      },
      {},
    )
  : {};

const interFont =
  (tokensJson.font?.family?.family as StringToken | undefined)?.$value ??
  "Inter";

const fontWeightMap: Record<string, string> = {
  Regular: "400",
  Medium: "500",
  SemiBold: "600",
  Bold: "700",
  ExtraBold: "800",
};

export const themeTypography = {
  fonts: {
    heading: `'${interFont}', sans-serif`,
    body: `'${interFont}', sans-serif`,
  },
  fontSizes: tokensJson.font?.size
    ? Object.keys(tokensJson.font.size).reduce<Record<string, string>>(
        (acc, key) => {
          acc[key] = `${(tokensJson.font!.size![key] as NumberToken).$value}px`;
          return acc;
        },
        {},
      )
    : {},
  fontWeights: tokensJson.font?.weight
    ? Object.keys(tokensJson.font.weight).reduce<Record<string, string>>(
        (acc, key) => {
          const raw = (tokensJson.font!.weight![key] as StringToken).$value;
          acc[key] = fontWeightMap[raw] ?? raw;
          return acc;
        },
        {},
      )
    : {},
  lineHeights: tokensJson.font?.["line height"]
    ? Object.keys(tokensJson.font["line height"]).reduce<
        Record<string, string>
      >((acc, key) => {
        acc[key] =
          `${(tokensJson.font!["line height"]![key] as NumberToken).$value}px`;
        return acc;
      }, {})
    : {},
};

const formatShadow = (shadowToken: ShadowToken | undefined) => {
  if (!shadowToken || !shadowToken.Color) return "none";
  const x = shadowToken.X?.$value ?? 0;
  const y = shadowToken.Y?.$value ?? 0;
  const blur = shadowToken.Blur?.$value ?? 0;
  const spread = shadowToken.Spread?.$value ?? 0;
  const hex = shadowToken.Color?.$value?.hex ?? "#000000";
  const alpha = shadowToken.Color?.$value?.alpha ?? 1;
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${x}px ${y}px ${blur}px ${spread}px ${hex}${alphaHex}`;
};

export const themeShadows = {
  sm: formatShadow(tokensJson["shadow-sm"]),
  md: formatShadow(tokensJson["shadow-md"]),
};

export const themeSpacing: Record<string, string> = tokensJson.spacing
  ? Object.keys(tokensJson.spacing).reduce<Record<string, string>>(
      (acc, key) => {
        const value = `${(tokensJson.spacing![key] as NumberToken).$value}px`;
        acc[`--ds-spacing-${key}`] = value;
        acc[key] = value;
        return acc;
      },
      {},
    )
  : {};


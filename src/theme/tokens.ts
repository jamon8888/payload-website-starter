/**
 * Design tokens of the site.
 *
 * The defaults live here and in `globals.css`; the `site-settings` global can
 * override them at runtime (the values are injected as CSS variables in the
 * layout), which makes the theme editable from the admin without a rebuild.
 */

export type ThemeRadius = 'none' | 'sm' | 'md' | 'lg'
export type ThemeFont = 'geist' | 'system' | 'serif'
export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeTokens {
  primaryColor: string
  primaryForeground: string
  radius: ThemeRadius
  fontFamily: ThemeFont
  defaultTheme: ThemeMode
}

export const radiusValues: Record<ThemeRadius, string> = {
  none: '0',
  sm: '0.25rem',
  md: '0.625rem',
  lg: '1rem',
}

export const fontStacks: Record<ThemeFont, string> = {
  geist: 'var(--font-geist-sans)',
  system: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
  serif: 'ui-serif, Georgia, Cambria, serif',
}

export const defaultThemeTokens: ThemeTokens = {
  primaryColor: 'oklch(20.5% 0 0deg)',
  primaryForeground: 'oklch(98.5% 0 0deg)',
  radius: 'md',
  fontFamily: 'geist',
  defaultTheme: 'system',
}

/**
 * Colors are injected in a `<style>` tag, so only a conservative subset of
 * characters is accepted: no `;`, no `}`, no comment or url() tricks.
 */
export const sanitizeColor = (value: string | null | undefined, fallback: string): string => {
  if (!value) return fallback
  const trimmed = value.trim()

  return /^[a-zA-Z0-9#%.,()\-_\s]+$/.test(trimmed) && trimmed.length <= 64 ? trimmed : fallback
}

/**
 * Builds the CSS variables injected in the layout. The dark theme inverts the
 * primary colour, the way shadcn/ui does.
 */
export const themeToCssVariables = (tokens: Partial<ThemeTokens>): string => {
  const primary = sanitizeColor(tokens.primaryColor, defaultThemeTokens.primaryColor)
  const foreground = sanitizeColor(
    tokens.primaryForeground,
    defaultThemeTokens.primaryForeground,
  )
  const radius = radiusValues[tokens.radius as ThemeRadius] ?? radiusValues.md
  const font = fontStacks[tokens.fontFamily as ThemeFont] ?? fontStacks.geist

  return `
:root {
  --primary: ${primary};
  --primary-foreground: ${foreground};
  --ring: ${primary};
  --radius: ${radius};
  --font-sans: ${font};
}

[data-theme='dark'] {
  --primary: ${foreground};
  --primary-foreground: ${primary};
  --ring: ${foreground};
}
`
}

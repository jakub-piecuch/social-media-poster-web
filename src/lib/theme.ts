// theme.ts
export const theme = {
    colors: {
      primary: {
        50: 'var(--color-primary-50)',
        100: 'var(--color-primary-100)',
        // ... other shades
        900: 'var(--color-primary-900)',
      },
      // Add more color categories
    },
    borderRadius: {
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)'
    },
    spacing: {
      // Custom spacing values if needed beyond Tailwind defaults
    },
    typography: {
      // Custom font sizes, weights, etc.
    }
  }
  
  // Add type definitions
  export type ThemeColors = typeof theme.colors;
  export type ThemeSpacing = typeof theme.spacing;
  export type ThemeTypography = typeof theme.typography;
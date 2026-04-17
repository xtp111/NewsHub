export const theme = {
  colors: {
    primary: '#0066cc',
    primaryHover: '#0052a3',
    text: '#1a1a1a',
    textMuted: '#666',
    textSubtle: '#999',
    border: '#e0e0e0',
    borderStrong: '#d1d5db',
    bg: '#f5f5f5',
    cardBg: '#fff',
    surfaceMuted: '#f9fafb',
    danger: '#dc2626',
    dangerBg: '#fef2f2',
    dangerBorder: '#fecaca',
    success: '#16a34a',
    successBg: '#f0fdf4',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    pill: '9999px',
  },
  shadows: {
    card: '0 1px 3px rgba(0,0,0,0.08)',
    cardHover: '0 4px 12px rgba(0,0,0,0.12)',
    authCard: '0 1px 3px rgba(0,0,0,0.1)',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48] as const,
  maxWidths: {
    sm: '600px',
    md: '800px',
    lg: '1200px',
  },
  font: {
    stack:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
} as const;

export type Theme = typeof theme;

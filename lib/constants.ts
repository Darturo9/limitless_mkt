/**
 * Limitless MKT Brand Colors
 *
 * Paleta de colores oficial:
 * - Lime Green (#80c12f) - Color principal, energía, crecimiento
 * - Cream (#fffff0) - Fondo claro, textos sobre oscuro
 * - Black (#000000) - Textos, contraste
 * - Dark Blue (#1a1a27) - Fondo oscuro principal
 * - Neon Yellow (#ccff00) - Acentos, CTAs, highlights
 * - Purple (#890df7) - Secundario, creatividad
 */

export const colors = {
  limeGreen: '#80c12f',
  cream: '#fffff0',
  black: '#000000',
  darkBlue: '#1a1a27',
  neonYellow: '#ccff00',
  purple: '#890df7',
} as const;

export const brand = {
  name: 'Limitless MKT',
  tagline: '', // Agregar tagline cuando esté definido
  colors,
} as const;

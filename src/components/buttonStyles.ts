export type Variant = 'primary' | 'secondary'

/**
 * Classi dei pulsanti. Regola del design system: una sola azione primaria (blu) per vista,
 * tutte le altre sono secondarie (vetro).
 */
export function buttonClass(variant: Variant = 'primary', extra = '') {
  return `btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${extra}`
}

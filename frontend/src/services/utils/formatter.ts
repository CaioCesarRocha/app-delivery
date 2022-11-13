export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const sizeFormatter = (size: 'small' | 'medium' | 'large') => {
  if (size === 'small') return 'Pequena'
  if (size === 'medium') return 'Média'
  return 'Grande'
}

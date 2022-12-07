export const dateFormatter = new Intl.DateTimeFormat('pt-BR');

export const dateMonthExtense = (date: number) => {
  const formatDate = new Date(date)
  return formatDate.toLocaleString('pt-BR', { 'month': 'long'})
}

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const sizeFormatter = (status: 'small' | 'medium' | 'large') => {
  if (status === 'small') return 'Pequena'
  if (status === 'medium') return 'Média'
  return 'Grande'
}

export const statusFormatter=(status: 'open' | 'inprogress' | 'closed') =>{
  if (status === 'open') return 'Aberta'
  if (status === 'closed') return 'Fechada'
  return 'Em progresso'
}

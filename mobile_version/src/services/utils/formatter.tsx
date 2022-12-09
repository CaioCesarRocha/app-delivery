import { SmallIcon, MediumIcon, LargeIcon } from "../../screens/ShowDelivery/styles";

export const dateFormatter = new Intl.DateTimeFormat('pt-BR');

export const dateMonthExtense = (date: number) => {
  const formatDate = new Date(date)
  return formatDate.toLocaleString('pt-BR', { 'month': 'long'})
}

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const statusFormatter=(status: 'open' | 'inprogress' | 'closed') =>{
  if (status === 'open') return 'Aberta'
  if (status === 'closed') return 'Fechada'
  return 'Em progresso'
}

export const IconSizeFormatter = (status: 'small' | 'medium' | 'large') => {
  if (status === 'small') return <SmallIcon/>
  if (status === 'medium') return <MediumIcon/>
  return <LargeIcon/>
}
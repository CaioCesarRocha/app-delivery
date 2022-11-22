import { useContextSelector } from 'use-context-selector'
import { useMemo } from 'react'
import { DeliverysContext } from '../contexts/DeliveryContext'

export function useCharts() {
  const  allDeliverys  = useContextSelector(DeliverysContext, (context) => {
    return context.allDeliverys
  })
  //utilizando useMemo para evitar q essa variável seja recriada na memoria sem ter mudado
  const infoCharts = useMemo(() =>{ 
    return allDeliverys.reduce(
      (acc, delivery) => {
        if(delivery.size_item === 'small') acc.small++;
        if(delivery.size_item === 'medium') acc.medium++;
        if(delivery.size_item === 'large') acc.large++;

        return acc
      },
      { small: 0, medium: 0, large: 0},
    )
  }, [allDeliverys])

  return [
    {name: 'small', value: infoCharts.small},
    {name: 'medium', value: infoCharts.medium},
    {name: 'large', value: infoCharts.large},   
  ];
}

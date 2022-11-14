import { useContextSelector } from 'use-context-selector'
import { useMemo } from 'react'
import { DeliverysContext } from '../contexts/DeliveryContext'

export function useSummary() {
  const  allDeliverys  = useContextSelector(DeliverysContext, (context) => {
    return context.allDeliverys
  })
  //utilizando useMemo para evitar q essa variável seja recriada na memoria sem ter mudado
  const summary = useMemo(() =>{ 
    return allDeliverys.reduce(
      (acc, delivery) => {
        if (delivery.status === 'inprogress') {
          acc.inprogress++
        }
        if (delivery.status === 'closed') {
          acc.closed++
          acc.total += +delivery.price
        }
        return acc
      },
      { inprogress: 0, closed: 0, total: 0 },
    )
  }, [allDeliverys])

  return summary
}

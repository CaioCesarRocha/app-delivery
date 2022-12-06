import { useContextSelector } from 'use-context-selector';
import { useMemo } from 'react';
import { useDelivery, DeliveryContext } from './delivery'


export function useSummary() {
  /*const  deliverys  = useContextSelector(DeliveryContext, (context) => {
    return context.deliverys
  })*/

  const { deliverys } = useDelivery();
  
  //utilizando useMemo para evitar q essa variável seja recriada na memoria sem ter mudado
  const summary = useMemo(() =>{  
    return deliverys.reduce(
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
  }, [deliverys])

  return summary
}

import { useMemo } from 'react';
import { useDelivery} from './delivery'

export function useSummary() {
  const { deliverys } = useDelivery();
  
  //utilizando useMemo para evitar q essa variável seja recriada na memoria sem ter mudado
  const summary = useMemo(() =>{ 
    if(deliverys.length === 0) 
      return { inprogress: 0, closed: 0, total: 0, lastDelivery: 0}
    return deliverys.reduce(
      (acc, delivery) => {
        if (delivery.status === 'inprogress') {
          acc.inprogress++     
        }
        if (delivery.status === 'closed') {
          acc.closed++
          acc.total += +delivery.price
          const dateDelivery = new Date(delivery.end_at).getTime();
          if(dateDelivery > acc.lastDelivery)
            acc.lastDelivery = dateDelivery;
        }
        return acc
      },
      { inprogress: 0, closed: 0, total: 0, lastDelivery: 0},
    )
  }, [deliverys])

  return summary
}

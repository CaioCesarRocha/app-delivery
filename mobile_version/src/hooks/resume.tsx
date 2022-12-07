import { useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import { useDelivery } from './delivery'

export function useResume() {
  const { COLORS } = useTheme();
  const { deliverys} = useDelivery();
  //utilizando useMemo para evitar q essa variável seja recriada na memoria sem ter mudado
  const resume = useMemo(() =>{ 
    return deliverys.reduce(
      (acc, delivery) => {
        if(delivery.size_item === 'small') acc.small++;
        if(delivery.size_item === 'medium') acc.medium++;
        if(delivery.size_item === 'large') acc.large++;

        const numberTransfers = acc.medium + acc.small + acc.large;
        const totalPrices = acc.totalPrices + delivery.price;

        acc.totalPrices = totalPrices;     
        acc.average = totalPrices/numberTransfers;

        return acc
      },
      { small: 0, medium: 0, large: 0, totalPrices: 0, average: 0},
    )
  }, [deliverys])

  return { 
    data : [
      { 
        percentage: `${((resume.small *100)/deliverys.length).toFixed(2)}%`, 
        value: resume.small,
        color: COLORS.GRAPH_SMALL
      },
      {
        percentage: `${((resume.medium *100)/deliverys.length).toFixed(2)}%`, 
        value: resume.medium,
        color: COLORS.GRAPH_MEDIUM
      },
      {
        percentage: `${((resume.large *100)/deliverys.length).toFixed(2)}%`, 
        value: resume.large,
        color: COLORS.GRAPH_LARGE
      },   
    ],
    average: resume.average,

  } 
}



      




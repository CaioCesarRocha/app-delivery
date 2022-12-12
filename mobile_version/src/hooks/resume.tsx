import { useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import { useDelivery } from './delivery'

export function useResume() {
  const { COLORS } = useTheme();
  const { deliverys, dateFilter } = useDelivery();
  //utilizando useMemo para evitar q essa variável seja recriada na memoria sem ter mudado
  const resume = useMemo(() =>{ 
    return deliverys.reduce(
      (acc, delivery) => {
        if(
          new Date(delivery.created_at).getMonth() !== dateFilter.getMonth() ||
          new Date(delivery.created_at).getFullYear() !== dateFilter.getFullYear()
        )
          return acc;

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
  }, [deliverys, dateFilter])

  return { 
    data : [
      { 
        percentage: `${((resume.small *100)/deliverys.length).toFixed(2)}%`, 
        value: resume.small,
        color: COLORS.GRAPH_SMALL,
        title: 'Pequenas'
      },
      {
        percentage: `${((resume.medium *100)/deliverys.length).toFixed(2)}%`, 
        value: resume.medium,
        color: COLORS.GRAPH_MEDIUM,
        title: 'Médias',
      },
      {
        percentage: `${((resume.large *100)/deliverys.length).toFixed(2)}%`, 
        value: resume.large,
        color: COLORS.GRAPH_LARGE,
        title: 'Grandes'
      },   
    ],
    average: resume.average,
    totalPrices: resume.totalPrices
  } 
}



      




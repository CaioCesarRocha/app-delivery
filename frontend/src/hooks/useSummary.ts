import { useContext } from "react";
import { DeliverysContext } from "../contexts/DeliveryContext";

export function useSummary(){
    const { deliverys} = useContext(DeliverysContext);
    const summary = deliverys.reduce(
        (acc, delivery ) => { 
            if(delivery.status === 'inprogress') { acc.inprogress++}
            if(delivery.status === 'closed') { 
                acc.closed++
                acc.total += + delivery.price;
            }
            return acc
        }, 
        {inprogress: 0, closed: 0, total: 0}
    );

    return summary
}
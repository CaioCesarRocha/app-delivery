import { createContext, ReactNode} from "react";
import { useState, useEffect } from "react";
import api from "../services/connection/api";


export interface IDelivery {
    id: string;
    id_client: string;
    id_deliveryman: string | null;
    name_item: string;
    size_item: 'small' |'medium' | 'large';
    startPosition: [number, number];
    endPosition: [number, number];
    status: 'open' | 'inprogress' | 'closed';
    price: number;
    created_at: Date;
    end_at: String;
}

interface DeliveryContextType{
    deliverys: IDelivery[];
}

interface DeliveryProviderProps{
    children: ReactNode;
}

export const DeliverysContext = createContext({} as DeliveryContextType)

export function DeliveryProvider({children}: DeliveryProviderProps){
    const [deliverys, setDeliverys] = useState<IDelivery[]>([]);

    async function loadDeliverys(){
        const list = await api.get('http://localhost:3000/delivery');     
        const deliverysList = list.data 
        console.log('peguei deliverys')
        setDeliverys(deliverysList);
    }

    useEffect(() =>{
        loadDeliverys();
    }, [])

    return (
        <DeliverysContext.Provider value={{deliverys} }>
            {children}
        </DeliverysContext.Provider>
    )
}


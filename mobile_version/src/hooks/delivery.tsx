import {addMonths, subMonths } from 'date-fns';
import {
    createContext,
    useContext,
    ReactNode, 
    useState
} from 'react';
import { useAuth } from './auth';
import api from '../services/Connection/api';
import {IDelivery} from '../services/interfaces/deliveryInterfaces';


interface DeliveryContextData{
    ListAllDeliverys: () => Promise<void>,
    CleanDeliverys: () => Promise<void>,
    ChangeDateFilter: (action: 'next' | 'previus') => Promise<void>,
    UpdateDelivery:(id: string, delivery: IDelivery, action: 'select' | 'finish') => Promise<boolean>;
    deliverys: IDelivery[],
    dateFilter: Date,
}

interface DeliveryProviderProps{
    children: ReactNode
}

export const DeliveryContext = createContext({} as DeliveryContextData)

function DeliveryProvider({children}: DeliveryProviderProps){
    const [deliverys, setDeliverys] = useState<IDelivery[]>([] as IDelivery[]);
    const [ emptyDelivery, setEmptyDelivery] = useState<IDelivery[]>([] as IDelivery[])
    const [ dateFilter, setDateFilter] = useState<Date>(new Date)
    const { user } = useAuth()
    const url_localhost = 'http://localhost:3000/delivery';


    async function ChangeDateFilter(action: 'next' | 'previus'): Promise<void>{
        if(action === 'next'){
           setDateFilter(addMonths(dateFilter, 1));          
        }else{ 
           setDateFilter(subMonths(dateFilter, 1)); 
        }
    }

    function setBearerToken() {
        const configBearer = {
          headers: { Authorization: 'Bearer ' + user?.token },
        }
        return configBearer
    }

    async function ListAllDeliverys(): Promise<void> {
        const configBearer = setBearerToken()
        try {
            if (user.typeUser === 'client') {
                const deliverys = await api.get(`${url_localhost}/client`, configBearer)
                setDeliverys(deliverys.data);
                return;
            }
            if (user.typeUser === 'deliveryman') {
                const deliverys = await api.get(`${url_localhost}/available/0`, configBearer)
                setDeliverys(deliverys.data);
                return;
            }
        } catch (err) {
            if (err instanceof Error)
                throw new Error(err.message)
        }
    }

    async function UpdateDelivery(
        id: string, 
        delivery: IDelivery,
        action: 'select' | 'finish'
        ): Promise<boolean> {
        const config = setBearerToken();
        delivery.id_deliveryman = user?.id || '';
        if (action === 'select') 
            delivery.status = 'inprogress';
        else
            delivery.status = 'closed';
        

        //const newListDeliverys: IDelivery[] = []
        try {
          const updatedDelivery = await api.put(
            `${url_localhost}/${id}`,
            delivery,
            config,
          )
          if (updatedDelivery) {
            /*deliverys.forEach((delivery) => {
              if (delivery.id !== id) newListDeliverys.push(delivery)
            })
            newListDeliverys.push(delivery)*/
            setDeliverys(prevState => prevState.filter(delivery => delivery.id !== id))
            deliverys.includes(updatedDelivery.data)
            //setDeliverys(newListDeliverys)
            return true
          }
          return false
        } catch (err) {
          if (err instanceof Error) 
            throw new Error(err.message)
          return false
        }
      }

    async function CleanDeliverys(){
        setDeliverys({} as IDelivery[])
    }
    
    return(
        <DeliveryContext.Provider value={{
            ListAllDeliverys,
            CleanDeliverys,
            ChangeDateFilter,
            UpdateDelivery,
            deliverys,
            dateFilter,
        }}>
            {children}
        </DeliveryContext.Provider>
    )   
}

function useDelivery(){
    const context = useContext(DeliveryContext);
    return context;
}

export { DeliveryProvider, useDelivery }

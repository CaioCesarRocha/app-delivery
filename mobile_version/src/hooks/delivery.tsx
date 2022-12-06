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
    deliverys: IDelivery[]
}

interface DeliveryProviderProps{
    children: ReactNode
}

export const DeliveryContext = createContext({} as DeliveryContextData)

function DeliveryProvider({children}: DeliveryProviderProps){
    const [deliverys, setDeliverys] = useState<IDelivery[]>([] as IDelivery[]);
    const [ emptyDelivery, setEmptyDelivery] = useState<IDelivery[]>([] as IDelivery[])
    const { user } = useAuth()
    const url_localhost = 'http://localhost:3000/delivery';


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
                return
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

    async function CleanDeliverys(){
        setDeliverys({} as IDelivery[])
    }
    
    return(
        <DeliveryContext.Provider value={{
            ListAllDeliverys,
            CleanDeliverys,
            deliverys,
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

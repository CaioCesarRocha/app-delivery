import { createContext, ReactNode} from "react";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import {IError} from '../services/utils/interfaces/error_interface';
import api from "../services/connection/api";
import { getConfigFileParsingDiagnostics } from "typescript";


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
    cleanDeliverys: () => Promise<void>;
    deliverys: IDelivery[];
    error: IError;
    getDeliverymanDeliverys: () => Promise<void>;
    searchDeliverys:(search: string) => Promise<void>;
}

interface DeliveryProviderProps{
    children: ReactNode;
}

export const DeliverysContext = createContext({} as DeliveryContextType)

export function DeliveryProvider({children}: DeliveryProviderProps){ 
    const [deliverys, setDeliverys] = useState<IDelivery[]>([]);
    const [error, setError] = useState<IError>({msg: '', active: false});
    const { user } = useAuth();

    async function cleanDeliverys() {
        setDeliverys([]);
    }

    async function getDeliverymanDeliverys(){
        await new Promise(resolve => setTimeout(resolve, 2000))// importante usar pra simular delay
        let config = {
            headers: {'Authorization': 'Bearer ' + user.token }
        }
        const list = await api.get('http://localhost:3000/delivery/deliveryman', config); 
        const deliverysList = list.data         
        setDeliverys(deliverysList);
    }

    

    async function searchDeliverys(search: string){
        const list = await api.get(`http://localhost:3000/delivery/search/${search}`); 
        const deliverysList = list.data         
        setDeliverys(deliverysList);
    }

    async function filterDeliverys(filter: string){
        const list = await api.get(`http://localhost:3000/delivery/search/${search}`); 
        const deliverysList = list.data         
        setDeliverys(deliverysList);
    }

    function getBearerToken(token: string){
        let config = {
            headers: {'Authorization': 'Bearer ' + user.token }
        }
        return config;
    }

    useEffect(() =>{
        console.log('passei useEffect get Delivery Default')
        async function getDefaultDeliverys(){
            const token = user?.token || '';
            const config = getBearerToken(token)}
            
            try{
                              
                if(user.typeUser === 'client') {
                    console.log('entrei no true')            
                    const list = await api.get('http://localhost:3000/delivery/client', config); 
                    const deliverysList = list.data         
                    setDeliverys(deliverysList);
                }         
                else if(user.typeUser === 'deliveryman'){
                    console.log('entrei no false')            
                    const list = await api.get('http://localhost:3000/delivery/available', config);
                    const deliverysList = list.data;            
                    setDeliverys(deliverysList);
                }
            }catch(err){
                if(err instanceof Error) setError({ msg: err.message, active: true});                     
            } 
        }
        getDefaultDeliverys();
    }, [user.typeUser]);

    

    return (
        <DeliverysContext.Provider value={{
            cleanDeliverys,
            deliverys,
            error,
            getDeliverymanDeliverys,
            searchDeliverys
        }}>
            {children}
        </DeliverysContext.Provider>
    )
}


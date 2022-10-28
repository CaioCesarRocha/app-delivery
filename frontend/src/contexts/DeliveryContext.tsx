import { createContext, ReactNode} from "react";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import {IError} from '../services/utils/interfaces/error_interface';
import api from "../services/connection/api";
import { IInputCreateDelivery, IDelivery } from "../services/utils/interfaces/delivery";
import { getEmitHelpers } from "typescript";
import { getEmptyDelivery } from "../services/utils/getEmptyDelivery";


interface DeliveryContextType{
    cleanDeliverys: () => Promise<void>;
    createDelivery: (data: IInputCreateDelivery) => Promise<boolean>;
    deleteDelivery: (id: string) => Promise<boolean>
    deliverys: IDelivery[];
    error: IError;
    filterDeliverys: (filter: string) => Promise<boolean>;
    getDeliverymanDeliverys: () => Promise<void>;
    getOneDelivery: (id: string) => Promise<IDelivery> 
    searchDeliverys:(search: string) => Promise<void>;
    updateDelivery: (id: string, delivery: IDelivery) => Promise<boolean>
}

interface DeliveryProviderProps{
    children: ReactNode;
}

export const DeliverysContext = createContext({} as DeliveryContextType)

export function DeliveryProvider({children}: DeliveryProviderProps){ 
    const [deliverys, setDeliverys] = useState<IDelivery[]>([]);
    const [error, setError] = useState<IError>({msg: '', active: false});
    const { user } = useAuth();

    function setBearerToken(){
        let config = {
            headers: {'Authorization': 'Bearer ' + user?.token}
        }
        return config;
    }

    async function getOneDelivery(id: string): Promise<IDelivery> {
        try{
            const delivery = await api.get(`http://localhost:3000/delivery/${id}`);
            return delivery.data;
        }catch(err){
            if(err instanceof Error) setError({ msg: err.message, active: true}); 
            const delivery: IDelivery = await getEmptyDelivery();
            return delivery;
        }   
    }
  
    async function getDeliverymanDeliverys(){
        await new Promise(resolve => setTimeout(resolve, 2000))// importante usar pra simular delay
        try{
            const config = setBearerToken(); 
            const deliverys = await api.get('http://localhost:3000/delivery/deliveryman', config);               
            setDeliverys(deliverys.data);
        }catch(err){
            if(err instanceof Error) setError({ msg: err.message, active: true});
        }       
    }

    async function searchDeliverys(search: string): Promise<void>{
        await new Promise(resolve => setTimeout(resolve, 2000))         
        try{
            const config = setBearerToken();
            const deliverys = await api.get(`http://localhost:3000/delivery/search/${search}`, config);
            const userDeliverys: IDelivery[]  = [] 
            deliverys.data.forEach((delivery: IDelivery) => {
                if(delivery.id_client === user.id || delivery.id_deliveryman === user.id)
                userDeliverys.push(delivery)
            });  
            setDeliverys(userDeliverys);
        }catch(err){
            if(err instanceof Error) setError({ msg: err.message, active: true});
        }    
    }

    async function filterDeliverys(filter: string): Promise<boolean>{
        await new Promise(resolve => setTimeout(resolve, 2000))        
        try{
            const config = setBearerToken(); 
            const deliverys = await api.get(`http://localhost:3000/delivery/filter/${filter}`,config);
            const userDeliverys: IDelivery[]  = [] 
            deliverys.data.forEach((delivery: IDelivery) => {
                if(delivery.id_client === user.id || delivery.id_deliveryman === user.id)
                userDeliverys.push(delivery)
            });          
            setDeliverys(userDeliverys);
            return true;
        }catch(err){
            if(err instanceof Error) setError({ msg: err.message, active: true}); 
            return false;
        }       
    }

    async function createDelivery(data: IInputCreateDelivery): Promise<boolean>{
        await new Promise(resolve => setTimeout(resolve, 2000))// importante usar pra simular delay 
        const config = setBearerToken(); 
        try{
            const createdDelivery = await api.post('http://localhost:3000/delivery', data, config) 
            const newListDeliverys = [...deliverys, createdDelivery.data]
            setDeliverys(newListDeliverys);
            return true;
        }catch(err){
            if(err instanceof Error) setError({ msg: err.message, active: true});
            return false;
        }
    }

    async function deleteDelivery(id: string): Promise<boolean>{
        const config = setBearerToken();   
        await api.delete('');
        return true;
    }

    async function updateDelivery(id: string, delivery: IDelivery): Promise<boolean>{
        const config = setBearerToken();   
        delivery.status = 'inprogress';
        delivery.id_deliveryman = user?.id || '';
        try{
            const updatedDelivery = await api.put(`http://localhost:3000/delivery/${id}`, delivery, config)
            if(updatedDelivery) return true;
            return false;
        }catch(err){
            if(err instanceof Error) setError({ msg: err.message, active: true});
            return false;
        }      
    }

    async function cleanDeliverys() {
        setDeliverys([]);
    }

 
    useEffect(() =>{
        console.log('passei useEffect get Delivery Default' ,user)
        async function getDefaultDeliverys(): Promise<void>{
            const config = setBearerToken();           
            try{                            
                if(user.typeUser === 'client') {
                    console.log('entrei no true')            
                    const deliverys = await api.get('http://localhost:3000/delivery/client', config);          
                    setDeliverys(deliverys.data);
                }         
                else if(user.typeUser === 'deliveryman'){
                    console.log('entrei no false')            
                    const deliverys = await api.get('http://localhost:3000/delivery/available', config);             
                    setDeliverys(deliverys.data);
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
            createDelivery,
            deleteDelivery,
            deliverys,
            error,
            filterDeliverys,
            getDeliverymanDeliverys,
            getOneDelivery,
            searchDeliverys,
            updateDelivery
        }}>
            {children}
        </DeliverysContext.Provider>
    )
}


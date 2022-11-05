import { createContext, ReactNode} from "react";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import {IError} from '../services/utils/interfaces/error_interface';
import api from "../services/connection/api";
import { IInputCreateDelivery, IDelivery } from "../services/utils/interfaces/delivery";
import { updatePropertyAssignment } from "typescript";


interface DeliveryContextType{
    cleanDeliverys: () => Promise<void>;
    createDelivery: (data: IInputCreateDelivery) => Promise<boolean>;
    deleteDelivery: (id: string) => Promise<boolean>
    deliverys: IDelivery[];
    error: IError;   
    filterDeliverys: (filter: string) => Promise<boolean>;
    getDeliverymanDeliverys: () => Promise<void>;
    getOneDelivery: (id: string) => Promise<IDelivery> 
    page: number;
    searchDeliverys:(search: string) => Promise<boolean>;
    updateDelivery: (id: string, delivery: IDelivery) => Promise<boolean>;
    updatePage: (page: number) => Promise<void>;
}

interface DeliveryProviderProps{
    children: ReactNode;
}

export const DeliverysContext = createContext({} as DeliveryContextType)

export function DeliveryProvider({children}: DeliveryProviderProps){ 
    const [deliverys, setDeliverys] = useState<IDelivery[]>([]);
    const [emptyDelivery, setEmptyDelivery] = useState<IDelivery>({   
        id: "", id_client: "", id_deliveryman: "", name_item: "",
        size_item: "small", status: 'open', price: 0,
        startPosition: [0, 0], endPosition: [0, 0],
        created_at: new Date(), end_at: new Date()
    })
    const [error, setError] = useState<IError>({msg: '', active: false});
    const [page, setPage] = useState<number>(0)
    const { user } = useAuth();
    const localhost = "http://localhost:3000/delivery";

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
            return emptyDelivery;
        }   
    }
  
    async function getDeliverymanDeliverys(){
        await new Promise(resolve => setTimeout(resolve, 2000))// importante usar pra simular delay
        try{
            const config = setBearerToken(); 
            const deliverys = await api.get(`${localhost}/deliveryman/${page}`, config);               
            setDeliverys(deliverys.data);
        }catch(err){
            if(err instanceof Error) setError({ msg: err.message, active: true});
        }       
    }

    async function searchDeliverys(search: string): Promise<boolean>{
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
            return true;
        }catch(err){
            if(err instanceof Error) setError({ msg: err.message, active: true});
            return false;
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
   
    async function updateDelivery(id: string, delivery: IDelivery): Promise<boolean>{
        const config = setBearerToken();   
        if(delivery.status === 'inprogress') delivery.status = 'closed';
        if(delivery.status === 'open') delivery.status = 'inprogress';       
        delivery.id_deliveryman = user?.id || '';
        const newListDeliverys: IDelivery[] = [];
        try{
            const updatedDelivery = await api.put(`http://localhost:3000/delivery/${id}`, delivery, config)
            if(updatedDelivery) {         
                deliverys.forEach(delivery =>{
                    if(delivery.id !== id) newListDeliverys.push(delivery);                                
                })
                newListDeliverys.push(delivery)
                setDeliverys(newListDeliverys);
                return true;
            }
            return false;
        }catch(err){
            if(err instanceof Error) setError({ msg: err.message, active: true});
            return false;
        }      
    }

    async function deleteDelivery(id: string): Promise<boolean>{
        const config = setBearerToken();   
        try{
            await api.delete(`http://localhost:3000/delivery/${id}`,config);
            const newListDeliverys: IDelivery[] = [];
            deliverys.forEach(delivery =>{
                if(delivery.id !== id) newListDeliverys.push(delivery)
            })
            setDeliverys(newListDeliverys);
            return true;
        }catch(err){
            if(err instanceof Error) setError({ msg: err.message, active: true});
            return false;
        }       
    }

    async function cleanDeliverys() {
        setDeliverys([]);
    }

    async function updatePage(numberPage: number): Promise<void>{
        const newPage = page + numberPage;
        setPage(newPage)
    }
 
    useEffect(() =>{
        console.log('passei useEffect get Delivery Default' ,user)
        async function getDefaultDeliverys(): Promise<void>{
            const config = setBearerToken();           
            try{                            
                if(user.typeUser === 'client') {           
                    const deliverys = await api.get(`${localhost}/client/${page}`, config);      
                    setDeliverys(deliverys.data);
                }         
                else if(user.typeUser === 'deliveryman'){            
                    const deliverys = await api.get(`${localhost}/available/${page}`, config);             
                    setDeliverys(deliverys.data);
                }
            }catch(err){
                if(err instanceof Error) setError({ msg: err.message, active: true});                     
            } 
        }
        getDefaultDeliverys();
    }, [user.typeUser, page]);

    useEffect(() =>{
        setPage(0);
    },[]);
    
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
            page,
            searchDeliverys,
            updateDelivery,
            updatePage,
        }}>
            {children}
        </DeliverysContext.Provider>
    )
}


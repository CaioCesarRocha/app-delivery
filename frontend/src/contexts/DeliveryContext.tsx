import { createContext, ReactNode} from "react";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import {IError} from '../services/utils/interfaces/error_interface';
import api from "../services/connection/api";
import { IInputCreateDelivery, IDelivery } from "../services/utils/interfaces/delivery";


interface DeliveryContextType{
    allDeliverys: IDelivery[];
    cleanDeliverys: () => Promise<void>;
    createDelivery: (data: IInputCreateDelivery) => Promise<boolean>;
    deleteDelivery: (id: string) => Promise<boolean>
    deliverys: IDelivery[];
    error: IError;   
    filterDeliverys: (filter: string) => Promise<boolean>;
    handlePagination: (numberPage: number, type: 'client' | 'deliveryman') => Promise<void>;
    getDeliverymanDeliverys: () => Promise<void>;
    getOneDelivery: (id: string) => Promise<IDelivery> 
    page: number;
    searchDeliverys:(search: string) => Promise<boolean>;
    updateDelivery: (id: string, delivery: IDelivery) => Promise<boolean>;
}

interface DeliveryProviderProps{
    children: ReactNode;
}

export const DeliverysContext = createContext({} as DeliveryContextType)

export function DeliveryProvider({children}: DeliveryProviderProps){ 
    const [deliverys, setDeliverys] = useState<IDelivery[]>([]);
    const [allDeliverys, setAllDeliverys] = useState<IDelivery[]>([]);
    const [availableDeliverys, setAvailableDeliverys] = useState<IDelivery[]>([]);
    const [emptyDelivery, setEmptyDelivery] = useState<IDelivery>({   
        id: "", id_client: "", id_deliveryman: "", name_item: "",
        size_item: "small", status: 'open', price: 0,
        startPosition: [0, 0], endPosition: [0, 0],
        created_at: new Date(), end_at: new Date()
    })
    const [deliverymanDeliverys, setDeliverymanDeliverys] = useState<boolean>(false);
    const [error, setError] = useState<IError>({msg: '', active: false});
    const [page, setPage] = useState<number>(0)
    const { user } = useAuth();
    const localhost = "http://localhost:3000/delivery";
    const maxNumberPerPage = 5;

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
        setDeliverymanDeliverys(true)
        await new Promise(resolve => setTimeout(resolve, 2000))// importante usar pra simular delay
        try{
            const config = setBearerToken(); 
            const deliverys = await api.get(`${localhost}/deliveryman`, config);
            setAllDeliverys(deliverys.data);
            const showDeliverys: IDelivery[] = deliverys.data.slice(0, maxNumberPerPage)
            setDeliverys(showDeliverys);                          
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
        setAllDeliverys([]);
        setAvailableDeliverys([]);
        setDeliverys([]);
    }

    async function handlePagination(numberPage: number, type: "client" | "deliveryman"): Promise<void>{     
        const config = setBearerToken();  
        const newPage = page + numberPage;
        console.log('newPage', page)
        setPage(newPage);
        if(type === 'deliveryman' && !deliverymanDeliverys){
            const deliverys = await api.get(`${localhost}/available/${newPage}`, config);             
            setDeliverys(deliverys.data);  
            const showDeliverys: IDelivery[] = [...availableDeliverys, ...deliverys.data] 
            setAvailableDeliverys(showDeliverys)
            console.log('lurei', deliverys.data)  
        } else{
            const showDeliverys: IDelivery[] = allDeliverys.slice(newPage, newPage + maxNumberPerPage)       
            setDeliverys(showDeliverys);        
        }
        return;
    }
 
    useEffect(() =>{
        console.log('passei useEffect get Delivery Default' ,user)
        async function getDefaultDeliverys(): Promise<void>{
            const config = setBearerToken();           
            try{                            
                if(user.typeUser === 'client') {           
                    const deliverys = await api.get(`${localhost}/client`, config);
                    await setAllDeliverys(deliverys.data)
                    const showDeliverys: IDelivery[] = deliverys.data.slice(0, maxNumberPerPage)
                    setDeliverys(showDeliverys);                
                }         
                if(user.typeUser === 'deliveryman') {
                    setDeliverymanDeliverys(false);
                    await handlePagination(0, "deliveryman");
                }               
            }catch(err){
                if(err instanceof Error) setError({ msg: err.message, active: true});                     
            } 
        }
        getDefaultDeliverys();
    }, [user.typeUser]);

    useEffect(() =>{
        setPage(0);
    },[allDeliverys.length]);

    useEffect(() =>{
        setDeliverymanDeliverys(false)
    },[]);
    
    return (
        <DeliverysContext.Provider value={{
            allDeliverys,
            cleanDeliverys,
            createDelivery,
            deleteDelivery,
            deliverys,
            error,          
            filterDeliverys,
            getDeliverymanDeliverys,
            getOneDelivery,
            handlePagination,
            page,
            searchDeliverys,
            updateDelivery,
        }}>
            {children}
        </DeliverysContext.Provider>
    )
}


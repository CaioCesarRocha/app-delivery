import { createContext, ReactNode} from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import api from "../services/connection/api";


export interface IUser{
    username: string;
    password: string;
    token?: string;
    typeUser?: 'client' | 'deliveryman';
}

interface UserContextType{
    loading: boolean;
    user: IUser;
    login: (user: IUser) => Promise<void>;
    logout: () => Promise<void>;
    registerUser: (user: IUser) => Promise<void>;
}

interface UserProviderProps{
    children: ReactNode;
}

export const UsersContext = createContext({} as UserContextType)

function updatingCookie(logged: boolean, user?:IUser){
    if(logged && user?.token && user?.typeUser){
        document.cookie = "myCookie" + JSON.stringify({foo: 'bar', baz: 'poo'});
        Cookies.set('app-delivery-cod3r-auth', user.username, {expires: 7 });
        Cookies.set('token', user?.token, {expires: 7 });
        Cookies.set('typeUser', user?.typeUser, { expires: 7});
    }
    else { 
        Cookies.remove('app-delivery-cod3r-auth') // se tiver deslogado, exclui os dados 
        Cookies.remove('token')
        Cookies.remove('typeUser')
    } 
}

export function UserProvider({children}: UserProviderProps){
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser>({username: '', password: ''});

    async function login(user: IUser){
        setLoading(true)
        const res_api = await api.post(`/authenticate/${user.typeUser}`, user)
        const token = res_api.data.token;
        const userLogged = {username: user.username, password: '', token: token, typeUser: user.typeUser}
        if(token){      
            setUser(userLogged)
            updatingCookie(true, userLogged);
            setLoading(false);
        }
        else { 
            setLoading(false);
            console.log(userLogged) 
        }       
    }

    async function registerUser(user: IUser){
        const newUser = {username: user.username, password: user.password}
        const userCreated = await api.post(`/${user.typeUser}`, newUser);  
        console.log('token', userCreated);
        //const deliverysList = list.data 
        //setDeliverys(deliverysList);
    }

    async function logout(){
        setLoading(true)
        setUser({username: '',password: '', token: ''})
        updatingCookie(false);
        setLoading(false);
    }

    async function loadUser(){
    }

   

    useEffect(() =>{
        loadUser();
    }, [])

    useEffect(() =>{
        //esse metodo vai checar se ja existe um usuário mudou, em relaçaõ ao q estava logado antes
        //se tiver mudado ele chama a config session para passar os dados dnv(do user q logou a 1 vez)
        setLoading(true)
        const username = Cookies.get('app-delivery-cod3r-auth');
        const userTypeCookie = Cookies.get('typeUser');   
        if(username && (userTypeCookie === 'client' || userTypeCookie === 'deliveryman')) {
            setUser({
                username: username,
                password: '',
                token: Cookies.get('token'),
                typeUser: userTypeCookie
            })
            setLoading(false)
        }
        
            //const cancel = onIdTokenChanged(auth, configSession)
            //return () => cancel() //quando componente for desmontado ele para de observar se mudou id /\      
        else setLoading(false)    
    }, [])

    return (
        <UsersContext.Provider 
            value={{
                loading,
                user,
                login,
                logout,
                registerUser
            } }>
            {children}
        </UsersContext.Provider>
    )
}
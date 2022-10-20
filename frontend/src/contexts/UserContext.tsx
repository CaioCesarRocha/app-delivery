import { createContext, ReactNode} from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import api from "../services/connection/api";
import {IError} from '../services/utils/interfaces/error_interface';


export interface IUser{
    username: string;
    password: string;
    token?: string;
    typeUser?: 'client' | 'deliveryman';  
}

interface UserContextType{
    loading: boolean;
    user: IUser;
    error: IError;
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
    const [error, setError] = useState<IError>({msg: '', active: false});
    const [user, setUser] = useState<IUser>({username: '', password: ''});

    async function login(user: IUser){
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))// importante usar pra simular delay
        try{
            const res_api = await api.post(`/authenticate/${user.typeUser}`, user)
            const token = res_api.data.token;
            const userLogged = {username: user.username, password: '', token: token, typeUser: user.typeUser}
            if(token){      
                setUser(userLogged)
                updatingCookie(true, userLogged);
            }   
        }
        catch(err){
            if (err instanceof Error) setError({ msg: err.message, active: true});
        }
        finally{ setLoading(false) } ;      
    }

    async function registerUser(user: IUser){
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))// importante usar pra simular delay
        try{
            const newUser = {username: user.username, password: user.password}
            await api.post(`/${user.typeUser}`, newUser);  
            const res_api = await api.post(`/authenticate/${user.typeUser}`, user);
            const token = res_api.data.token;
            const userLogged = {username: user.username, password: '', token: token, typeUser: user.typeUser}
            if(token){      
                setUser(userLogged)
                updatingCookie(true, userLogged);
            }
        }
        catch(err){
            if (err instanceof Error) setError({ msg: err.message, active: true});
        }
        finally{ setLoading(false) };  
    }

    async function logout(){
        setLoading(true)
        setUser({username: '',password: '', token: ''})
        updatingCookie(false);
        setLoading(false);
    }

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
        else setLoading(false)    
    }, [])

    return (
        <UsersContext.Provider 
            value={{
                loading,
                user,
                error,
                login,
                logout,
                registerUser
            } }>
            {children}
        </UsersContext.Provider>
    )
}
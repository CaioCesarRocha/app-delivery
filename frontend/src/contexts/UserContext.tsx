import { createContext, ReactNode} from "react";
import { useState, useEffect } from "react";
import api from "../services/connection/api";

export interface IUser{
    username: string;
    password: string;
    token?: string;
    typeUser?: 'client' | 'deliveryman';
}

interface UserContextType{
    user: IUser;
    login: (user: IUser) => Promise<void>;
    registerUser: (user: IUser) => Promise<void>;
}

interface UserProviderProps{
    children: ReactNode;
}

export const UsersContext = createContext({} as UserContextType)

export function UserProvider({children}: UserProviderProps){
    const [user, setUser] = useState<IUser>({username: '', password: ''});

    async function login(user: IUser){
        const userLogged = await api.post(`/authenticate/${user.typeUser}`, user)
        console.log('token', userLogged.data.token)
    }

    async function registerUser(user: IUser){
        const newUser = {username: user.username, password: user.password}
        const userCreated = await api.post(`/${user.typeUser}`, newUser);  
        console.log('token', userCreated);
        //const deliverysList = list.data 
        //setDeliverys(deliverysList);
    }

    async function loadUser(){
    }

    useEffect(() =>{
        loadUser();
    }, [])

    return (
        <UsersContext.Provider 
            value={{
                user,
                login,
                registerUser
            } }>
            {children}
        </UsersContext.Provider>
    )
}
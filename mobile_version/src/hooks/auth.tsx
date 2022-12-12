import { 
    createContext, 
    ReactNode, 
    useContext,
    useState,
    useEffect
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../services/Connection/api'


interface IUser{
    id?: string,
    username: string;
    password: string;
    typeUser: 'client' | 'deliveryman'
    token?: string;
}

interface IAuthorizationReponse{
    data: {
        token: string;
        id: string;
    }   
}

interface AuthContextData{
    Login: (user: IUser) => Promise<void>
    Logout: () => Promise<void>
    user: IUser;
}

interface AuthProviderProps{
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<IUser>({} as IUser);
    const [userStorageLoading, setUserStorageLoading] = useState<boolean>(true)

    const userStorageKey = '@app-delivery:user';

    useEffect(() =>{
        async function loadUserStorageData(){
            const userStoraged = await AsyncStorage.getItem(userStorageKey);
            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as IUser;
                console.log('user', userLogged)
                setUser(userLogged)
            }
            setUserStorageLoading(false)
        }
        loadUserStorageData();
    }, [])

    async function Login(user: IUser){
        await new Promise((resolve) => setTimeout(resolve, 2000))
        try{
            const {data: {token, id}} = await api
            .post(`/authenticate/${user.typeUser}`, user) as IAuthorizationReponse            
            if(token) {
                const userLogged = {
                    id,
                    username: user.username,
                    password: '',
                    token,
                    typeUser: user.typeUser,
                }
                setUser(userLogged)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }
        }catch(err){     
            if(err instanceof Error)
                throw new Error(err.message)
        }
    }

    async function Logout(){
        setUser({} as IUser);
        await AsyncStorage.removeItem(userStorageKey)
    }

    return(
        <AuthContext.Provider value={{
            Login,
            Logout,
            user: user
        }}>
            {children}
        </AuthContext.Provider>
    )   
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }


import { 
    createContext, 
    ReactNode, 
    useContext,
    useState,
    useEffect
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../services/Connection/api'

interface AuthProviderProps{
    children: ReactNode
}

interface User{
    id?: string,
    username: string;
    password: string;
    typeUser: 'client' | 'deliveryman'
    token?: string;
}

interface AuthorizationReponse{
    data: {
        token: string;
        id: string;
    }   
}

interface AuthContextData{
    Login: (user: User) => Promise<void>
    Logout: () => Promise<void>
    user: User;
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState<boolean>(true)

    const userStorageKey = '@app-delivery:user';

    useEffect(() =>{
        async function loadUserStorageData(){
            const userStoraged = await AsyncStorage.getItem(userStorageKey);
            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as User;
                console.log('user', userLogged)
                setUser(userLogged)
            }
            setUserStorageLoading(false)
        }
        loadUserStorageData();
    }, [])

    async function Login(user: User){
        await new Promise((resolve) => setTimeout(resolve, 2000))
        try{
            const {data: {token, id}} = await api
            .post(`/authenticate/${user.typeUser}`, user) as AuthorizationReponse            
            if(token) {
                const userLogged = {
                    id,
                    username: user.username,
                    password: '',
                    token,
                    typeUser: user.typeUser,
                }
                console.log('userLogged', userLogged)
                setUser(userLogged)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }
        }catch(err){     
           if(err instanceof Error)
                throw new Error(err.message)
        }
    }

    async function Logout(){
        setUser({} as User);
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


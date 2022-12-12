import { useState } from "react";
import { 
    useForm, 
    Control, 
    FieldValues 
} from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import {
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native'
import { Header } from "./components/Header";
import { UserTypeOptions } from "./components/UserTypeOptions";
import { Loading } from "../../components/Loading";

import { InputForm } from "../../components/Forms/InputForm";
import { ButtonForm } from "../../components/Forms/Button";
import { useAuth } from "../../hooks/auth";
import { 
    Container,
    Form,
    Fields,
} from "./styles";

 const schema = Yup.object({
    username: Yup.string().required('Username é obrigatório'),
    password: Yup.string().required('Password é obrigatório'),
    confirmPassword: Yup.string().optional()
 })

  interface FormData{
    [name: string]: any;
}

export function Authentication(){
    const [isLoading, setIsLoading] = useState(false)
    const [screen, setScreen] = useState<'login'|'register'>('login')
    const [ userType, setUserType] = useState<'client'| 'deliveryman'>('client')
    const { Login } = useAuth();
 
    const {
        control,
        handleSubmit,
        formState: { errors}
    } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const formControl = control as unknown as Control<FieldValues, any>

    function handleUserTypeSelect(type: 'client' | 'deliveryman'){
        setUserType(type)
    }

    async function handleRegister(form: FormData){
        if(!userType) {
            console.log('Error, selecione o tipo de usuário')
            return Alert.alert('Selecione o tipo de usuário');
        }        
        if(screen === 'register' && form.password!== form.confirmPassword) {
            console.log('Error, senhas diferentes')
            return Alert.alert('As senhas precisam ser iguais');
        }      
        try{
            setIsLoading(true)
            const user = {
                username: form.username,
                password: form.password,
                typeUser: userType
            }
            return await Login(user)
        }catch(error){
            console.log(error)
            Alert.alert('Não foi possível fazer Login');
            setIsLoading(false) 
        }                    
    }

    return(
       // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header
                    screen={screen}
                    setScreenRegister={() => setScreen('register')}
                    setScreenLogin={() => setScreen('login')}
                />
                <Form>
                    <Fields>
                        <InputForm
                            name="username"
                            control={formControl}                     
                            placeholder="Usuário" 
                            error={errors.username && errors.username?.message}                    
                        />
                        <InputForm
                            name="password"
                            typePassword
                            control={formControl}                      
                            placeholder="Senha" 
                            error={errors.password && errors.password?.message}                     
                        />  
                        { screen === 'register' &&
                             <InputForm
                                name="confirmPassword"
                                typePassword
                                control={formControl}                      
                                placeholder="Confirmar senha" 
                                error={errors.confirmPassword && errors.confirmPassword?.message}                     
                            />  
                        }    
                        <UserTypeOptions
                            userType={userType}
                            setTypeClient={() => setUserType('client')}
                            setTypeDeliveryman={() => setUserType('deliveryman')}
                        />
                    </Fields>
                    { isLoading && <Loading/>}        
                    <ButtonForm
                        title={screen === 'login' ? 'Entrar' : 'Cadastrar'}
                        onPress={handleSubmit(handleRegister)}
                    />        
                </Form>            
            </Container>
        //</TouchableWithoutFeedback>
    )
}
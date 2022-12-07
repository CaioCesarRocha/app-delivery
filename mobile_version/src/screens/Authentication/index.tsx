import { useState } from "react";
import { useTheme } from "styled-components/native";
import { useForm, Control, FieldValues } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import {
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    ActivityIndicator
} from 'react-native'
import { InputForm } from "../../components/Forms/InputForm";
import { UserTypeButton } from "../../components/Forms/UserTypeButton";
import { ButtonForm } from "../../components/Forms/Button";
import { SignInInfo } from "./components/SignInInfo";
import { 
    Container,
    Header,
    Form,
    TitleWrapper,
    Title,
    Logo,
    Fields,
    UserTypes
} from "./styles";
import logo_appdelivery from '../../../assets/logo_appdelivery.png';
import { useAuth } from "../../hooks/auth";


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
    const { COLORS} = useTheme();
 
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
                <Header>
                    <TitleWrapper>
                        <Logo source={logo_appdelivery}/>
                        <Title>
                            Controle suas {'\n'}
                            entregas de forma {'\n'}
                            muito mais simples {'\n'}
                        </Title>
                    </TitleWrapper> 
                    { screen === 'login' ? 
                        <SignInInfo 
                            title="Faça seu login abaixo"
                            info="Ainda não cadastrou? Aqui."
                            onPress={() => setScreen('register')}
                        />
                    :
                        <SignInInfo 
                            title="Registre sua conta abaixo"
                            info="Fazer login."
                            onPress={() => setScreen('login')}
                        />
                    }         
                </Header>
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
                        <UserTypes>
                            <UserTypeButton
                                title='Cliente'
                                type='client'
                                onPress={() => handleUserTypeSelect('client')}
                                isActive={userType === 'client'}
                            />
                            <UserTypeButton
                                title='Entregador'
                                type='deliveryman'
                                onPress={() => handleUserTypeSelect('deliveryman')}
                                isActive={userType === 'deliveryman'}
                            />
                        </UserTypes>
                    </Fields>
                    { isLoading && 
                    <ActivityIndicator 
                        color={COLORS.GRAY_200}
                        size={"large"}
                    />}        
                    <ButtonForm
                        title={screen === 'login' ? 'Entrar' : 'Cadastrar'}
                        onPress={handleSubmit(handleRegister)}
                    />        
                </Form>            
            </Container>
        //</TouchableWithoutFeedback>
    )
}
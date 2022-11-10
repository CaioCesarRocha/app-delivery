import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import { z } from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import { toast} from 'react-toastify';
import { User, LockKey, Truck} from 'phosphor-react';
import { ContainerInput, DeliveryContainer, DeliveryContent, DeliveryType, DeliveryTypeButton } from "./styles";
import Alert from '../../components/Alert';
import { IUser} from '../../contexts/UserContext';
import useAuth from '../../hooks/useAuth';

const newFormDeliverySchema = z.object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string().optional(),
    typeUser: z.enum(['client' , 'deliveryman']).optional(),
});

type NewDeliveryFormInputs = z.infer<typeof newFormDeliverySchema>

export function AuthenticateUser(){
    const [screen, setScreen] = useState<'Login'|'Register'>('Login');
    const [typeUserLogin, setTypeUserLogin] = useState<'client'|'deliveryman'>('client');
    const {login, registerUser, user, error} = useAuth();
    const navigate = useNavigate();

    useEffect(() =>{
        if(user.username !== '') navigate('/') 
    },[user, navigate])

    useEffect(() =>{
        if(error.active) toast.error('Usuário ou Senha incorretos!');
    },[error])

    const { 
        control,
        register,       
        handleSubmit,
        formState: {isSubmitting} //informa estado do form, podendo ser usado pra desabilitar o botao
    } = useForm<NewDeliveryFormInputs>({
        resolver: zodResolver(newFormDeliverySchema)
    });

    async function handleLogin(data: NewDeliveryFormInputs){
        if(screen === 'Login'){  
            if(typeUserLogin === 'client'){               
                const user: IUser = {username: data.username, password: data.password, typeUser: 'client'}        
                await login(user)
            } else{
                const user: IUser = {username: data.username, password: data.password, typeUser: 'deliveryman'}        
                await login(user)
            }
        } else{         
            if(data.typeUser === undefined) {toast.info('Selecione o tipo de usuário'); return;}
            if(data.password !== data.confirmPassword) {toast.error('Senhas diferentes!'); return;}
            const user: IUser = {username: data.username, password: data.password, typeUser: data.typeUser}
            await registerUser(user)
        }
    }

    function renderLoginInfos(){
        return (
            <>
                <p> 
                    Ainda não possui Conta? 
                    <a href='#/' onClick={() => {setScreen('Register')}}> Cadastrar aqui. </a> 
                </p>   
                {typeUserLogin === 'client' ? 
                    <p> 
                        Deseja logar como Entregador? 
                        <a href='#/' onClick={() => setTypeUserLogin('deliveryman')}>Login aqui.</a> 
                    </p> 
                :
                    <p> 
                        Deseja logar como Cliente? 
                        <a href='#/' onClick={() => setTypeUserLogin('client')}>Login aqui.</a> 
                    </p> 
                }                      
            </>
        );
    }

    function renderRegisterFields(){
        return (
            <>
                <ContainerInput>
                    <i><LockKey size={25}/></i>                            
                    <input 
                        type="password" required
                        placeholder='Confirme a Senha' 
                        {...register('confirmPassword')}
                    />    
                </ContainerInput>                  
                <Controller
                    control={control}
                    name="typeUser"
                    render={({field}) =>{
                        return(<>
                            <DeliveryType 
                                onValueChange={field.onChange} 
                                value={field.value}
                            >
                                <DeliveryTypeButton value="client">
                                    <User size={20}/> Cliente
                                </DeliveryTypeButton>
                                <DeliveryTypeButton value="deliveryman">
                                    <Truck size={20}/> Entregador
                                </DeliveryTypeButton>
                            </DeliveryType>
                        </>)
                    }}
                />
                <p> 
                    Já possui Conta? 
                    <a href='#/' onClick={() => {setScreen('Login')}}> Fazer login. </a> 
                </p>
            </>
        )
    }

    return(
        <DeliveryContainer>
            <Alert theme='colored'/>  
            <DeliveryContent>
                <h1> {screen === 'Login' ? 'Login' : 'Cadastrar Usuário'}</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <ContainerInput>
                        <i><User size={25}/></i>
                        { typeUserLogin === 'client' ? 
                            <input 
                                type="text" placeholder='Nome do usuário' 
                                required {...register('username')}
                            />
                        :
                            <input 
                                type="text" placeholder='Nome do Entregador' 
                                required {...register('username')}
                            />
                        }
                        
                    </ContainerInput>
                    <ContainerInput>
                        <i><LockKey size={25}/></i>
                        <input type="password" placeholder='Senha' required {...register('password')}/>                       
                    </ContainerInput>
                    {screen === 'Login' ? 
                        renderLoginInfos()
                    :
                        renderRegisterFields()
                    }                                       
                    <button type='submit' disabled={isSubmitting}>
                        {screen === 'Login' ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>
            </DeliveryContent>
        </DeliveryContainer>
    )
}